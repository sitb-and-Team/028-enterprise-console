/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/14
 */
import { ofType } from 'redux-observable';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';

import actionToast from '../core/actionToast';
import { execute } from '../core/Request';
import URL from '../constants/URL';
import { channelBusiness as types } from '../constants/ActionTypes';
import { merge, of } from 'rxjs/index';
import { getState } from '../core/store';
import { mergeMap } from 'rxjs/internal/operators';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.channelBusiness(payload.channelFlag)}/?sort=id,desc`,
        type: types.queryComplete
      })
    ));
}

/**
 * 新增通道商户
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: URL.channelBusiness(payload.channelFlag),
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'channelBusiness', successPop: true})),
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
      const {channelFlag, businessType, enabled} = payload;
      return execute({
        url: `${URL.channelBusiness(channelFlag)}/${businessType}/status`,
        method: 'PATCH',
        body: enabled
      });
    }),
    tap(actionToast({prefix: 'channelBusiness'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.statusComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().channelBusiness.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}
