/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/8
 */
/**
 * 账户类型
 */
import { lang } from '../../locale/index';

export const BankCardType = {
  /**
   * 借记卡；签帐卡；提款卡
   */
  debitCard: 'DEBIT_CARD',
  /**
   * 信用卡
   */
  creditCard: 'CREDIT_CARD',
  /**
   * 准贷记卡
   */
  semiCreditCard: 'SEMI_CREDIT_CARD',
  /**
   * 预付卡
   */
  prepaidCard: 'PREPAID_CARD'
};

export const BankCardTypeOptions = {
  [BankCardType.debitCard]: lang.debitCard,
  [BankCardType.creditCard]: lang.creditCard,
  [BankCardType.semiCreditCard]: lang.semiCreditCard,
  [BankCardType.prepaidCard]: lang.prepaidCard
};
