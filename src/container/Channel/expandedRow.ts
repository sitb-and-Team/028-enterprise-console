import * as moment from 'moment';
import Common from '@sitb/wbs/constants/Common';

import { lang } from '../../locale';
import { MerchantModeOptions } from '../../constants/selectObj/MerchantMode';
import { StatusTypeOptions } from '../../constants/selectObj/StatusType';
import { GridInfoProps } from '../../component/Tool/GridInfoUtil';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/16
 */
// 通道商户业务展示
export const merchantBusinessShow: GridInfoProps = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.channelFlag,
    value: 'channelFlag'
  }, {
    label: lang.createAt,
    value: 'createAt',
    setValue: data => moment(Number(data)).format(Common.DATETIME_FORMAT)
  }, {
    label: lang.updateAt,
    value: 'updateAt',
    setValue: data => moment(Number(data)).format(Common.DATETIME_FORMAT)
  }, {
    label: lang.merchant.title,
    value: 'title'
  }, {
    label: lang.priority,
    value: 'priority'
  }, {
    label: lang.remark,
    value: 'remark'
  }, {
    label: lang.merchantMode,
    value: 'proxyMode',
    mappingObject: MerchantModeOptions
  }, {
    label: lang.merchant.local,
    value: 'localMerchant',
    setValue: localMerchant => localMerchant && `${localMerchant.merchantNo || '-'}-${localMerchant.merchantName || '-'}`
  }, {
    label: lang.status,
    value: 'enabled',
    mappingObject: StatusTypeOptions
  }]
};
