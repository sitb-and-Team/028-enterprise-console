/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/5
 */
import { ofType } from 'redux-observable';
import { switchMap, tap } from 'rxjs/operators';

import { execute } from '../core/Request';
import { profile as types } from '../constants/ActionTypes';
import URL from '../constants/URL';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import actionToast from '../core/actionToast';
import { merge, of } from 'rxjs/index';
import { mergeMap } from 'rxjs/internal/operators';

/**
 * 上传机构密钥
 * @param action$
 * @returns {any}
 */
export function updateAgencyKey(action$) {
  return action$.pipe(
    ofType(types.updateAgencyKey),
    switchMap(({payload}) => {
      const {agencyId, publicKey} = payload;
      return execute({
        url: `${URL.agency}/${agencyId}/public-key`,
        method: 'PATCH',
        body: JSON.stringify({publicKey}),
        type: types.updateAgencyKeyComplete
      })
    })
  )
}

/**
 * query
 * @param action$
 * @returns {any}
 */
export function startQueryReview(action$) {
  return action$.pipe(
    ofType(types.startQueryReview),
    switchMap(({payload}) => execute({
        url: `${URL.merchant}/reviews?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryReviewComplete
      })
    ));
}

/**
 * 审核
 * @param action$
 * @returns {any}
 */
export function startCheckReview(action$) {
  return action$.pipe(
    ofType(types.startCheckReview),
    switchMap(({payload}) => execute({
      url: `${URL.merchant}/reviews`,
      method: 'POST',
      body: JSON.stringify(payload)
    })),
    tap(actionToast({prefix: 'reviews'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.checkReviewComplete
      })];
      // 成功发起query请求
      if (success) {
        result.push(of({
          type: types.startQueryReview
        }));
      }
      return merge(...result);
    }))
}
