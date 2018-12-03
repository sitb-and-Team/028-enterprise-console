/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/23
 */
/**
 * 出款明细状态
 */
import { lang } from '../../locale';

export const SettleTradeDetailStatus = {
  /**
   * 成功
   */
  success: 'SUCCESS',
  /**
   * 失败
   */
  failure: 'FAILURE',
  /**
   * 处理中
   */
  processing: 'PROCESSING',
  /**
   * 等待处理中
   */
  wait: 'WAIT'
};

// 状态select options
export const SettleTradeDetailStatusOptions = {
  [SettleTradeDetailStatus.success]: lang.success,
  [SettleTradeDetailStatus.failure]: lang.failure,
  [SettleTradeDetailStatus.processing]: lang.processing,
  [SettleTradeDetailStatus.wait]: lang.wait,
};
