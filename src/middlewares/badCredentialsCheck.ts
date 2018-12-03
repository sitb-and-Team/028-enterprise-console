import { ErrorCode } from '../constants/ErrorCode';
import { resetStorage } from '../core/SessionServices';

/**
 * 无效的授权检查
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2016/10/8
 */
export default () => next => action => {
  const {status} = action;
  // 1000状态码
  if (status === ErrorCode.UNAUTHORIZED) {
    console.log('用户授权不正确');
    // redirectUri目前平台地址，appUri后台登录地址
    resetStorage();

    return next({
      type: 'clear'
    });
  }
  return next(action);
};
