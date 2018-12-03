/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/14
 */
/**
 * 结算状态
 */
import { lang } from '../../locale/index';

export const settleStatus = {
  /**
   * 未处理
   */
  untreated: 'UNTREATED',
  /**
   * 成功
   */
  success: 'SUCCESS',
  /**
   * 失败
   */
  failure: 'FAILURE',
  /**
   * 等待中
   */
  processing: 'PROCESSING',
  /**
   * 异常
   */
  exception: 'EXCEPTION',
};

export const SettleStatusOptions = {
  [settleStatus.untreated]: lang.untreated,
  [settleStatus.success]: lang.success,
  [settleStatus.failure]: lang.failure,
  [settleStatus.processing]: lang.processing,
  [settleStatus.exception]: lang.exception
};
