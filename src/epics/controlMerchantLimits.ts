import { ofType } from 'redux-observable';
import { map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';
import { execute } from '../core/Request';
import actionToast from '../core/actionToast';
import { controlMerchantLimits as types } from '../constants/ActionTypes';
import URL from '../constants/URL';
import { merge, of } from "rxjs";
import { getState } from "../core/store";
import { urlArgs } from "@sitb/wbs/utils/HttpUtil";

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/16
 */

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.controlMerchantLimits}?${urlArgs(payload)}`,
        type: types.queryComplete
      })
    ));
}

/**
 * 新增编辑
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: payload.isUpdate && `${URL.controlMerchantLimits}/${payload.id}` || `${URL.controlMerchantLimits}`,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'controlMerchantLimits', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}

/**
 * del
 * @param action$
 * @returns {any}
 */
export function startDel(action$) {
  return action$.pipe(
    ofType(types.startDel),
    switchMap(({payload}) => execute({
      url: `${URL.controlMerchantLimits}/${payload.paymentRouteId}`,
      method: 'DELETE'
    })),
    tap(actionToast({prefix: 'controlMerchantLimits'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.delComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().controlMerchantLimits.searchParams;
        result.push(of({
          type: types.startQuery,
          ...payload
        }));
      }
      return merge(...result);
    })
  )
}
