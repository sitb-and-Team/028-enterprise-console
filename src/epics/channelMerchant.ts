/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/31
 */
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { ofType } from 'redux-observable';
import { map, mapTo, switchMap } from 'rxjs/operators';

import actionToast from '../core/actionToast';
import { execute } from '../core/Request';
import URL from '../constants/URL';
import { channelMerchant as types } from '../constants/ActionTypes';
import { MerchantMode } from '../constants/selectObj/MerchantMode';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/22
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.channelMerchant}?${urlArgs({...payload, sort: 'id,desc'})}`
      })
    ),
    map((data: any) => {
      const {payload, success} = data;
      // 商户一对多模式select临时变量
      let oneToManyMerchantSelect = {};
      if (success) {
        // 判断类型等于一对多
        payload.content.forEach(merchant => {
          if (merchant.proxyMode === MerchantMode.oneToMany) {
            oneToManyMerchantSelect[merchant.merchantNo] = merchant.merchantNo
          }
        })
      }
      return ({
        type: types.queryComplete,
        payload,
        success,
        oneToManyMerchantSelect
      });
    })
  );
}

/**
 * 新增通道商户
 * @param action$
 * @returns {any}
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: payload.isUpdate && `${URL.channelMerchant}/${payload.id}` || `${URL.channel}/merchants`,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'channelMerchant', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}
