import { lang } from '../../locale/index';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/15
 */
export const MerchantSelectMode = {
  /**
   * 查找匹配数据的第一个
   */
  default: 'DEFAULT',
  /**
   * 从匹配数据中进行负载均衡
   */
  loadBalance: 'LOAD_BALANCE',
  /**
   * 随机选择
   */
  random: 'RANDOM',
  /**
   * 固定一个商户
   */
  fixed: 'FIXED',
  /**
   * 固定商户进行负载均衡
   */
  fixedBalance: 'FIXED_BALANCE',
  /**
   * 固定商户中随机
   */
  fixedRandom: 'FIXED_RANDOM',
};

// 商户选择模式
export const MerchantSelectModeOptions = {
  [MerchantSelectMode.default]: lang.paymentRoute.default,
  [MerchantSelectMode.loadBalance]: lang.paymentRoute.loadBalance,
  [MerchantSelectMode.random]: lang.paymentRoute.random,
  [MerchantSelectMode.fixed]: lang.paymentRoute.fixed,
  [MerchantSelectMode.fixedBalance]: lang.paymentRoute.fixedBalance,
  [MerchantSelectMode.fixedRandom]: lang.paymentRoute.fixedRandom
};
