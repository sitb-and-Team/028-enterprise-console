import getErrMsg, { setErrMsg } from '@sitb/wbs/utils/getErrMsg';
import { message } from 'antd';
import { getActions } from './store';
import { resErrMsg } from '../locale';
import { ErrorCode } from '../constants/ErrorCode';

setErrMsg(resErrMsg);

/**
 * @param prefix 错误消息前缀
 * @param successTip 执行成功是否执行toast提示
 * @param errorTip 执行失败是否执行toast提示
 * @param successPop 执行成功是否执行返回动作
 */
export default ({prefix = '', successTip = true, errorTip = true, successPop = false} = {}) => args => {
  const {status} = args;
  const msg = getErrMsg(args, prefix);
  if (status === '0000') {
    successTip && message.success(msg);
    successPop && getActions().navigator.back();
  } else if (status === ErrorCode.EXCEPTION) {
    message.warn(msg);
  }
  else if (errorTip) {
    message.warn(msg);
  }
};
