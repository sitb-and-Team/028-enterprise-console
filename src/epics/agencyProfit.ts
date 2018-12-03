/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */
import { agencyProfit as types } from '../constants/ActionTypes';
import { switchMap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { ofType } from 'redux-observable';
import URL from '../constants/URL';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.agency}/profit?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}
