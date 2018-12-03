/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/13
 */
import { execute } from '../core/Request';
import URL from '../constants/URL';
import { user as types } from '../constants/ActionTypes';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';

/**
 * query user
 * @param action$
 * @returns {any}
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(() => execute({
      url: `${URL.systemOperator}/user?${urlArgs({sort: 'id,desc'})}`,
      type: types.queryComplete
    }))
  )
}
