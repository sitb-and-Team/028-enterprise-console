/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/15
 */
import { ofType } from 'redux-observable';
import { switchMap, tap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import actionToast from '../core/actionToast';
import { systemConfig as types } from '../constants/ActionTypes';
import URL from '../constants/URL';

export function query(action$) {
  return action$.pipe(
    ofType(types.query),
    switchMap(({payload}) => execute({
        url: `${URL.systemConfig}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

export function create(action$) {
  return action$.pipe(
    ofType(types.create),
    switchMap(({payload}) => execute({
      url: URL.systemConfig,
      method: 'POST',
      body: JSON.stringify(payload),
      type: types.createComplete
    })),
    tap(actionToast({prefix: 'systemConfig'}))
  );
}
