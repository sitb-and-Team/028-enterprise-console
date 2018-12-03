/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */
import { lang } from '../../locale/index';

// 查错状态
export const settleCheckMistakeStatus = {
  success: 'SUCCESS',
  systemExist: 'SYSTEM_EXIST',
  channelExist: 'CHANNEL_EXIST'
};

// 查错状态options
export const settleCheckMistakeStatusOptions = {
  [settleCheckMistakeStatus.success]: lang.success,
  [settleCheckMistakeStatus.systemExist]: lang.settleCheckMistake.systemExist,
  [settleCheckMistakeStatus.channelExist]: lang.settleCheckMistake.channelExist
};
