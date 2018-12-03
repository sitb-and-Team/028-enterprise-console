/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/20
 */
import URL from '../constants/URL';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { switchMap, tap } from 'rxjs/operators';
import { settleTradeDetails as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import { merge, of } from 'rxjs/index';
import actionToast from '../core/actionToast';
import { mergeMap } from 'rxjs/internal/operators';
import { getState } from '../core/store';

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.settleDetails}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

// 集中发送请求
export function startGather(action$) {
  return action$.pipe(
    ofType(types.startGather),
    switchMap(({payload}) => {
      const {taskId, detailIds, bankNoValue, ids, actionType, status, isSelectAll} = payload;
      // 生成url模版
      let urlString = prefix => `${URL.settleDetails}${prefix}`;
      // 生成新的url
      let url = urlString(`/status`);
      // 默认都为状态回填配置
      let newPayload: any = {
        taskId,
        ids,
        isSelectAll,
        status
      };

      // 判断回填
      if (actionType === 'removeTradeDetails') {
        url = urlString(`/less-detail/${taskId}`);
        newPayload = detailIds;
      }
      // 判断联行号
      if (actionType === 'isBankNo') {
        url = urlString(`/${taskId}/${ids[0]}/bankNo`);
        newPayload = Number(bankNoValue);
      }
      return execute({
        url,
        method: 'PUT',
        body: JSON.stringify(newPayload)
      })
    }),
    tap(actionToast({prefix: 'settleTradeDetails'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.gatherComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().settleTradeDetails.searchParams;
        console.log(payload);
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    })
  );
}
