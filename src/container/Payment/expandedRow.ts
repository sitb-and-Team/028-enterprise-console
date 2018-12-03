import { GridInfoProps } from '../../component/Tool/GridInfoUtil';
import { BankCardTypeOptions } from '../../constants/selectObj/BankCardType';
import { lang } from '../../locale';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/12
 */

// 交易扩展表单配置
export const tradeExpandedRowConfig: GridInfoProps = {
  rows: [{
    label: lang.channelFlag,
    value: 'channelFlag'
  }, {
    label: lang.channelMerchant.no,
    value: 'channelMerchantNo'
  }, {
    label: lang.channelMerchant.number,
    value: 'channelAuditNumber'
  }, {
    label: lang.bankCardNumber,
    value: 'cardNo'
  }, {
    label: lang.bankCardType,
    value: 'bankCardType',
    mappingObject: BankCardTypeOptions
  }, {
    label: lang.payment.responseCode,
    value: 'responseCode'
  }, {
    label: lang.payment.responseMsg,
    value: 'responseMsg'
  }, {
    label: lang.payment.deviceInfo,
    value: 'device'
  }, {
    label: lang.address,
    value: 'address'
  }, {
    label: lang.remark,
    value: 'describe'
  }]
};
