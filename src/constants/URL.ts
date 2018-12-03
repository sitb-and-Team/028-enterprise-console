const {api, authApi, commonApi} = (global as any).config;

export {
  commonApi
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export default {
  agency: `${api}/agencies`,
  agencyBusiness: agencyId => `${api}/agencies/${agencyId}/business`,

  channel: `${api}/channels`,
  channelBusiness: channelsFlag => `${api}/channels/${channelsFlag}/business`,
  channelMerchant: `${api}/channels/merchants`,
  channelConfig: channelFlag => `${api}/channels/${channelFlag}/configs`,
  channelMerchantBusiness: businessType => `${api}/channels/merchants/${businessType}/businesses`,

  merchant: `${api}/merchants`,
  merchantBusiness: merchantId => `${api}/merchants/${merchantId}/business`,

  paymentTrade: `${api}/payment/trades`,
  paymentRoute: `${api}/payment/route-rules`,
  permissions: `${api}/permissions`,

  rateTemplate: `${api}/template`,

  settlePayment: `${api}/payment/trade-settle`,
  settleTask: `${api}/payment/settle-task`,
  settleDetails: `${api}/payment/settle-detail`,
  settleReconciliationTask: `${api}/payment/reconciliation-task`,
  settleCheckMistakes: `${api}/payment/mistakes`,

  session: `${api}/session`,
  logout: `${authApi}/logout`,
  systemClient: `${api}/session/agencies/clients`,
  loginBound: `${api}/session/operators/agencies`,

  systemResources: `${api}/permissions`,
  systemConfig: `${api}/config`,
  systemOperator: `${api}/operators`,
  systemProcess: `${api}/process`,

  loginSend: `${api}/agency-check-value`,
  roles: `${api}/roles`,

  controlMerchantLimits: `${api}/payment-limits`,

  paymentRiskRule:`${api}/paymentLimit`,
  advanceMoney:`${api}/overdraft-amounts`,
}
