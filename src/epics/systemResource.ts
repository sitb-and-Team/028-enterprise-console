/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/31
 */
import { ofType } from 'redux-observable';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import actionToast from '../core/actionToast';
import { systemResource as types } from '../constants/ActionTypes';
import URL from '../constants/URL';
import { merge, of } from 'rxjs/index';
import { mergeMap } from 'rxjs/internal/operators';
import { getState } from '../core/store';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.systemResources}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * 新增
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: URL.systemResources,
      method: 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'systemResource', successPop: true})),
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
      url: `${URL.systemResources}/${payload.resourceId}`,
      method: 'DELETE',
    })),
    tap(actionToast({prefix: 'systemResource'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.delComplete
      })];
      // 成功发起query请求
      if (success) {
        // searchParams
        let payload = getState().systemResource.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    })
  )
}
