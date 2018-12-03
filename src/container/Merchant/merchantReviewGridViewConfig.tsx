import Common from '@sitb/wbs/constants/Common';
import * as moment from 'moment';

import { StatusYesAndNoOptions } from '../../constants/selectObj/StatusType';
import { MerchantSettleModeOptions } from '../../constants/selectObj/MerchantSettleMode';
import { MerchantStatusOptions } from '../../constants/selectObj/MerchantStatus';
import { MerchantAliPayMccOptions } from '../../constants/selectObj/MerchantAliPayMcc';
import { NatureOptions } from '../../constants/selectObj/Nature';
import MerchantUtils from './MerchantUtils';
import { SettleTypeOptions } from '../../constants/selectObj/SettleType';
import { IdTypeOptions } from '../../constants/selectObj/IdType';
import { AccountTypeOptions } from '../../constants/AccountType';
import { MerchantBusinessOptions } from '../../constants/selectObj/MerchantBusinessType';
import { MerchantFeeSettleCycleOptions } from '../../constants/selectObj/MerchantFeeSettleCycle';


/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/10
 */
// 定义转义key
export const mappingObjectKey = {
  active: 'active',
  aliPayMcc: 'aliPayMcc',
  'businessLicense.type': 'businessLicense.type',
  'feeSettleAccount.accountType': 'feeSettleAccount.accountType',
  'feeSettleAccount.settleType': 'feeSettleAccount.settleType',
  'settleAccount.accountType': 'settleAccount.accountType',
  'settleAccount.settleType': 'settleAccount.settleType',
  'feeSettleCycle': 'feeSettleCycle',
  'legalPerson.idCard.type': 'legalPerson.idCard.type',
  'legalPerson.identities[0].type': 'legalPerson.identities[0].type',
  'linkman.idCard.type': 'linkman.idCard.type',
  'linkman.identities[0].type': 'linkman.identities[0].type',
  nature: 'nature',
  settleMode: 'settleMode',
  status: 'status'
};

// 定义转义options
export const mappingObjectGather: any = {
  [mappingObjectKey.active]: StatusYesAndNoOptions,
  [mappingObjectKey.aliPayMcc]: MerchantAliPayMccOptions,
  [mappingObjectKey['businessLicense.type']]: MerchantBusinessOptions,
  [mappingObjectKey['feeSettleAccount.accountType']]: AccountTypeOptions,
  [mappingObjectKey['feeSettleAccount.settleType']]: SettleTypeOptions,
  [mappingObjectKey['settleAccount.accountType']]: AccountTypeOptions,
  [mappingObjectKey['settleAccount.settleType']]: SettleTypeOptions,
  [mappingObjectKey['feeSettleCycle']]: MerchantFeeSettleCycleOptions,
  [mappingObjectKey['legalPerson.idCard.type']]: IdTypeOptions,
  [mappingObjectKey['legalPerson.identities[0].type']]: IdTypeOptions,
  [mappingObjectKey['linkman.idCard.type']]: IdTypeOptions,
  [mappingObjectKey['linkman.identities[0].type']]: IdTypeOptions,
  [mappingObjectKey.nature]: NatureOptions,
  [mappingObjectKey.settleMode]: MerchantSettleModeOptions,
  [mappingObjectKey.status]: MerchantStatusOptions,
};

// 定义setKey
export const setValueKey = {
  weChatPayMcc: 'weChatPayMcc',
  'businessTime.open': 'businessTime.open',
  'businessTime.close': 'businessTime.close',
};

// setKey方法
export const setValueGather = {
  [setValueKey.weChatPayMcc]: string => MerchantUtils.mapWeChatPayMcc(string, true),
  [setValueKey['businessTime.close']]: date => moment(Number(date)).format(Common.TIME_FORMAT),
  [setValueKey['businessTime.open']]: date => moment(Number(date)).format(Common.TIME_FORMAT),
};
