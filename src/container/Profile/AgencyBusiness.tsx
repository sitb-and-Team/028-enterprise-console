/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/7
 */
import * as React from 'react';
import * as moment from 'moment';
import objectPath from 'object-path';
import Common from '@sitb/wbs/constants/Common'

import { CardGrid } from '../../component/Card/CardGrid';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { activeUser } from '../Application/Header';

import { lang } from '../../locale';
import { RateTypeOptions } from '../../constants/selectObj/RateType';
import { statusType } from '../../constants/objectKey';
import { BusinessTypeData } from '../../constants/BusinessType';

export class ProfileAgencyBusiness extends React.Component<any> {

  render() {
    // 机构业务,展示机构数据配置
    const cardGridViewConfig: any = (review) => ({
      setCol: {
        lg: 24,
        md: 24,
        xl: 24,
        xs: 24,
        sm: 24
      },
      setLabelCol: 10,
      setValueCol: 14,
      rows: [{
        label: lang.businessType,
        value: 'businessType',
        mappingObject: BusinessTypeData
      }, {
        label: lang.normalFeeRate.type,
        value: 'normalFeeRate.type',
        mappingObject: RateTypeOptions
      }, {
        label: lang.normalFeeRate.value,
        value: 'normalFeeRate.fee'
      }, {
        label: lang.normalFeeRate.min,
        value: 'normalFeeRate.min'
      }, {
        label: lang.normalFeeRate.max,
        value: 'normalFeeRate.max'
      }, {
        label: lang.serviceFeeRate.type,
        value: 'serviceFeeRate.type',
        mappingObject: RateTypeOptions
      }, {
        label: lang.serviceFeeRate.value,
        value: 'serviceFeeRate.fee'
      }, {
        label: lang.serviceFeeRate.min,
        value: 'serviceFeeRate.min'
      }, {
        label: lang.serviceFeeRate.max,
        value: 'serviceFeeRate.max'
      }, {
        label: lang.status,
        value: 'enabled',
        mappingObject: statusType
      }, {
        label: lang.holidayEnabled,
        value: 'holidayEnabled',
        mappingObject: statusType
      }, {
        label: lang.businessTimeStart,
        value: 'businessTime.open',
        setValue: date => moment(Number(date)).format(Common.DATETIME_FORMAT)
      }, {
        label: lang.createAt,
        value: 'actionDate.createAt',
        setValue: date => moment(Number(date)).format(Common.DATETIME_FORMAT)
      }]
    });
    // 优化字段
    const business = objectPath.get(activeUser, 'businesses');
    // 配置props
    const props = {
      dataSource: business && business,
      cardGridViewConfig,
      setCol: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12
      }
    };
    return (
      <React.Fragment>
        <TotalUtil total={business && business.length || 0}/>
        <CardGrid {...props}/>
      </React.Fragment>
    )
  }
}
