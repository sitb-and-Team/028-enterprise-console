import { map, switchMap, tap } from 'rxjs/operators';
import { login as types } from '../constants/ActionTypes';
import URL from '../constants/URL';
import { execute } from '../core/Request';
import { ofType } from 'redux-observable';
import actionToast from '../core/actionToast';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/6
 */
export function startSend(action$) {
  return action$.pipe(
    ofType(types.startSend),
    switchMap(({payload}) => execute({
      url: `${URL.loginSend}?code=${payload}`
    })),
    tap(actionToast({prefix: 'login'})),
    map((payload: any) => {
      const {success, status} = payload;
      let processing: any = (success && status === '0000');
      return ({
        success: processing,
        type: types.sendComplete
      })
    })
  )
}

/**
 * 绑定机构
 * @param action$
 * @returns {any}
 */
export function startBound(action$) {
  return action$.pipe(
    ofType(types.startBound),
    switchMap(({payload}) => execute({
      url: URL.loginBound,
      method: 'POST',
      body: JSON.stringify(payload),
      type: types.boundComplete
    })),
    tap(actionToast({prefix: 'login'})),
    tap(({success, status}) => (success && status === '0000') && location.reload())
  )
}
