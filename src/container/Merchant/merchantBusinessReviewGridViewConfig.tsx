/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/10
 */
import { StatusTypeOptions } from '../../constants/selectObj/StatusType';
import { MerchantFeeSettleCycleOptions } from '../../constants/selectObj/MerchantFeeSettleCycle';
import { BusinessTypeData } from '../../constants/BusinessType';
import Common from '@sitb/wbs/constants/Common';
import * as moment from 'moment';
import { MerchantSettleTypeOptions } from '../../constants/selectObj/MerchantSettleType';
import { RateTypeOptions } from '../../constants/selectObj/RateType';

// 定义转义key
export const mappingObjectKey = {
  businessType: 'businessType',
  enabled: 'enabled',
  holidayEnabled: 'holidayEnabled',
  settleCycle: 'settleCycle',
  settleType: 'settleType',
  'normalFeeRate.type': 'normalFeeRate.type',
  'serviceFeeRate.type': 'serviceFeeRate.type',
  'debitFeeRate.type': 'debitFeeRate.type',
  'creditFeeRate.type': 'creditFeeRate.type',
  'abroadFeeRate.type': 'abroadFeeRate.type'
};

// 定义转义options
export const mappingObjectGather: any = {
  [mappingObjectKey.businessType]: BusinessTypeData,
  [mappingObjectKey.enabled]: StatusTypeOptions,
  [mappingObjectKey.holidayEnabled]: StatusTypeOptions,
  [mappingObjectKey.settleCycle]: MerchantFeeSettleCycleOptions,
  [mappingObjectKey.settleType]: MerchantSettleTypeOptions,
  [mappingObjectKey['normalFeeRate.type']]: RateTypeOptions,
  [mappingObjectKey['serviceFeeRate.type']]: RateTypeOptions,
  [mappingObjectKey['debitFeeRate.type']]: RateTypeOptions,
  [mappingObjectKey['creditFeeRate.type']]: RateTypeOptions,
  [mappingObjectKey['abroadFeeRate.type']]: RateTypeOptions
};

// 定义setKey
export const setValueKey = {
  'businessTime.close': 'businessTime.close',
  'businessTime.open': 'businessTime.open'
};

// setKey方法
export const setValueGather = {
  [setValueKey['businessTime.close']]: date => moment(Number(date)).format(Common.TIME_FORMAT),
  [setValueKey['businessTime.open']]: date => moment(Number(date)).format(Common.TIME_FORMAT)
};
