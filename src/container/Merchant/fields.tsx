import * as React from 'react';
import { Cascader } from 'antd';
import { Nature, NatureOptions } from '../../constants/selectObj/Nature';
import china from '@sitb/wbs/region/china';
import { personal, settleField } from '../../constants/FieldsPersonal';
import { lang } from '../../locale';
import { MerchantSettleTypeOptions } from '../../constants/selectObj/MerchantSettleType';
import { MerchantStatusOptions } from '../../constants/selectObj/MerchantStatus';
import { AgencySelect } from '../../component/Tool/AgencySelect';
import { MerchantSettleModeOptions } from '../../constants/selectObj/MerchantSettleMode';
import { MerchantFeeSettleCycleOptions } from '../../constants/selectObj/MerchantFeeSettleCycle';
import { MerchantAliPayMccOptions } from '../../constants/selectObj/MerchantAliPayMcc';
import { AccountTypeOnlyBankOptions } from '../../constants/AccountType';
import { StatusYesAndNoOptions } from '../../constants/selectObj/StatusType';
import MerchantsTypes from "../../constants/selectObj/MerchantsWeChatPayMcc";
import { MerchantBusinessOptions } from '../../constants/selectObj/MerchantBusinessType';
import Patten from "../../utils/Pattern";
import * as moment from "moment";
import {momentCommon} from "../../constants/objectKey";

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */
// 商户搜索表单
export const merchantSearch = [{
  isSearch: true,
  fields: [{
    name: 'agencyId',
    label: lang.agency.id
  }, {
    name: 'nameOrNo',
    label: lang.merchant.info
  }, {
    name: 'title',
    label: lang.merchant.title
  }, {
    name: 'legalPerson',
    label: lang.legalPerson
  }, {
    name: 'legalPersonPhoneNo',
    label: lang.legalPersonPhone
  }, {
    name: 'businessTime',
    label: lang.businessTime,
    type: 'dateRange'
  }, {
    name: 'status',
    label: lang.status,
    type: 'select',
    options: MerchantStatusOptions
  }]
}];


/**
 * 商户结算信息
 * @param {any} accountTypeChange   结算账户change
 * @param {any} settleTypeBan       结算类型禁用状态
 * @param {any} settlePhoneNoRule   结算手机号禁用状态
 * @param {any} feeCardNoRule    结算账户号正则状态
 * @param {any} onFocus             表单聚焦
 * @returns
 */
export const merchantCostFields: any = ({
                                          accountTypeChange,
                                          settleTypeBan = false,
                                          settlePhoneNoRule = true,
                                          feeCardNoRule = false,
                                          onFocus = (key) => undefined
                                        }) => [{
  title: lang.settleInfo,
  fields: settleField({
    accountTypeChange,
    settleTypeBan,
    phoneNoRule: settlePhoneNoRule,
    cardNoRule: feeCardNoRule,
    onFocus
  })
}, {
  title: lang.explain,
  fields: [{
    label: lang.merchant.explain,
    name: 'describe'
  }]
}];

/**
 * 商户基本信息表单
 * @param {func}    onNatureChange            商户企业性质change函数
 * @param {func}    merchantFeeSettleChange   商户手续费扣费change函数
 * @param {boolean} legalPersonBan            法人禁用状态
 * @param {boolean} linkmanPersonBan          联系人禁用状态
 * @param {boolean} legalIdTypeBan            法人证件类型禁用状态
 * @param {boolean} linkmanIdTypeBan          联系人证件类型禁用状态
 * @param {boolean} legalIdNoBan              法人证件号禁用状态
 * @param {boolean} linkmanIdNoBan            联系人证件号禁用状态
 * @param {boolean} legalPhoneBan             法人手机号禁用状态
 * @param {boolean} linkmanPhoneBan           联系人手机号禁用状态
 * @param {boolean} legalEmailBan             法人邮箱禁用状态
 * @param {boolean} linkmanEmailBan           联系人邮箱禁用状态
 * @param {boolean} agencyIdBan               机构id禁用状态
 * @param {boolean} merchantSettleModeBan     商户结算模式禁用状态
 * @param {func}    onFocus                   表单聚焦事件
 * @param {boolean} legalPersonIdNoRule       法人证件号正则状态
 * @param {boolean} legalPersonPhoneNoRule    法人手机号正则状态
 * @param {boolean} linkmanIdNoRule           联系人证件号正则状态
 * @param {boolean} linkmanPhoneNoRule        联系人手机号正则状态
 * @param {boolean} feeCardNoRule          结算帐号正则状态
 * @param {boolean} settlePhoneNoRule         结算手机号正则状态
 * @returns
 */
