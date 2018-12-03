/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/31
 */
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import URL from '../constants/URL';
import { ofType } from 'redux-observable';
import { channelMerchantBusiness as types } from '../constants/ActionTypes';
import actionToast from '../core/actionToast';
import { merge, of } from 'rxjs/index';
import { getState } from '../core/store';
import { mergeMap } from 'rxjs/internal/operators';

/**
 *
 * @param action$
 * @returns {any}
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.channelMerchantBusiness(payload.id)}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 *  新增编辑 业务
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: URL.channelMerchantBusiness(payload.merchantId),
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'channelMerchantBusiness', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}

/**
 * 更改业务状态
 * @param actions$
 * @returns {any}
 */
export function startStatus(actions$) {
  return actions$.pipe(
    ofType(types.startStatus),
    switchMap(({payload}) => {
      const {merchantId, businessType, enabled} = payload;
      return execute({
        url: `${URL.channelMerchantBusiness(merchantId)}/${businessType}/status`,
        method: 'PATCH',
        body: enabled
      })
    }),
    tap(actionToast({prefix: 'channelMerchantBusiness'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.statusComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().channelMerchantBusiness.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}
