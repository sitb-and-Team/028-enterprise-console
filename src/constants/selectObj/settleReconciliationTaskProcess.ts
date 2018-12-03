/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */
import { lang } from '../../locale/index';

// 对账任务 当前进程
export const settleReconciliationTaskProcess = {
  loadPaymentRecord: 'LOAD_PAYMENT_RECORD',
  channelCompare: 'CHANNEL_COMPARE',
  systemCompare: 'SYSTEM_COMPARE'
};

// 进程options
export const settleReconciliationTaskProcessOptions = {
  [settleReconciliationTaskProcess.loadPaymentRecord]: lang.settleReconciliationTask.loadPaymentRecord,
  [settleReconciliationTaskProcess.channelCompare]: lang.settleReconciliationTask.channelCompare,
  [settleReconciliationTaskProcess.systemCompare]: lang.settleReconciliationTask.systemCompare
};
