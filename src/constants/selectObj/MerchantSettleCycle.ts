/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/12
 */
import { lang } from '../../locale/index';

/**
 * 结算周期
 */
export const MerchantSettleCycle = {
  D0: 'D0',

  T1: 'T1'
};


/**
 * 给select用的options对象
 */
export const MerchantSettleCycleOptions = {
  [MerchantSettleCycle.D0]: lang.d0,
  [MerchantSettleCycle.T1]: lang.t1
};