export const merchantBasicFields: any = ({
                                           onNatureChange,
                                           merchantFeeSettleChange,
                                           legalPersonBan = false,
                                           linkmanPersonBan = false,
                                           legalIdTypeBan = false,
                                           linkmanIdTypeBan = false,
                                           legalIdNoBan = false,
                                           linkmanIdNoBan = false,
                                           legalPhoneBan = false,
                                           linkmanPhoneBan = false,
                                           legalEmailBan = false,
                                           linkmanEmailBan = false,
                                           agencyIdBan = false,
                                           merchantSettleModeBan = false,
                                           onFocus = (key) => undefined,
                                           legalPersonIdNoRule = true,
                                           legalPersonPhoneNoRule = true,
                                           linkmanIdNoRule = true,
                                           linkmanPhoneNoRule = true,
                                           feeCardNoRule = false,
                                           settlePhoneNoRule = true
                                         }) => [{
  title: lang.basicInfo,
  fields: [{
    label: lang.agency.title,
    name: 'agencyId',
    render: () => <AgencySelect disabled={agencyIdBan}/>
  }, {
    label: lang.merchant.name,
    name: 'merchantName',
    maxLength:25
  }, {
    label: lang.merchant.title,
    name: 'title'
  }, {
    label: lang.merchant.nature,
    name: 'nature',
    type: 'select',
    options: NatureOptions,
    onChange: onNatureChange,
    decoratorOptions: {
      initialValue: Nature.personal
    }
  }, {
    label: lang.businessLicense,
    name: 'businessLicense',
    rules: Patten.businessLicense
  }, {
    label: lang.merchant.businessIdType,
    name: 'businessIdType',
    type: 'select',
    options: MerchantBusinessOptions
  }, {
    label: lang.region,
    name: 'address',
    render: () => <Cascader options={china}
                            placeholder="请选择"
    />
  }, {
    label: lang.agency.street,
    name: 'street'
  }, {
    label: lang.merchant.settleMode,
    name: 'settleMode',
    disabled: merchantSettleModeBan,
    type: 'select',
    options: MerchantSettleModeOptions
  }, {
    label: lang.merchant.feeSettleCycle,
    name: 'feeSettleCycle',
    type: 'select',
    options: MerchantFeeSettleCycleOptions
  }, {
    label: lang.merchant.businessScope,
    name: 'businessScope',
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.unionMcc,
    name: 'unionMcc',
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.aliPayMcc,
    name: 'aliPayMcc',
    type: 'select',
    options: MerchantAliPayMccOptions,
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.weChatPayMcc,
    name: 'weChatPayMcc',
    render: () => <Cascader options={MerchantsTypes}
                            placeholder="请选择"
    />,
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.serviceTel,
    name: 'serviceTel',
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.faxNo,
    name: 'faxNo',
    rules: [{
      required: false
    }]
  }, {
    label: lang.agency.website,
    name: 'website',
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.businessTimeOpen,
    name: 'open',
    type: 'time',
    decoratorOptions: {
      initialValue: moment('00:00:00', momentCommon.TIME)
    }
  }, {
    label: lang.merchant.businessTimeClose,
    name: 'close',
    type: 'time',
    decoratorOptions: {
      initialValue: moment('23:59:59', momentCommon.TIME)
    }
  }]
}, {
  title: lang.legalPerson,
  fields: personal({
    prefixString: 'legalPerson',
    personBan: legalPersonBan,
    idTypeBan: legalIdTypeBan,
    idNoBan: legalIdNoBan,
    phoneBan: legalPhoneBan,
    emailBan: legalEmailBan,
    phoneNoRule: legalPersonPhoneNoRule,
    idNoRule: legalPersonIdNoRule,
    onFocus
  })
}, {
  title: lang.linkman,
  fields: personal({
    prefixString: 'linkman',
    personBan: linkmanPersonBan,
    idTypeBan: linkmanIdTypeBan,
    idNoBan: linkmanIdNoBan,
    phoneBan: linkmanPhoneBan,
    emailBan: linkmanEmailBan,
    phoneNoRule: linkmanPhoneNoRule,
    idNoRule: linkmanIdNoRule,
    onFocus
  })
}, {
  title: lang.merchant.feeSettleAccountString,
  fields: settleField({
    prefixString: 'feeSettleAccount',
    labelPrefixString: 'merchant.feeSettleAccount',
    accountTypeChange: merchantFeeSettleChange,
    accountTypeOptions: AccountTypeOnlyBankOptions,
    cardNoRule: feeCardNoRule,
    phoneNoRule: settlePhoneNoRule,
    onFocus,
    accountNumberProps: {
      type: 'number',
      maxLength: 20
    }
  })
}];

