/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/6
 */
import { lang } from '../../locale';
import { statusType } from '../../constants/objectKey';
import { Column, ColumnType } from '@sitb/wbs/DataGrid/DataGrid';
import { MerchantModeOptions } from '../../constants/selectObj/MerchantMode';

// 通道商户
export const channelMerchantColumn: Array<Column> = [{
  title: lang.channelFlag,
  dataIndex: 'channelFlag',
  isSorter: true
}, {
  title: lang.merchant.name,
  dataIndex: 'merchantName'
}, {
  title: lang.merchant.title,
  dataIndex: 'title'
}, {
  title: lang.merchant.number,
  dataIndex: 'merchantNo'
}, {
  title: lang.merchantMode,
  dataIndex: 'proxyMode',
  render: proxyMode => proxyMode && MerchantModeOptions[proxyMode]
}, {
  title: lang.merchant.local,
  dataIndex: 'localMerchant',
  render: (localMerchant) => localMerchant && `${localMerchant.merchantNo || '-'}-${localMerchant.merchantName || '-'}`
}, {
  title: lang.status,
  dataIndex: 'enabled',
  type: ColumnType.STATUS,
  getBadgeProps: (enabled) => ({
    text: statusType[enabled]
  })
}, {
  title: lang.priority,
  dataIndex: 'priority',
  isSorter: true
}, {
  title: lang.createAt,
  dataIndex: 'createAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.updateAt,
  dataIndex: 'updateAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.remark,
  dataIndex: 'remark'
}];
