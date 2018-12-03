import URL from '../constants/URL';
import { permissions as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/26
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.permissions}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}
