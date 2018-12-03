import { ofType } from 'redux-observable';
import { switchMap, tap } from 'rxjs/operators';

import { execute } from '../core/Request';
import { merchant as types } from '../constants/ActionTypes';
import URL from '../constants/URL';
import actionToast from '../core/actionToast';
import { urlArgs } from '@sitb/wbs/utils/HttpUtil';
import { merge, of } from 'rxjs/index';
import { mergeMap } from 'rxjs/internal/operators';
import { getState } from '../core/store';

/**
 * query
 * @param action$
 * @returns {any}
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
        url: `${URL.merchant}?${urlArgs({...payload, sort: 'id,desc'})}`,
        type: types.queryComplete
      })
    ));
}

/**
 * updateSettle updateBasic create
 * @param action$
 * @returns {any}
 */
export function startPersist(action$) {
  return action$.pipe(
    ofType(types.startPersist),
    switchMap(({payload}) => {
      // 新增的url method
      let newUrl = URL.merchant;
      let newMethod = 'POST';
      // 删除自定义参数
      let newPayload = Object.assign({}, payload);
      Reflect.deleteProperty(newPayload, 'isSettle');
      Reflect.deleteProperty(newPayload, 'isBasic');
      Reflect.deleteProperty(newPayload, 'id');
      Reflect.deleteProperty(newPayload, 'open');
      Reflect.deleteProperty(newPayload, 'close');
      console.log(payload);
      // settle
      if (payload.isSettle) {
        newUrl = `${URL.merchant}/${payload.id}/settle-account`;
        newMethod = 'PATCH';
        // 只取settleAccount
        newPayload = Object.assign({}, {settleAccount: payload.settleAccount}, {describe:payload.describe});
      }
      // basic
      if (payload.isBasic) {
        newUrl = `${URL.merchant}/${payload.id}`;
        newMethod = 'PUT';
      }

      return execute({
        url: newUrl,
        method: newMethod,
        body: JSON.stringify(newPayload),
        type: types.persistComplete
      })
    }),
    tap(actionToast({prefix: 'merchant', successPop: true}))
  );
}

/**
 * 商户删除
 * @param action$
 * @returns {any}
 */
export function startDel(action$) {
  return action$.pipe(
    ofType(types.startDel),
    switchMap(({payload}) => execute({
      url: `${URL.merchant}/${payload.merchantId}`,
      method: 'DELETE'
    })),
    tap(actionToast({prefix: 'merchant'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.delComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().merchant.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    })
  );
}

/**
 * 商户状态
 * @param actions$
 * @returns {any}
 */
export function startStatus(actions$) {
  return actions$.pipe(
    ofType(types.startStatus),
    switchMap(({payload}) => {
      const {merchantId,...links} = payload;
      return execute({
        url: `${URL.merchant}/${merchantId}/status`,
        method: 'PATCH',
        body: JSON.stringify(links)
      });
    }),
    tap(actionToast({prefix: 'merchant'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.statusComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().merchant.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    }))
}

/**
 * 查询本周新增商户
 * @param action$
 * @returns {any}
 */
export function startAgencyController(action$) {
  return action$.pipe(
    ofType(types.startMerchantWeekNew),
    switchMap(() => execute({
      url: `${URL.merchant}/this-week-new`,
      type: types.merchantWeekNewComplete
    }))
  )
}

/**
 * 更新密钥
 * @param action$
 * @returns {any}
 */
export function startUploadPublicKey(action$) {
  return action$.pipe(
    ofType(types.startUploadPublicKey),
    switchMap(({payload}) => {
      const {merchantId, publicKeyValue} = payload;
      return execute({
        url: `${URL.merchant}/${merchantId}/public-key`,
        method: 'PATCH',
        type: types.uploadPublicKeyComplete,
        body: publicKeyValue
      })
    }),
    tap(actionToast({prefix: 'merchant'}))
  )
}
