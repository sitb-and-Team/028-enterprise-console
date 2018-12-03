/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/27
 */
import { lang } from '../../locale';

// 商户审核状态
export const MerchantReviews = {
  /**
   * 同意
   */
  resolve: 'RESOLVE',
  /**
   * 拒绝
   */
  rejected: 'REJECTED'
};

// 商户审核options状态
export const MerchantReviewsOptions = {
  [MerchantReviews.resolve]: lang.resolve,
  [MerchantReviews.rejected]: lang.rejected
};
