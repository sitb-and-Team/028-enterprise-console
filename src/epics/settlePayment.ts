/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/14
 */
import URL from '../constants/URL';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import * as moment from 'moment';
import { switchMap, tap } from 'rxjs/operators';
import { settlePayment as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import { merge, of } from 'rxjs';
import actionToast from '../core/actionToast';
import { getState } from '../core/store';
import { mergeMap } from 'rxjs/internal/operators';
import Common from '@sitb/wbs/constants/Common';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.settlePayment}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * 结算信息下载
 * @param action$
 * @returns {any}
 */
export function startDown(action$) {
  return action$.pipe(
    ofType(types.startDown),
    switchMap(() => {
      // 获取search信息
      let payload = getState().settlePayment.searchParams;
      const {settleAt} = payload;
      // 默认时间为当天
      let search: any = settleAt && {settleAt: moment(settleAt)} || {settleAt: moment()};
      // 转为年月日
      search.settleAt = search.settleAt.format(Common.DATE_FORMAT);
      return execute({
        url: `${URL.settlePayment}/file?${urlArgs(search)}`,
        upload: true,
        type: types.downComplete
      })
    }),
    tap((payload: any) => {
      // 下载成功后台不会反悔payload，只有发生错误才会有payload
      if (payload.status && !payload.success) {
        actionToast({prefix: 'paymentSettle'})(payload);
      }
    })
  )
}

/**
 * 强制执行出款
 * @param action$
 * @returns {any}
 */
export function startPerform(action$) {
  return action$.pipe(
    ofType(types.startPerform),
    switchMap(({payload}) => execute({
      url: URL.settlePayment,
      method: 'PATCH',
      body: JSON.stringify(payload)
    })),
    tap(actionToast({prefix: 'paymentSettle'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.performComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().settlePayment.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    })
  )
}
