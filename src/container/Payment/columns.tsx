import * as React from 'react';
import { Tag } from 'antd';
import { ColumnType } from '@sitb/wbs/DataGrid/DataGrid';

import { lang } from '../../locale';
import { BusinessTypeData } from '../../constants/BusinessType';
import { TradeStatusOptions } from '../../constants/selectObj/TradeStatus';
import { MerchantModeOptions } from '../../constants/selectObj/MerchantMode';
import { MerchantSelectModeOptions } from '../../constants/selectObj/MerchantSelectMode';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */

// 交易columns
export const paymentTradeColumns = [{
  title: lang.merchant.number,
  dataIndex: 'merchantNo'
}, {
  title: lang.payment.auditNumber,
  dataIndex: 'auditNumber'
}, {
  title: lang.channelMerchant.no,
  dataIndex: 'channelMerchantNo'
}, {
  title: lang.businessType,
  dataIndex: 'businessType',
  render: businessType => businessType && BusinessTypeData[businessType]
}, {
  title: lang.agencyProfit.totalAmount,
  dataIndex: 'totalAmount'
}, {
  title: lang.agencyProfit.refundAmount,
  dataIndex: 'refundAmount'
}, {
  title: lang.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (status) => ({
    text: TradeStatusOptions[status]
  })
}, {
  title: lang.payment.agencyAuditNumber,
  dataIndex: 'subAuditNumber'
}, {
  title: lang.paymentAt,
  dataIndex: 'paymentAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.createAt,
  dataIndex: 'createAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.describe,
  dataIndex: 'describe'
}];


// 交易路由columns
export const paymentRouteColumns = [{
  title: lang.channelFlag,
  dataIndex: 'channel'
}, {
  title: lang.merchantMode,
  dataIndex: 'merchantProxyMode',
  render: merchantProxyMode => merchantProxyMode && MerchantModeOptions[merchantProxyMode]
}, {
  title: lang.merchantSelectMode,
  dataIndex: 'merchantSelectMode',
  render: merchantSelectMode => merchantSelectMode && MerchantSelectModeOptions[merchantSelectMode]
}, {
  title: lang.paymentRoute.merchantNoSpecify,
  dataIndex: 'merchantSelectValue',
  render: merchantSelectValue => merchantSelectValue && merchantSelectValue.map((merchantNumber, index) => <Tag
    key={index}>{merchantNumber}</Tag>)
}, {
  title: lang.priority,
  dataIndex: 'priority'
}, {
  title: lang.describe,
  dataIndex: 'describe'
}];



