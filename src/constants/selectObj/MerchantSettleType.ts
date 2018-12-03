/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/12
 */
import { lang } from '../../locale/index';

/**
 * 结算周期
 */
export const MerchantSettleType = {
  balance: 'BALANCE',

  bankCard: 'BANK_CARD'
};


/**
 * 给select用的options对象
 */
export const MerchantSettleTypeOptions = {
  [MerchantSettleType.balance]: lang.balance,
  [MerchantSettleType.bankCard]: lang.bankCard
};
