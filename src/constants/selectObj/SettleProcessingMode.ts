/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import { lang } from '../../locale';

// 处理方式
export const SettleProcessingMode = {
  /**
   * 系统处理,调用出款交易出款
   */
  system: 'SYSTEM',
  /**
   * 人工处理
   */
  manual: 'MANUAL'
};

// 处理方式options
export const SettleProcessingModeOptions = {
  [SettleProcessingMode.system]: lang.merchant.system,
  [SettleProcessingMode.manual]: lang.merchant.manual
};
