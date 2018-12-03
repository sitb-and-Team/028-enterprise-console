import { ofType } from 'redux-observable';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { execute } from '../core/Request';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { merge, of } from 'rxjs/index';
import { mergeMap } from 'rxjs/internal/operators';
import actionToast from '../core/actionToast';
import { getState } from '../core/store';

import URL from '../constants/URL';
import { systemProcess as types } from '../constants/ActionTypes';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/15
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.systemProcess}?${urlArgs({...payload, sort: 'id,desc'})}`,
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
      url: payload.isUpdate && `${URL.systemProcess}/${payload.id}` || `${URL.systemProcess}`,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'systemProcess', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}

/**
 * 删除资源
 * @param action$
 * @returns {any}
 */
export function startDel(action$) {
  return action$.pipe(
    ofType(types.startDel),
    switchMap(({payload}) => execute({
      url: `${URL.systemProcess}/${payload.systemProcessId}`,
      method: 'DELETE',
    })),
    tap(actionToast({prefix: 'systemProcess'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.delComplete
      })];
      // 成功发起query请求
      if (success) {
        // searchParams
        let payload = getState().systemProcess.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    })
  )
}
