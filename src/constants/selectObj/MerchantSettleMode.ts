/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/10
 */
/**
 * 商户结算模式
 */
import { lang } from '../../locale/index';

export const MerchantSettleMode = {
  /**
   * 差额
   */
  difference: 'DIFFERENCE',
  /**
   * 全额
   */
  fullAmount: 'FULL_AMOUNT'
};

export const MerchantSettleModeOptions = {
  [MerchantSettleMode.difference]: lang.merchant.difference,
  [MerchantSettleMode.fullAmount]: lang.merchant.fullAmount
};
