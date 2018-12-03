/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/15
 */
import { ofType } from 'redux-observable';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import actionToast from '../core/actionToast';
import { systemOperator as types } from '../constants/ActionTypes';
import URL from '../constants/URL';

/**
 * operator query
 * @param action$
 * @returns {any}
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(() => execute({
        url: `${URL.systemOperator}?${urlArgs({sort: 'id,desc'})}`,
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
      url: URL.systemOperator,
      method: 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'systemOperator', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}