/**
 * 商户表单创建
 * @param {func}    onNatureChange            商户性质Change事件
 * @param {func}    accountTypeChange         结算账户类型Change事件
 * @param {func}    merchantFeeSettleChange   手续费扣费结算账户change事件
 * @param {boolean} legalPersonBan            法人禁用状态
 * @param {boolean} linkmanPersonBan          联系人禁用状态
 * @param {boolean} legalIdTypeBan            法人证件类型禁用状态
 * @param {boolean} linkmanIdTypeBan          联系人证件类型禁用状态
 * @param {boolean} legalIdNoBan              法人证件号禁用状态
 * @param {boolean} linkmanIdNoBan            联系人证件号禁用状态
 * @param {boolean} legalPhoneBan             法人手机号禁用状态
 * @param {boolean} linkmanPhoneBan           联系人手机号禁用状态
 * @param {boolean} legalEmailBan             法人邮箱禁用状态
 * @param {boolean} linkmanEmailBan           联系人邮箱禁用状态
 * @param {boolean} agencyIdBan               机构id禁用状态
 * @param {boolean} merchantSettleModeBan     商户结算模式禁用状态
 * @param {boolean} onFocus                   聚焦事件
 * @param {boolean} legalPersonIdNoRule       法人证件号正则状态
 * @param {boolean} legalPersonPhoneNoRule    法人手机号正则状态
 * @param {boolean} linkmanIdNoRule           联系人证件号正则状态
 * @param {boolean} linkmanPhoneNoRule        联系人手机号正则状态
 * @param {boolean} feeCardNoRule          结算账户名正则状态
 * @param {boolean} settlePhoneNoRule         结算手机号正则状态
 * @param settleTypeBan
 * @returns {(any)[]}
 */
export const merchantCreate: any = ({
                                      onNatureChange,
                                      accountTypeChange,
                                      merchantFeeSettleChange,
                                      legalPersonBan = false,
                                      linkmanPersonBan = false,
                                      legalIdTypeBan = false,
                                      linkmanIdTypeBan = false,
                                      legalIdNoBan = false,
                                      linkmanIdNoBan = false,
                                      legalPhoneBan = false,
                                      linkmanPhoneBan = false,
                                      legalEmailBan = false,
                                      linkmanEmailBan = false,
                                      agencyIdBan = false,
                                      merchantSettleModeBan = false,
                                      onFocus = (key) => undefined,
                                      legalPersonIdNoRule = true,
                                      legalPersonPhoneNoRule = true,
                                      linkmanIdNoRule = true,
                                      linkmanPhoneNoRule = true,
                                      feeCardNoRule = false,
                                      settlePhoneNoRule = true,
                                      settleTypeBan
                                    }) => [
  ...merchantBasicFields({
    onNatureChange,
    merchantFeeSettleChange,
    legalPersonBan,
    linkmanPersonBan,
    legalIdTypeBan,
    linkmanIdTypeBan,
    legalIdNoBan,
    linkmanIdNoBan,
    legalPhoneBan,
    linkmanPhoneBan,
    legalEmailBan,
    linkmanEmailBan,
    agencyIdBan,
    merchantSettleModeBan,
    onFocus,
    legalPersonIdNoRule,
    legalPersonPhoneNoRule,
    linkmanIdNoRule,
    linkmanPhoneNoRule,
    feeCardNoRule,
    settlePhoneNoRule,
  }).splice(0),
  {
    title: lang.settleInfo,
    fields: settleField({
      accountTypeChange,
      settleTypeBan,
      phoneNoRule: settlePhoneNoRule,
      cardNoRule: feeCardNoRule,
      onFocus
    })
  }
];

// 商户业务基本信息其他的表单
export const merchantBusinessCostFields: any = [{
  name: 'settleCycle',
  label: lang.settleCycle,
  type: 'select',
  options: MerchantFeeSettleCycleOptions
}, {
  name: 'settleType',
  label: lang.settleType,
  type: 'select',
  options: MerchantSettleTypeOptions
}, {
  name: 'feeRefund',
  label: lang.feeRefund,
  type: 'select',
  options: StatusYesAndNoOptions
}, {
  name: 'refundPeriod',
  label: lang.refundPeriod,
  type: 'number',
  min: 0,
  max: 30
}, {
  name: 'refundNumberLimit',
  label: lang.merchantBusiness.refundNumberLimit,
  type: 'number',
  min: 0,
  rules: [{
    required: false
  }]
}];

/**
 * 商户审核search
 * @param prefix  字符串前缀
 */
