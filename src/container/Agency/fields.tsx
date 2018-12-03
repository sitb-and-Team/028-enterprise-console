import * as React from 'react';
import {Cascader} from 'antd';
import china from '@sitb/wbs/region/china';

import {lang} from '../../locale';
import Patten from '../../utils/Pattern';
import {NatureOptions} from '../../constants/selectObj/Nature';
import {MerchantAuthModeOptions} from '../../constants/selectObj/MerchantAuthMode';
import {personal, settleField} from '../../constants/FieldsPersonal';
import {AgencyStatusOptions} from '../../constants/selectObj/AgencyStatus';
import {AgencySelect} from '../../component/Tool/AgencySelect';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/15
 */

// 机构搜索表单
export const agencySearch = [{
  isSearch: true,
  fields: [{
    name: 'code',
    label: lang.agency.id,
    render: () => <AgencySelect/>
  }, {
    name: 'name',
    label: lang.agency.name
  }, {
    name: 'legalPerson',
    label: lang.legalPerson
  }, {
    name: 'legalPersonPhoneNo',
    label: lang.legalPersonPhone
  }, {
    name: 'expires',
    label: lang.agency.expiresTime,
    type: 'date'
  }, {
    name: 'status',
    label: lang.status,
    type: 'select',
    options: AgencyStatusOptions
  }]
}];

/**
 *
 * @param {func}    agencyNatureChange       机构性质change函数
 * @param {func}    accountTypeChange        结算状态类型change函数
 * @param {boolean} legalPersonIdNoRule      法人证件号校验，编辑不校验
 * @param {boolean} legalPersonPhoneNoRule   法人手机号校验，编辑不校验
 * @param {boolean} linkmanIdNoRule          联系人证件号校验，编辑不校验
 * @param {boolean} linkmanPhoneNoRule       联系人手机号校验，编辑不校验
 * @param {boolean} settlePhoneNoRule        结算预留手机号校验，编辑不校验
 * @param {boolean} agencyIdBan              机构id禁用
 * @param {boolean} agencyPhoneBan           机构电话禁用
 * @param {func}    onFocus                  表单聚焦
 * @returns
 */
export const agencyCreate: any = ({
                                    agencyNatureChange,
                                    accountTypeChange,
                                    legalPersonIdNoRule = true,
                                    legalPersonPhoneNoRule = true,
                                    linkmanIdNoRule = true,
                                    linkmanPhoneNoRule = true,
                                    settlePhoneNoRule = true,
                                    agencyIdBan = false,
                                    agencyPhoneBan = false,
                                    onFocus = (key) => undefined
                                  }) => [{
  title: lang.basicInfo,
  fields: [{
    name: 'parentId',
    label: lang.agency.parentId,
    render: () => <AgencySelect disabled={agencyIdBan}
                                own
    />
  }, {
    name: 'nature',
    label: lang.nature,
    type: 'select',
    options: NatureOptions,
    onSelect: agencyNatureChange
  }, {
    name: 'name',
    label: lang.agency.name
  }, {
    name: 'businessLicense',
    label: lang.businessLicense,
    rules: Patten.businessLicense
  }, {
    name: 'agencyPhone',
    label: lang.agency.phone,
    rules: agencyPhoneBan && Patten.phone,
    onFocus: () => onFocus('agencyPhone')
  }, {
    name: 'contractExpires',
    label: lang.agency.expiresTime,
    type: 'date'
  }, {
    name: 'address',
    label: lang.agency.address,
    render: () => <Cascader options={china}/>
  }, {
    name: 'street',
    label: lang.agency.street
  }, {
    name: 'weChatPayChannelNo',
    label: lang.weChatPayChannelNo,
    rules: [{
      required: false
    }]
  }, {
    name: 'website',
    label: lang.agency.website,
    rules: [{
      required: false
    }]
  }, {
    name: 'remark',
    label: lang.remark,
    rules: [{
      required: false
    }]
  }]
}, {
  title: lang.agency.legalInfo,
  fields: personal({
    prefixString: 'legalPerson',
    phoneNoRule: legalPersonPhoneNoRule,
    idNoRule: legalPersonIdNoRule,
    onFocus
  })
}, {
  title: lang.agency.linkmanInfo,
  fields: personal({
    prefixString: 'linkman',
    phoneNoRule: linkmanPhoneNoRule,
    idNoRule: linkmanIdNoRule,
    onFocus
  })
}, {
  title: lang.costInfo,
  fields: settleField({
    accountTypeChange,
    onFocus,
    phoneNoRule: settlePhoneNoRule
  })
}];

// 机构参数配置表单
export const agencyConfigFields = [{
  title: lang.merchantAuthenticationMode,
  fields: [{
    name: 'merchantAuthenticationMode',
    label: lang.merchantAuthenticationMode,
    type: 'select',
    options: MerchantAuthModeOptions
  }]
}];

// 机构分润搜索表单
export const agencyProfitSearch = [{
  isSearch: true,
  fields: [{
    name: 'code',
    label: lang.agency.code
  }, {
    name: 'name',
    label: lang.agency.name
  }, {
    name: 'totalAmount',
    label: lang.agencyProfit.totalAmount
  }, {
    name: 'tradeAt',
    label: lang.tradeAt,
    type: 'dateRange'
  }]
}];
