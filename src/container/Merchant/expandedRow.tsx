import * as moment from 'moment';
import { NatureOptions } from '../../constants/selectObj/Nature';
import { SettleTypeOptions } from '../../constants/selectObj/SettleType';
import { IdTypeOptions } from '../../constants/selectObj/IdType';
import Common from '@sitb/wbs/constants/Common';
import { MerchantSettleModeOptions } from '../../constants/selectObj/MerchantSettleMode';
import { AccountTypeOptions } from '../../constants/AccountType';
import { lang } from '../../locale';
import MerchantUtils from './MerchantUtils';
import { MerchantAliPayMccOptions } from '../../constants/selectObj/MerchantAliPayMcc';
import { MerchantStatusOptions } from '../../constants/selectObj/MerchantStatus';
import { MerchantFeeSettleCycleOptions } from '../../constants/selectObj/MerchantFeeSettleCycle';
import { BusinessTypeData } from '../../constants/BusinessType';
import { StatusTypeOptions } from '../../constants/selectObj/StatusType';
import { objectPathGet } from '../../component/Tool/GridInfoUtil';
import ColumnUtil from '../../utils/ColumnUtil';
import { MerchantSettleTypeOptions } from '../../constants/selectObj/MerchantSettleType';
import { MerchantBusinessOptions } from '../../constants/selectObj/MerchantBusinessType';
import { MerchantReviewsStatusOptions } from '../../constants/selectObj/MerchantReviewsStatus';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/21
 */
// 审核说明扩展
export const merchantExplainTitleShow: any = ({changeTypeDefaultValue = '-'}) => [{
  label: lang.merchant.changeExplain,
  value: 'reviewDescribe'
}];

// 商户基本信息show
export const addMerchantBasicShow: any = [{
  label: lang.merchant.status,
  value: 'status',
  setValue: status => status && MerchantStatusOptions[status]
}, {
  label: lang.agency.path,
  value: "agency",
  setValue: agency => agency && `${agency.code}-${agency.name}`
}, {
  label: lang.merchant.name,
  value: "merchantName"
}, {
  label: lang.merchant.title,
  value: "title"
}, {
  label: lang.merchant.nature,
  value: "nature",
  mappingObject: NatureOptions
}, {
  label: lang.businessLicense,
  value: "businessLicense.number"
}, {
  label: lang.merchant.businessIdType,
  value: "businessLicense.type",
  mappingObject: MerchantBusinessOptions
}, {
  label: lang.merchant.address.province,
  value: "address.province"
}, {
  label: lang.merchant.address.city,
  value: "address.city"
}, {
  label: lang.merchant.address.county,
  value: "address.county"
}, {
  label: lang.merchant.address.street,
  value: "address.street"
}, {
  label: lang.merchant.settleMode,
  value: "settleMode",
  mappingObject: MerchantSettleModeOptions
}, {
  label: lang.merchant.feeSettleCycle,
  value: "feeSettleCycle",
  mappingObject: MerchantFeeSettleCycleOptions
}, {
  label: lang.merchant.businessScope,
  value: "businessScope"
}, {
  label: lang.merchant.unionMcc,
  value: "unionMcc"
}, {
  label: lang.merchant.aliPayMcc,
  value: "aliPayMcc",
  mappingObject: MerchantAliPayMccOptions
}, {
  label: lang.merchant.weChatPayMcc,
  value: "weChatPayMcc",
  setValue: string => MerchantUtils.mapWeChatPayMcc(string, true)
}, {
  label: lang.merchant.serviceTel,
  value: "serviceTel"
}, {
  label: lang.merchant.faxNo,
  value: "faxNo"
}, {
  label: lang.merchant.website,
  value: "website"
}, {
  label: lang.merchant.businessTimeOpen,
  value: "businessTime.open",
  setValue: data => moment(Number(data)).format(Common.TIME_FORMAT)
}, {
  label: lang.merchant.businessTimeClose,
  value: "businessTime.close",
  setValue: data => moment(Number(data)).format(Common.TIME_FORMAT)
}];

// 商户法人信息show
export const addMerchantLegalPerson = [{
  label: lang.merchant.legalPerson.name,
  value: "legalPerson.name"
}, {
  label: lang.merchant.legalPerson.idCard.type,
  value: "legalPerson.idCard.type",
  mappingObject: IdTypeOptions
}, {
  label: lang.merchant.legalPerson.phoneNo,
  value: "legalPerson.phoneNo"
}, {
  label: lang.merchant.legalPerson.email,
  value: "legalPerson.email"
}, {
  label: lang.merchant.legalPerson.idCard.number,
  value: "legalPerson.idCard.number"
}];

