/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */
import { lang } from '../../locale/index';

// 对账任务状态
export const settleReconciliationTaskStatus = {
  success: 'SUCCESS',
  wait: 'WAIT',
  failure: 'FAILURE',
  processing: 'PROCESSING'
};

// 状态options
export const settleReconciliationTaskStatusOptions = {
  [settleReconciliationTaskStatus.success]: lang.success,
  [settleReconciliationTaskStatus.wait]: lang.wait,
  [settleReconciliationTaskStatus.failure]: lang.failure,
  [settleReconciliationTaskStatus.processing]: lang.processing
};
