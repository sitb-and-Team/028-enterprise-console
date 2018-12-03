import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import actionToast from '../core/actionToast';
import { ofType } from 'redux-observable';
import { execute } from '../core/Request';
import { merge, of } from 'rxjs/index';
import { getState } from '../core/store';
import { mergeMap } from 'rxjs/internal/operators';

import { agencyBusiness as types } from '../constants/ActionTypes';
import URL from '../constants/URL';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/10
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.agencyBusiness(payload.id)}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 *  新增编辑 业务
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: URL.agencyBusiness(payload.agencyId),
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'agencyBusiness', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}

/**
 * 更改业务状态
 * @param actions$
 * @returns {any}
 */
export function startStatus(actions$) {
  return actions$.pipe(
    ofType(types.startStatus),
    switchMap(({payload}) => {
      const {agencyId, businessType, enabled} = payload;
      return execute({
        url: `${URL.agencyBusiness(agencyId)}/${businessType}/status`,
        method: 'PATCH',
        body: enabled
      });
    }),
    tap(actionToast({prefix: 'agencyBusiness'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.statusComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().agencyBusiness.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}
