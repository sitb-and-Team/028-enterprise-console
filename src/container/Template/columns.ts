import { lang } from '../../locale';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/16
 */
export const rateTemplateColumns = [{
  title: lang.rateTemplate.name,
  dataIndex: 'name'
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
  dataIndex: 'normalFeeRate.min',
  align: 'right'
}, {
  title: lang.normalFeeRate.max,
  dataIndex: 'normalFeeRate.max',
  align: 'right'
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
}];

