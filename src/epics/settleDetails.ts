/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/20
 */
import URL from '../constants/URL';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { switchMap, tap } from 'rxjs/operators';
import { settleDetails as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import { merge, of } from 'rxjs/index';
import { getState } from '../core/store';
import actionToast from '../core/actionToast';
import { mergeMap } from 'rxjs/internal/operators';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.settlePayment}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * removeDetail
 * @param action$
 * @returns {any}
 */
export function startRemoveDetail(action$) {
  return action$.pipe(
    ofType(types.startRemoveDetail),
    switchMap(({payload}) => execute({
      url: `${URL.settleDetails}/less-settle`,
      method: 'PUT',
      body: JSON.stringify(payload)
    })),
    tap(actionToast({prefix: 'settleDetails'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.removeDetailComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().settleDetails.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}
