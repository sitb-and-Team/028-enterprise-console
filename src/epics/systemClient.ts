/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/31
 */
import { ofType } from 'redux-observable';
import { switchMap, tap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import actionToast from '../core/actionToast';
import { systemClient as types } from '../constants/ActionTypes';
import URL from '../constants/URL';
import apiCreateSuccessModal from '../component/apiCreateSuccessModal';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.systemClient}?${urlArgs({...payload, sort: 'id,desc'})}`,
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
      url: URL.systemClient,
      method: 'POST',
      body: JSON.stringify(payload),
      type: types.updateComplete
    })),
    tap((payload: any) => {
      actionToast({prefix: 'systemClient', successPop: true})(payload);
      if (payload.success) {
        apiCreateSuccessModal(payload.payload);
      }
    })
  );
}

export function del(action$) {
  return action$.pipe(
    ofType(types.del),
    switchMap(({payload}) => execute({
      url: `${URL.systemClient}/${payload}`,
      method: 'DELETE',
      type: types.startQuery
    })),
    tap(actionToast({prefix: 'systemClient'}))
  );
}
