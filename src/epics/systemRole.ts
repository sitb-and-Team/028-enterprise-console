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
import { systemRole as types } from '../constants/ActionTypes';
import URL from '../constants/URL';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.roles}?${urlArgs({...payload, sort: 'id,desc'})}`,
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
      url: URL.roles,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'systemRole', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}

export function del(action$) {
  return action$.pipe(
    ofType(types.del),
    switchMap(({payload}) => execute({
      url: `${URL.roles}/${payload}`,
      method: 'DELETE',
      // 删除完成后查询角色信息
      type: types.startQuery
    })),
    tap(actionToast({prefix: 'systemRole'}))
  );
}