export const merchantReviewSearch: any = (prefix) =>[{
  fields: [{
    name: `${prefix}.merchantNo`,
    label: lang.merchant.number
  }, {
    name: `${prefix}.merchantName`,
    label: lang.merchant.name
  }, {
    name: `${prefix}.createTime`,
    label: lang.createAt,
    type: 'dateRange'
  }]
}];
export const merchantBasicUpdate: any = ({
                                           onNatureChange,
                                           merchantFeeSettleChange,
                                           legalPersonBan = false,
                                           linkmanPersonBan = false,
                                           legalIdTypeBan = false,
                                           linkmanIdTypeBan = false,
                                           legalIdNoBan = false,
                                           linkmanIdNoBan = false,
                                           legalPhoneBan = false,
                                           linkmanPhoneBan = false,
                                           legalEmailBan = false,
                                           linkmanEmailBan = false,
                                           agencyIdBan = false,
                                           merchantSettleModeBan = false,
                                           onFocus = (key) => undefined,
                                           legalPersonIdNoRule = true,
                                           legalPersonPhoneNoRule = true,
                                           linkmanIdNoRule = true,
                                           linkmanPhoneNoRule = true,
                                           feeCardNoRule = false,
                                           settlePhoneNoRule = true
                                         }) => [{
  title: lang.basicInfo,
  fields: [{
    label: lang.agency.title,
    name: 'agencyId',
    render: () => <AgencySelect disabled={agencyIdBan}/>
  }, {
    label: lang.merchant.name,
    name: 'merchantName',
  }, {
    label: lang.merchant.title,
    name: 'title'
  }, {
    label: lang.merchant.nature,
    name: 'nature',
    type: 'select',
    options: NatureOptions,
    onChange: onNatureChange,
    decoratorOptions: {
      initialValue: Nature.personal
    }
  }, {
    label: lang.businessLicense,
    name: 'businessLicense',
    rules: Patten.businessLicense
  }, {
    label: lang.merchant.businessIdType,
    name: 'businessIdType',
    type: 'select',
    options: MerchantBusinessOptions
  }, {
    label: lang.region,
    name: 'address',
    render: () => <Cascader options={china}
                            placeholder="请选择"
    />
  }, {
    label: lang.agency.street,
    name: 'street'
  }, {
    label: lang.merchant.settleMode,
    name: 'settleMode',
    disabled: merchantSettleModeBan,
    type: 'select',
    options: MerchantSettleModeOptions
  }, {
    label: lang.merchant.feeSettleCycle,
    name: 'feeSettleCycle',
    type: 'select',
    options: MerchantFeeSettleCycleOptions
  }, {
    label: lang.merchant.businessScope,
    name: 'businessScope',
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.unionMcc,
    name: 'unionMcc',
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.aliPayMcc,
    name: 'aliPayMcc',
    type: 'select',
    options: MerchantAliPayMccOptions,
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.weChatPayMcc,
    name: 'weChatPayMcc',
    render: () => <Cascader options={MerchantsTypes}
                            placeholder="请选择"
    />,
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.serviceTel,
    name: 'serviceTel',
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.faxNo,
    name: 'faxNo',
    rules: [{
      required: false
    }]
  }, {
    label: lang.agency.website,
    name: 'website',
    rules: [{
      required: false
    }]
  }, {
    label: lang.merchant.businessTimeOpen,
    name: 'open',
    type: 'time'
  }, {
    label: lang.merchant.businessTimeClose,
    name: 'close',
    type: 'time'
  }]
}, {
  title: lang.legalPerson,
  fields: personal({
    prefixString: 'legalPerson',
    personBan: legalPersonBan,
    idTypeBan: legalIdTypeBan,
    idNoBan: legalIdNoBan,
    phoneBan: legalPhoneBan,
    emailBan: legalEmailBan,
    phoneNoRule: legalPersonPhoneNoRule,
    idNoRule: legalPersonIdNoRule,
    onFocus
  })
}, {
  title: lang.linkman,
  fields: personal({
    prefixString: 'linkman',
    personBan: linkmanPersonBan,
    idTypeBan: linkmanIdTypeBan,
    idNoBan: linkmanIdNoBan,
    phoneBan: linkmanPhoneBan,
    emailBan: linkmanEmailBan,
    phoneNoRule: linkmanPhoneNoRule,
    idNoRule: linkmanIdNoRule,
    onFocus
  })
}, {
  title: lang.merchant.feeSettleAccountString,
  fields: settleField({
    prefixString: 'feeSettleAccount',
    labelPrefixString: 'merchant.feeSettleAccount',
    accountTypeChange: merchantFeeSettleChange,
    accountTypeOptions: AccountTypeOnlyBankOptions,
    cardNoRule: feeCardNoRule,
    phoneNoRule: settlePhoneNoRule,
    onFocus,
    accountNumberProps: {
      maxLength: 5
    }
  })
}, {
  title: lang.explain,
  fields: [{
    label: lang.merchant.explain,
    name: 'describe'
  }]
}];

