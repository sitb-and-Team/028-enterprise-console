import URL from '../constants/URL';
import { paymentRoute as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import actionToast from '../core/actionToast';
import { mergeMap, tap } from 'rxjs/internal/operators';
import { getState } from '../core/store';
import { merge, of } from 'rxjs/index';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/30
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.paymentRoute}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * update create
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: payload.isUpdate && `${URL.paymentRoute}/${payload.id}` || URL.paymentRoute,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload),
      type: types.updateComplete
    })),
    tap(actionToast({prefix: 'paymentRoute', successPop: true}))
  )
}

/**
 * del
 * @param action$
 * @returns {any}
 */
export function startDel(action$) {
  return action$.pipe(
    ofType(types.startDel),
    switchMap(({payload}) => execute({
      url: `${URL.paymentRoute}/${payload.paymentRouteId}`,
      method: 'DELETE'
    })),
    tap(actionToast({prefix: 'paymentRoute'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.delComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().paymentRoute.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    })
  )
}
