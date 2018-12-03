/**
 * 账户类型
 */
import { lang } from '../locale';

export const AccountType = {
  /**
   * 银行账户
   */
  bank: 'BANK',
  /**
   * 支付宝账户
   */
  aliPay: 'Ali_PAY'
};

export const AccountTypeOptions = {
  [AccountType.bank]: lang.agency.accountBank,
  [AccountType.aliPay]: lang.agency.accountAliPay
};

// 只包含银行账户 option
export const AccountTypeOnlyBankOptions = {
  [AccountType.bank]: lang.agency.accountBank
};
