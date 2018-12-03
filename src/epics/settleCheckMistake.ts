import { execute } from '../core/Request';
import { settleCheckMistake as types } from '../constants/ActionTypes';
import URL from '../constants/URL';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.settleCheckMistakes}/${payload.mistakeId}`,
        type: types.queryComplete
      })
    ));
}
