/** * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/15
 */
import { lang } from '../../locale';

// 出款任务状态
export const SettleTaskStatus = {
  success: 'SUCCESS',
  /**
   * 处理失败
   */
  failure: 'FAILURE',
  /**
   * 处理中
   */
  processing: 'PROCESSING',
  /**
   * 未处理
   */
  untreated: 'UNTREATED',
  /**
   * 驳回
   */
  exception: 'EXCEPTION'
};

// 出款任务options
export const SettleTaskStatusOptions = {
  [SettleTaskStatus.success]: lang.success,
  [SettleTaskStatus.failure]: lang.failure,
  [SettleTaskStatus.processing]: lang.processing,
  [SettleTaskStatus.untreated]: lang.untreated,
  [SettleTaskStatus.exception]: lang.exception
};
