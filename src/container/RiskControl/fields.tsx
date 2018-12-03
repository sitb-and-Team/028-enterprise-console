import * as React from 'react';
import { lang } from '../../locale';
import { BusinessTypeData } from "../../constants/BusinessType";
import MerchantSearch from '../../component/Tool/MerchantSearch';
import {CushionQuotTypeOptions} from "../../constants/selectObj/CushionQuotTye";

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/17
 */

// 商户限额管理搜索表单
export const merchantQuotaManagementSearch = [{
  isSearch: true,
  fields: [{
    name: 'merchantNo',
    label: lang.merchant.merchantNo
  }]
}];

export const cushionQuotManagementPersist = [{
  fields: [{
    label: lang.cushionQuotManagement.type,
    name: 'type',
    type: 'select',
    options: CushionQuotTypeOptions
  }, {
    label: lang.cushionQuotManagement.identity,
    name: 'identity'
  }, {
    label: lang.cushionQuotManagement.businessType,
    name: 'businessType',
    type: 'select',
    options: BusinessTypeData
  }, {
    label: lang.cushionQuotManagement.totalAmount,
    name: 'totalAmount',
    type: 'number',
    min: 0
  }, {
    label: lang.cushionQuotManagement.businessTimeOpen,
    name: 'open',
    type: 'date',
  }, {
    label: lang.cushionQuotManagement.businessTimeClose,
    name: 'close',
    type: 'date',
  }, {
    label: lang.describe,
    name: 'describe',
    rules: [{
      required: false
    }],
  }]
}];

/**
 * 商户限额新增编辑
 * @param {any} merchantBan 商户号禁用状态
 */
export const paymentLimitsCreate: any = ({merchantBan = false} = {}) => [{
  fields: [{
    label: lang.merchant.local,
    name: 'merchant',
    render: () => <MerchantSearch disabled={merchantBan}
                                  getValue={(merchant: any) => `${merchant.merchantNo}|${merchant.merchantName}`}
    />
  }, {
    name: 'businessType',
    label: lang.businessType,
    type: 'select',
    options: BusinessTypeData
  }, {
    label: lang.singleMinLimit,
    name: 'singleMin',
    type: 'number',
    min: 0
  }, {
    label: lang.singleMaxLimit,
    name: 'singleMax',
    type: 'number',
    min: 0
  }, {
    label: lang.riskControl.paymentLimits.day,
    name: 'day',
    type: 'number',
    min: 0
  }, {
    label: lang.riskControl.paymentLimits.month,
    name: 'month',
    type: 'number',
    min: 0
  }, {
    label: lang.describe,
    name: 'describe',
    rules: [{
      required: false
    }],
  }]
}];
export const controlMerchantLimitsColumn = [{
  title: lang.merchant.merchantName,
  dataIndex: 'merchant',
  render: merchant => merchant && `${merchant.merchantNo}-${merchant.merchantName}`
}, {
  title: lang.businessType,
  dataIndex: 'businessType',
  render: businessType => businessType && BusinessTypeData[businessType]
}, {
  title: lang.riskControl.paymentLimits.singleMin,
  dataIndex: 'singleMin',
  isSorter: true
}, {
  title: lang.riskControl.paymentLimits.singleMax,
  dataIndex: 'singleMax',
  isSorter: true
}, {
  title: lang.riskControl.paymentLimits.day,
  dataIndex: 'day',
  isSorter: true
}, {
  title: lang.riskControl.paymentLimits.month,
  dataIndex: 'month',
  isSorter: true
}, {
  title: lang.riskControl.paymentLimits.describe,
  dataIndex: 'describe'
}];
