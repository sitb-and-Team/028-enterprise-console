/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */
/**
 * 认证模式类型
 */
import { lang } from '../../locale/index';

export const MerchantAuthMode = {
  /**
   * 四要素鉴权
   */
  fourHolder: 'FOUR_HOLDER',

  /**
   * 三要素鉴权
   */
  threeHolder: 'THREE_HOLDER',

  /**
   * 二要素鉴权
   */
  towHolder: 'TOW_HOLDER',

  /**
   * 人工审核
   */
  manualVerify: 'MANUAL_VERIFY',

  /**
   * 不认证
   */
  notAuthentication: 'NOT_AUTHENTICATION'
};

// 商户认证模式options
export const MerchantAuthModeOptions = {
  [MerchantAuthMode.fourHolder]: lang.fourHolder,
  [MerchantAuthMode.threeHolder]: lang.threeHolder,
  [MerchantAuthMode.towHolder]: lang.towHolder,
  [MerchantAuthMode.manualVerify]: lang.manualVerify,
  [MerchantAuthMode.notAuthentication]: lang.notAuthentication
};
