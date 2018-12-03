/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */
import { lang } from '../../locale/index';

// 查错结果类型
export const SettleCheckMistakeResult = {
  systemExist: 'SYSTEM_EXIST',
  channelExist: 'CHANNEL_EXIST'
};

// 查错结果类型options
export const SettleCheckMistakeResultOptions = {
  [SettleCheckMistakeResult.systemExist]: lang.settleCheckMistake.systemExist,
  [SettleCheckMistakeResult.channelExist]: lang.settleCheckMistake.channelExist
};
