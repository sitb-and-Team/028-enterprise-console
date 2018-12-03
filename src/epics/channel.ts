import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { map, mapTo, switchMap } from 'rxjs/operators';

import actionToast from '../core/actionToast';
import { execute } from '../core/Request';
import URL from '../constants/URL';
import { channel as types } from '../constants/ActionTypes';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/22
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.channel}/merchants?${urlArgs({...payload, sort: 'id,desc'})}`,
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
      url: payload.isUpdate && `${URL.channel}/merchants/${payload.id}` || `${URL.channel}/merchants`,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'channel'})),
    mapTo(({
      type: types.updateComplete
    })))
}

/**
 * 请求通道标识
 * @param action$
 * @returns {any}
 */
export function startChannels(action$) {
  return action$.pipe(
    ofType(types.startChannels),
    switchMap(({payload}) => execute({
      url: `${URL.channel}?${urlArgs({...payload, sort: 'id,desc'})}`,
      type: types.channelsComplete
    }))
  )
}
