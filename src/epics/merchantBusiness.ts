/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/12
 */
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import URL from '../constants/URL';
import actionToast from '../core/actionToast';
import { ofType } from 'redux-observable';
import { merchantBusiness as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import { merge, of } from 'rxjs/index';
import { getState } from '../core/store';
import { mergeMap } from 'rxjs/internal/operators';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.merchantBusiness(payload.id)}?${urlArgs({...payload, sort: 'id,desc'})}`,
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
    switchMap(({payload}) => {
      const newPayload = Object.assign({}, payload);
      Reflect.deleteProperty(newPayload, 'isUpdate');
      return execute({
        url: URL.merchantBusiness(payload.merchantId),
        method: payload.isUpdate && 'PUT' || 'POST',
        body: JSON.stringify(newPayload)
      })
    }),
    map(actionToast({prefix: 'merchantBusiness', successPop: true})),
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
      const {merchantId, businessType, ...links} = payload;
      return execute({
        url: `${URL.merchantBusiness(merchantId)}/${businessType}/status`,
        method: 'PATCH',
        body: JSON.stringify(links)
      });
    }),
    tap(actionToast({prefix: 'merchantBusiness'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.statusComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().merchantBusiness.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}
