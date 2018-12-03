/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/10
 */
/**
 * 商户手续费收取周期
 */
import { lang } from '../../locale/index';

export const MerchantFeeSettleCycle = {
  d0: 'D0',
  t0: 'T0',
  t1: 'T1',
  t7: 'T7',
  t15: 'T15',
  t30: 'T30',
  t90: 'T90',
  t180: 'T180',
  t365: 'T365',
  manual: 'MANUAL'
};

export const MerchantFeeSettleCycleOptions = {
  [MerchantFeeSettleCycle.d0]: lang.d0,
  [MerchantFeeSettleCycle.t0]: lang.t0,
  [MerchantFeeSettleCycle.t1]: lang.t1,
  [MerchantFeeSettleCycle.t7]: lang.t7,
  [MerchantFeeSettleCycle.t15]: lang.t15,
  [MerchantFeeSettleCycle.t30]: lang.t30,
  [MerchantFeeSettleCycle.t90]: lang.t90,
  [MerchantFeeSettleCycle.t180]: lang.t180,
  [MerchantFeeSettleCycle.t365]: lang.t365,
  [MerchantFeeSettleCycle.manual]: lang.merchant.manual,
};
