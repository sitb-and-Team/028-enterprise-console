/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/29
 */
import URL from '../constants/URL';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { settleTask as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import actionToast from '../core/actionToast';
import { mergeMap } from 'rxjs/internal/operators';
import { merge, of } from 'rxjs/index';
import { getState } from '../core/store';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.settleTask}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * 下载
 * @param action$
 * @returns {any}
 */
export function startDown(action$) {
  return action$.pipe(
    ofType(types.startDown),
    switchMap(({payload}) => {
      const {taskId, filename} = payload;
      return execute({
        url: `${URL.settleTask}/settle-file/${taskId}/${filename}`,
        upload: true,
        type: types.downComplete
      })
    }),
    tap((payload: any) => {
      if (payload && payload.status) {
        actionToast({prefix: 'settleTask'})(payload);
      }
    })
  )
}

/**
 * update
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: URL.settleTask,
      method: 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'settleTask', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}

/**
 * submit
 * @param action$
 * @returns {any}
 */
export function startGather(action$) {
  return action$.pipe(
    ofType(types.startGather),
    switchMap(({payload}) => {
      const {id, key} = payload;
      // url模版
      let urlTemplate = path => `${URL.settleTask}/${path}`;
      // 默认请求为submit
      let url = urlTemplate(`/submit/${id}`);
      let method = 'PUT';

      // 判断是否是del出款
      if (key === 'del') {
        url = urlTemplate(id);
        method = 'DELETE';
      }
      return execute({
        url,
        method
      })
    }),
    tap(actionToast({prefix: 'settleTask'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.gatherComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().settleTask.searchParams;
        result.push(of({
          type: types.startQuery,
          ...payload
        }));
      }
      return merge(...result);
    })
  )
}
