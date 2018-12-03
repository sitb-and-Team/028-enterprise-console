import { ofType } from 'redux-observable';
import { filter, switchMap, tap } from 'rxjs/operators';
import { execute } from '../core/Request';
import { session as types } from '../constants/ActionTypes';
import Url from '../constants/URL';
import { resetStorage, saveOperator, setAccessToken, setAgencyId } from '../core/SessionServices';

/**
 * 获取登陆操作员信息
 */
export function getProfile(action$) {
  return action$.pipe(
    ofType(types.startProfile),
    switchMap(() => execute({
      url: `${Url.session}/me`,
      type: types.profileComplete
    })),
    // 保存操作员信息
    tap(({success, payload}) => {
      success && saveOperator(payload);
    }));
}

/**
 * 存储token
 * @param action$
 * @returns {any}
 */
export function startAccessToken(action$) {
  return action$.pipe(
    ofType(types.startAccessToken),
    filter(({payload}) => {
      // 存储到缓存
      setAccessToken(payload);
      console.log('token', payload);
      return false;
    })
  );
}

/**
 * 存储机构id
 * @param action$
 * @returns {any}
 */
export function startAgencyId(action$) {
  return action$.pipe(
    ofType(types.startAgencyId),
    filter(({payload}) => {
      console.log('agencyId', payload);
      // 存储到缓存
      setAgencyId(payload);
      location.reload();
      return false;
    })
  );
}

/**
 * 获取下级机构
 * @param action$
 * @returns {any}
 */
export function getChildrenAgency(action$) {
  return action$.pipe(
    ofType(types.getChildrenAgency),
    switchMap(() => execute({
      url: `${Url.session}/agencies/children`,
      type: types.getChildrenAgencyComplete
    }))
  );
}

/**
 * 获取平台 资源配置
 * @param action$
 * @returns {any}
 */
export function getResources(action$) {
  return action$.pipe(
    ofType(types.getResources),
    switchMap(({payload}) => execute({
      url: `${Url.session}/resources?platform=${payload}`,
      type: types.getResourcesComplete
    }))
  )
}

/**
 * 退出
 * @param action$
 * @returns {any}
 */
export function startEntityExit(action$) {
  return action$.pipe(
    ofType(types.startEntityExit),
    tap(resetStorage),
    filter(() => {
      location.href = Url.logout;
      return false;
    })
  )
}
