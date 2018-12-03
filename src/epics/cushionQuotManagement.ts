import URL from '../constants/URL';
import { cushionQuotManagement as types } from '../constants/ActionTypes';
import { execute } from '../core/Request';
import { ofType } from 'redux-observable';
import {map, mapTo, mergeMap, switchMap, tap} from 'rxjs/operators';
import actionToast from "../core/actionToast";
import { merge, of } from 'rxjs/index';
import {getState} from "../core/store";


export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({}) => execute({
        url: `${URL.advanceMoney}`,
        type: types.queryComplete
      })
    ));
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
      url: `${URL.advanceMoney}/${payload.paymentRouteId}`,
      method: 'DELETE'
    })),
    tap(actionToast({prefix: 'paymentRoute'})),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.delComplete
      })];
      // 成功发起query请求
      if (success) {
        let payload = getState().paymentRoute.searchParams;
        result.push(of({
          type: types.startQuery,
          payload
        }));
      }
      return merge(...result);
    })
  )
}

/**
 * 新增编辑
 * @param action$
 */
export function startUpdate(action$) {
  return action$.pipe(
    ofType(types.startUpdate),
    switchMap(({payload}) => execute({
      url: payload.isUpdate && `${URL.advanceMoney}/${payload.id}` || `${URL.advanceMoney}`,
      method: payload.isUpdate && 'PUT' || 'POST',
      body: JSON.stringify(payload)
    })),
    map(actionToast({prefix: 'settleTask', successPop: true})),
    mapTo(({
      type: types.updateComplete
    })))
}
