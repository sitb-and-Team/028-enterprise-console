import URL from '../constants/URL';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { switchMap, tap } from 'rxjs/operators';
import { paymentTrade as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import actionToast from '../core/actionToast';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.paymentTrade}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * 获取交易结果
 * @param action$
 * @returns {any}
 */
export function startGetResults(action$) {
  return action$.pipe(
    ofType(types.startGetResults),
    switchMap(({payload}) => execute({
      url: `${URL.paymentTrade}/result`,
      method: 'PATCH',
      body: payload,
      type: types.getResultsComplete
    })),
    tap(actionToast({prefix: 'paymentTrade'}))
  );
}

/**
 * 再次发送交易通知
 * @param action$
 * @returns {any}
 */
export function startSendNotice(action$) {
  return action$.pipe(
    ofType(types.startSendNotice),
    switchMap(({payload}) => execute({
      url: `${URL.paymentTrade}/notice`,
      method: 'PATCH',
      body: payload,
      type: types.sendNoticeComplete
    })),
    tap(actionToast({prefix: 'paymentTrade'}))
  );
}

/**
 * 生成结算信息
 * @param action$
 * @returns {any}
 */
export function startCreateSettle(action$) {
  return action$.pipe(
    ofType(types.startCreateSettle),
    switchMap(({payload}) => execute({
      url: URL.settlePayment,
      method: 'POST',
      body: payload,
      type: types.createSelectComplete
    })),
    tap(actionToast({prefix: 'paymentTrade'}))
  );
}

/**
 * 交易下载
 * @param action$
 * @returns {any}
 */
export function startDown(action$) {
  return action$.pipe(
    ofType(types.startDown),
    switchMap(({payload}) => execute({
      url: `${URL.paymentTrade}/csv?${urlArgs(payload)}`,
      upload: true,
      type: types.downComplete
    })),
    tap((payload: any) => {
      // 下载成功后台不会反悔payload，只有发生错误才会有payload
      if (payload.status && !payload.success) {
        actionToast({prefix: 'paymentTrade'})(payload);
      }
    })
  )
}

/**
 * 交易监控
 * @param action$
 * @returns {any}
 */
export function startObserved(action$) {
  return action$.pipe(
    ofType(types.startObserved),
    switchMap(({payload}) => execute({
      url: `${URL.paymentTrade}/query-result`,
      method: 'PATCH',
      body: JSON.stringify(payload),
      type: types.observedComplete
    })),
    tap(actionToast({prefix: 'paymentTrade'}))
  );
}

/**
 * 查看统计信息
 * @param action$
 */
export function searchStats(action$) {
  return action$.pipe(
    ofType(types.searchStats),
    switchMap(() => execute({
        url: `${URL.paymentTrade}/stats`,
        type: types.searchStatsComplete
      })
    )
  )
}
