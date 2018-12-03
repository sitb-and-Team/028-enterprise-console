import { ofType } from 'redux-observable';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { merge, of } from 'rxjs/index';
import { mergeMap } from 'rxjs/internal/operators';

import { getState } from '../core/store';
import { execute } from '../core/Request';
import actionToast from '../core/actionToast';
import { agency as types } from '../constants/ActionTypes';
import URL from '../constants/URL';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/22
 */

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.agency}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * 新增机构
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: payload.isUpdate && `${URL.agency}/${payload.id}` || `${URL.agency}`,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'agency', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}

/**
 * 修改机构状态
 * @param action$
 * @returns {any}
 */
export function startStatus(action$) {
  return action$.pipe(
    ofType(types.startStatus),
    switchMap(({payload}) => execute({
      url: `${URL.agency}/${payload.id}/status`,
      method: 'PATCH',
      body: payload.status
    })),
    tap(actionToast({prefix: 'agency'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.statusComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().agency.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}

/**
 * 机构信息统计
 * @param action$
 * @returns {any}
 */
export function startAgencyController(action$) {
  return action$.pipe(
    ofType(types.startAgencyController),
    switchMap(() => execute({
      url: `${URL.agency}/this-week-new`,
      type: types.agencyControllerComplete
    }))
  )
}
