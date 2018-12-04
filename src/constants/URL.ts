const {api, authApi, commonApi} = (global as any).config;

export {
  commonApi
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
export default {
  session: `${api}/session`,

  loginBound: `${api}/session/operators/merchants`,
  loginSend: `${api}/merchant-check-value`,
  logout: `${authApi}/logout`,

  paymentTrade: `${api}/payment-records`,
  settlePayment: `${api}/settle`,

  merchant: `${api}/merchants`,

  qrCode: `${api}/qr-codes`,
  spdQrCode: `${api}/qr-codes`,


  permissions: `${api}/permissions`,

  systemResources: `${api}/permissions`,
  systemConfig: `${api}/config`,
  systemOperator: `${api}/operators`,
  systemProcess: `${api}/process`,

  roles: `${api}/roles`,

  controlMerchantLimits: `${api}/payment-limits`,

  advanceMoney:`${api}/overdraft-amounts`,

}
