/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/16
 */
import { ofType } from 'redux-observable';
import { switchMap, tap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { channelConfig as types } from '../constants/ActionTypes';
import URL from '../constants/URL';
import actionToast from '../core/actionToast';
import { merge, of } from 'rxjs/index';
import { getState } from '../core/store';
import { mergeMap } from 'rxjs/internal/operators';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: URL.channelConfig(payload.channelFlag),
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
    switchMap(({payload}) => {
      const newPayload = Object.assign({}, payload);
      Reflect.deleteProperty(newPayload, 'channelFlag');
      return execute({
        url: URL.channelConfig(payload.channelFlag),
        method: 'POST',
        body: JSON.stringify(newPayload)
      })
    }),
    tap(actionToast({prefix: 'channelConfig'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.updateComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().channelConfig.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}
