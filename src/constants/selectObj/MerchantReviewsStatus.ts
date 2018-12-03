/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/21
 */
import { lang } from '../../locale/index';

// 商户审核状态
export const MerchantReviewsStatus = {
  /**
   * 正常
   */
  success: 'SUCCESS',
  /**
   * 失败
   */
  failure: 'FAILURE',
  /**
   * 审核中
   */
  wait: 'WAIT'
};

// 商户审核options状态
export const MerchantReviewsStatusOptions = {
  [MerchantReviewsStatus.success]: lang.success,
  [MerchantReviewsStatus.failure]: lang.failure,
  [MerchantReviewsStatus.wait]: lang.wait
};
