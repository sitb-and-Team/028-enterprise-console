/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */
/**
 * 交易状态类型
 */
import { lang } from '../../locale/index';

export const TradeStatus = {
  /**
   * 成功
   */
  success: 'SUCCESS',
  /**
   * 失败
   */
  failure: 'FAILURE',
  /**
   * 待支付
   */
  waitPayment: 'WAIT_PAYMENT',
  /**
   * 处理中
   */
  processing: 'PROCESSING',

  /**
   * 交易已撤销取消
   */
  cancelled: 'CANCELLED',

  /**
   * 删除
   */
  delete: 'DELETE',
  /**
   * 全额退货
   */
  refunded: 'REFUNDED',
  /**
   * 部分退货
   */
  refundedPart: 'REFUNDED_PART'
};

export const TradeStatusOptions = {
  [TradeStatus.success]: lang.success,
  [TradeStatus.failure]: lang.failure,
  [TradeStatus.waitPayment]: lang.waitPayment,
  [TradeStatus.processing]: lang.processing,
  [TradeStatus.cancelled]: lang.payment.cancelled,
  [TradeStatus.delete]: lang.delete,
  [TradeStatus.refunded]: lang.payment.refunded,
  [TradeStatus.refundedPart]: lang.payment.refundedPart
};
