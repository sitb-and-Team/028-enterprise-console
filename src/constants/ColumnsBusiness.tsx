import { lang } from '../locale';
import { statusType } from './objectKey';
import { ColumnType } from '@sitb/wbs/DataGrid/DataGrid';
import * as moment from 'moment';
import Common from '@sitb/wbs/constants/Common';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/12
 */
// 公用商户业务column
export const businessColumn = [{
  title: lang.businessType,
  dataIndex: 'businessType',
  isSorter: true,
  type: 'businessType'
}, {
  title: lang.normalFeeRate.type,
  dataIndex: 'normalFeeRate.type',
  type: 'feeRateType'
}, {
  title: lang.normalFeeRate.value,
  dataIndex: 'normalFeeRate.value',
  align: 'right'
}, {
  title: lang.normalFeeRate.min,
  dataIndex: 'normalFeeRate.min'
}, {
  title: lang.normalFeeRate.max,
  dataIndex: 'normalFeeRate.max'
}, {
  title: lang.serviceFeeRate.type,
  dataIndex: 'serviceFeeRate.type',
  type: 'feeRateType'
}, {
  title: lang.serviceFeeRate.value,
  dataIndex: 'serviceFeeRate.value',
  align: 'right'
}, {
  title: lang.serviceFeeRate.min,
  dataIndex: 'serviceFeeRate.min',
  align: 'right'
}, {
  title: lang.serviceFeeRate.max,
  dataIndex: 'serviceFeeRate.max',
  align: 'right'
}, {
  title: lang.status,
  dataIndex: 'enabled',
  type: ColumnType.STATUS,
  getBadgeProps: (enabled) => ({
    text: statusType[enabled]
  })
}, {
  title: lang.holidayEnabled,
  dataIndex: 'holidayEnabled',
  type: ColumnType.STATUS,
  getBadgeProps: (holidayEnabled) => ({
    text: statusType[holidayEnabled]
  })
}, {
  title: lang.businessTime,
  dataIndex: 'businessTime',
  render: businessTime => businessTime && `${moment(businessTime.open).format(Common.TIME_FORMAT)}-${moment(businessTime.close).format(Common.TIME_FORMAT)}`
}, {
  title: lang.createAt,
  dataIndex: 'actionDate.createAt',
  type: ColumnType.DATE_TIME
}];