// 商户联系人信息show
export const addMerchantLinkman = [{
  label: lang.merchant.linkman.name,
  value: "linkman.name"
}, {
  label: lang.merchant.linkman.idCard.type,
  value: "linkman.idCard.type",
  mappingObject: IdTypeOptions
}, {
  label: lang.merchant.linkman.phoneNo,
  value: "linkman.phoneNo"
}, {
  label: lang.merchant.linkman.email,
  value: "linkman.email"
}, {
  label: lang.merchant.linkman.idCard.number,
  value: "linkman.idCard.number"
}];

// 手续费扣款账户
export const addMerchantFeeSettleAccount = [{
  label: lang.merchant.feeSettleAccount.accountType,
  value: "feeSettleAccount.accountType",
  mappingObject: AccountTypeOptions
}, {
  label: lang.merchant.settleAccount.settleType,
  value: "feeSettleAccount.settleType",
  mappingObject: SettleTypeOptions
}, {
  label: lang.merchant.feeSettleAccount.bankName,
  value: "feeSettleAccount.bankName"
}, {
  label: lang.merchant.feeSettleAccount.bankNo,
  value: "feeSettleAccount.bankNo"
}, {
  label: lang.merchant.feeSettleAccount.name,
  value: "feeSettleAccount.name"
}, {
  label: lang.merchant.feeSettleAccount.number,
  value: "feeSettleAccount.number"
}, {
  label: lang.merchant.feeSettleAccount.bankReservedPhone,
  value: "feeSettleAccount.bankReservedPhone"
}];

// 结算信息
export const addMerchantSettleAccount = [{
  label: lang.merchant.settleAccount.accountType,
  value: "settleAccount.accountType",
  mappingObject: AccountTypeOptions
}, {
  label: lang.merchant.settleAccount.settleType,
  value: "settleAccount.settleType",
  mappingObject: SettleTypeOptions
}, {
  label: lang.merchant.settleAccount.bankName,
  value: "settleAccount.bankName"
}, {
  label: lang.merchant.settleAccount.bankNo,
  value: "settleAccount.bankNo"
}, {
  label: lang.merchant.settleAccount.name,
  value: "settleAccount.name"
}, {
  label: lang.merchant.settleAccount.number,
  value: "settleAccount.number"
}, {
  label: lang.merchant.feeSettleAccount.bankReservedPhone,
  value: "settleAccount.bankReservedPhone"
}];

// 审核进程需要展示的数据
export const reviewShow = ({userObject, roleObject}) => [{
  label: lang.merchantReview.status,
  value: 'status',
  mappingObject: MerchantReviewsStatusOptions
}, {
  label: lang.merchantReview.reviewModel,
  value: 'reviewProcess.name'
}, {
  label: lang.merchantReview.reviewModelRemark,
  value: 'reviewProcess.remark'
}, {
  label: lang.merchantReview.nowReviewOpera,
  value: 'reviewUser.userId',
  setValue: userId => userId && userObject[userId]
}, {
  label: lang.merchantReview.nowReviewRole,
  value: 'reviewUser.roleId',
  setValue: roleId => roleId && roleObject[roleId]
}];

// 新增商户业务基本信息
export const addMerchantBusinessBasic = [{
  label: lang.merchantBusiness.businessType,
  value: "businessType",
  setValue: businessType => businessType && BusinessTypeData[businessType]
}, {
  label: lang.merchantBusiness.holidayEnabled,
  value: 'holidayEnabled',
  setValue: holidayEnabled => holidayEnabled && StatusTypeOptions[holidayEnabled]
}, {
  label: lang.merchantBusiness.settleCycle,
  value: 'settleCycle',
  mappingObject: MerchantFeeSettleCycleOptions
}, {
  label: lang.merchantBusiness.settleType,
  value: 'settleType',
  mappingObject: MerchantSettleTypeOptions
}, {
  label: lang.merchantBusiness.feeRefund,
  value: 'feeRefund',
  mappingObject: StatusTypeOptions
}, {
  label: lang.merchantBusiness.refundPeriod,
  value: 'refundPeriod'
}, {
  label: lang.merchantBusiness.refundNumberLimit,
  value: 'refundNumberLimit'
}, {
  label: lang.merchantBusiness.businessTime.open,
  value: 'businessTime.open',
  setValue: data => moment(Number(data)).format(Common.DATETIME_FORMAT)
}, {
  label: lang.merchantBusiness.businessTime.close,
  value: 'businessTime.close',
  setValue: data => moment(Number(data)).format(Common.DATETIME_FORMAT)
}];

