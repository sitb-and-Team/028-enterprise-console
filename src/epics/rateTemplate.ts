/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/16
 */
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';

import actionToast from '../core/actionToast';
import { execute } from '../core/Request';
import URL from '../constants/URL';
import { rateTemplate as types } from '../constants/ActionTypes';
import { merge, of } from 'rxjs/index';
import { mergeMap } from 'rxjs/internal/operators';
import { getState } from '../core/store';


export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.rateTemplate}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * create update
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: `${URL.rateTemplate}`,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'rateTemplate', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
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
      url: `${URL.rateTemplate}/${payload}`,
      method: 'DELETE',
      body: JSON.stringify(payload)
    })),
    tap(actionToast({prefix: 'rateTemplate'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.updateComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().rateTemplate.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }));
}
