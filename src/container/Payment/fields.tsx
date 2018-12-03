import * as React from 'react';
import {lang} from '../../locale';
import {TradeStatusOptions} from '../../constants/selectObj/TradeStatus';
import {BusinessTypeData} from '../../constants/BusinessType';
import {ChannelSelect} from '../../component/Tool/ChannelSelect';
import {AgencySelect} from "../../component/Tool/AgencySelect";

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */

// 交易搜索表单
export const tradeSearch: any = [{
  fields: [{
    label: lang.agency.path,
    name: 'path',
    render: () => <AgencySelect getValue={(({path}) => `${path}`)}/>
  }, {
    label: lang.businessType,
    name: 'businessTypes',
    type: 'select',
    options: BusinessTypeData
  }, {
    label: lang.merchant.number,
    name: 'merchantNo'
  }, {
    label: lang.merchant.name,
    name: 'merchantName'
  }, {
    label: lang.channelFlag,
    name: 'channelFlag',
    render: () => <ChannelSelect/>
  }, {
    label: lang.agencyProfit.totalAmount,
    name: 'totalAmount'
  }, {
    label: lang.payment.serialNumber,
    name: 'serialNumber',
    maxLength:35,
  }, {
    label: lang.status,
    name: 'status',
    type: 'select',
    options: TradeStatusOptions
  }, {
    label: lang.tradeAt,
    name: 'tradeAt',
    type: 'dateRange'
  }]
}];

// 交易路由表单
export const routeSearch: any = [{
  fields: [{
    label: lang.priority,
    name: 'priority',
    type: 'number'
  }, {
    label: lang.describe,
    name: 'description'
  }]
}];

/**
 * 交易路由创建 两层传参
 * @param {any} setMerchantFields   商户代理模式表单
 * @param {any} channelFlagChange   通道标识change事件
 * @param {any} channelFlagDisabled 通道标识禁用
 * @returns 第二层传参  路由多选条目表单
 */
export const paymentRouteCreate: any = ({
                                          setMerchantFields = [],
                                          channelFlagChange = null,
                                          channelFlagDisabled = false
                                        } = {}) => (setFields = []) => [{
  title: lang.basicInfo,
  fields: [{
    name: 'channel',
    label: lang.channelFlag,
    render: () => (
      <ChannelSelect onChange={channelFlagChange}
                     disabled={channelFlagDisabled}
      />)
  }, {
    name: 'priority',
    label: lang.priority,
    type: 'number',
    rules: [{
      required: false
    }]
  }, {
    name: 'describe',
    label: lang.describe,
    rules: [{
      required: false
    }]
  }]
}, {
  title: lang.merchantMode,
  fields: [...setMerchantFields]
}, {
  title: lang.resource.title,
  fields: [...setFields],
  col: {
    lg: 6,
    md: 24,
    xs: 24,
    xl: 6
  }
}];
