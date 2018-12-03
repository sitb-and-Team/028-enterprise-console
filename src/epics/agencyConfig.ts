import { agencyConfig as types } from '../constants/ActionTypes';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { ofType } from 'redux-observable';
import URL from '../constants/URL';
import actionToast from '../core/actionToast';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.agency}/${payload.agencyId}/configs`,
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
      Reflect.deleteProperty(newPayload, 'agencyId');
      return execute({
        url: `${URL.agency}/${payload.agencyId}/configs`,
        method: 'POST',
        body: JSON.stringify(newPayload)
      })
    }),
    map(actionToast({prefix: 'agencyConfig'})),
    mapTo(({
      type: types.updateComplete
    })));
}
