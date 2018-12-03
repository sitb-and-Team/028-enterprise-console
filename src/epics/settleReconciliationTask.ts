/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */
import { execute } from '../core/Request';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { map, mapTo, switchMap } from 'rxjs/operators';
import URL from '../constants/URL';
import { settleReconciliationTask as types } from '../constants/ActionTypes';
import actionToast from '../core/actionToast';
import { mergeMap, tap } from 'rxjs/internal/operators';
import { merge, of } from 'rxjs/index';
import { getState } from '../core/store';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.settleReconciliationTask}?${urlArgs({...payload, sort: 'id,desc'})}`,
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
      url: payload.isUpdate && `${URL.settleReconciliationTask}/${payload.id}` || `${URL.settleReconciliationTask}`,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'settleReconciliationTask', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}

/**
 * 修改阶段任务
 * @param action$
 * @returns {any}
 */
export function startStageTask(action$) {
  return action$.pipe(
    ofType(types.startStageTask),
    switchMap(({payload}) => {
      // taskId是当前任务阶段id,isChannel修改通道交易对比，...other是修改记录的参数。
      const {taskId, isChannel, ...other} = payload;
      let suffixUrl = isChannel && `${taskId}/channel-check` || `${taskId}`;
      return execute({
        url: `${URL.settleReconciliationTask}/${suffixUrl}?${urlArgs(other)}`,
        method: 'PATCH'
      })
    }),
    tap(actionToast({prefix: 'settleReconciliationTask'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.stageTaskComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().settleReconciliationTask.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}