// 封装cost
export const businessCostItem = (lang, prefixString) => [{
  label: objectPathGet(lang, `${prefixString}.value`),
  value: `${prefixString}.value`,
  setValue: (value, data) => {
    const type = objectPathGet(data, `${prefixString}.type`);
    return value && `${value}${ColumnUtil.unitJudgment(type)}`;
  }
}, {
  label: objectPathGet(lang, `${prefixString}.min`),
  value: `${prefixString}.min`,
  setValue: min => min && `${min}元`
}, {
  label: objectPathGet(lang, `${prefixString}.max`),
  value: `${prefixString}.max`,
  setValue: max => max && `${max}元`
}];

// 基本费率
export const addMerchantBusinessCost = [
  ...businessCostItem(lang.merchantBusiness, 'normalFeeRate'),
  ...businessCostItem(lang.merchantBusiness, 'serviceFeeRate')
];

// pos费率
export const addMerchantBusinessPos = [
  ...businessCostItem(lang.merchantBusiness, 'posFeeRate.debit'),
  ...businessCostItem(lang.merchantBusiness, 'posFeeRate.ownerDebit'),
  ...businessCostItem(lang.merchantBusiness, 'posFeeRate.credit'),
  ...businessCostItem(lang.merchantBusiness, 'posFeeRate.ownerCredit'),
  ...businessCostItem(lang.merchantBusiness, 'posFeeRate.abroadDebit'),
  ...businessCostItem(lang.merchantBusiness, 'posFeeRate.abroadCredit'),
];


//基本信息
const basicInfo: any = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  itemTitle: lang.basicInfo,
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.merchant.merchantName,
    value: 'merchantName'
  }, {
    label: lang.merchant.merchantNo,
    value: 'merchantNo'
  }, {
    label: lang.merchant.title,
    value: 'title'
  }, {
    label: lang.merchant.nature,
    value: 'nature',
    mappingObject: NatureOptions
  }, {
    label: lang.businessLicense,
    value: 'businessLicense.number'
  }, {
    label: lang.address,
    value: ['address.province', 'address.county', 'address.city', 'address.street']
  }, {
    label: lang.merchant.settleMode,
    value: 'settleMode',
    mappingObject: MerchantSettleModeOptions
  }, {
    label: lang.merchant.feeSettleCycle,
    value: 'feeSettleCycle',
    mappingObject: MerchantFeeSettleCycleOptions
  }, {
    label: lang.merchant.businessTimeOpen,
    value: 'businessTime.close',
    setValue: date => moment(Number(date)).format(Common.TIME_FORMAT)
  }, {
    label: lang.merchant.businessTimeClose,
    value: 'businessTime.open',
    setValue: date => moment(Number(date)).format(Common.TIME_FORMAT)
  }
  ]
};

//法人信息
const legalInfo: any = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  itemTitle: lang.agency.legalInfo,
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.legalPerson,
    value: 'legalPerson.name'
  }, {
    label: lang.idType,
    value: 'legalPerson.identities[0].type',
    mappingObject: IdTypeOptions
  }, {
    label: lang.idNo,
    value: 'legalPerson.identities[0].number',
  }, {
    label: lang.legalPersonPhone,
    value: 'legalPerson.phoneNo'
  }, {
    label: lang.legalEmail,
    value: 'legalPerson.email'
  }
  ]
};

//手续费扣款账户名
const linkmanInfo: any = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  itemTitle: lang.merchant.feeSettleAccount.name,
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.accountType,
    value: 'feeSettleAccount.accountType',
    mappingObject: AccountTypeOptions
  }, {
    label: lang.agency.settleType,
    value: 'feeSettleAccount.settleType',
    mappingObject: SettleTypeOptions
  }, {
    label: lang.agency.settleBank,
    value: 'feeSettleAccount.bankName'
  }, {
    label: lang.agency.accountName,
    value: 'feeSettleAccount.bankNo'
  }, {
    label: lang.agency.accountNumber,
    value: 'feeSettleAccount.number'
  }, {
    label: lang.agency.bankReservedPhone,
    value: 'feeSettleAccount.bankReservedPhone'
  }
  ]
};

//结算信息
const cardInfo: any = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  itemTitle: lang.costInfo,
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.accountType,
    value: 'settleAccount.accountType',
    mappingObject: AccountTypeOptions
  }, {
    label: lang.agency.settleType,
    value: 'settleAccount.settleType',
    mappingObject: SettleTypeOptions
  }, {
    label: lang.agency.settleBank,
    value: 'settleAccount.bankName'
  }, {
    label: lang.agency.accountName,
    value: 'settleAccount.bankNo'
  }, {
    label: lang.agency.accountNumber,
    value: 'settleAccount.number'
  }, {
    label: lang.agency.bankReservedPhone,
    value: 'settleAccount.bankReservedPhone'
  }
  ]
};

export const infoConfig: any = [
  basicInfo,
  legalInfo,
  linkmanInfo,
  cardInfo
];
