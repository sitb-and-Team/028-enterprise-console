import { lang } from '../../locale/index';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/15
 */

export const MerchantMode = {
  oneToOne: 'ONE_TO_ONE',
  oneToMany: 'ONE_TO_MANY'
};

// 商户代理模式
export const MerchantModeOptions = {
  [MerchantMode.oneToOne]: lang.merchantOneToOne,
  [MerchantMode.oneToMany]: lang.merchantOneToMany
};

// 第一条商户代理模式
export const firstMerchantMode = Object.keys(MerchantModeOptions)[0];
