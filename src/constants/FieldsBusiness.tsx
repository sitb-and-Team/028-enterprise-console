import * as React from 'react';
import * as moment from 'moment';
import { lang } from '../locale';
import { momentCommon } from './objectKey';
import { RateType, RateTypeOptions } from './selectObj/RateType';
import { StatusType, StatusTypeOptions } from './selectObj/StatusType';
import { BusinessTypeSelect } from '../component/Tool/BusinessTypeSelect';
import { objectPathGet } from '../component/Tool/GridInfoUtil';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/10
 */

/**
 *
 * @param {any} businessTypeDisabled    业务表单禁用状态
 * @param {any} other                   包含businessTypesSelect的其他props，props属性在businessTypesSelect组件中查看
 * @returns
 */
export const businessBasic: any = ({
                                     businessTypeDisabled = false,
                                     ...other
                                   } = {}) => [{
  title: lang.basicInfo,
  fields: [{
    name: 'businessType',
    label: lang.businessType,
    render: () => (
      <BusinessTypeSelect disabled={businessTypeDisabled}
                          {...other}
      />)
  }, {
    name: 'holidayEnabled',
    label: lang.holidayEnabled,
    type: 'select',
    options: StatusTypeOptions,
    decoratorOptions: {
      initialValue: StatusType.true
    }
  }, {
    name: 'openTime',
    label: lang.businessTimeStart,
    type: 'time',
    decoratorOptions: {
      initialValue: moment('00:00:00', momentCommon.TIME)
    }
  }, {
    name: 'closeTime',
    label: lang.businessTimeEnd,
    type: 'time',
    decoratorOptions: {
      initialValue: moment('23:59:59', momentCommon.TIME)
    }
  }]
}];

/**
 * 分离出费率组表单
 * @param {any} prefixString  字段key
 * @param {any} isRequired   设置是否是必填字段
 * @returns
 */
export const rateGroup: any = ({prefixString, isRequired = true}) => [{
  name: `${prefixString}.type`,
  label: objectPathGet(lang, `${prefixString}.type`),
  type: 'select',
  options: RateTypeOptions,
  decoratorOptions: {
    initialValue: RateType.percentage
  },
  rules: [{
    required: isRequired,
    message: lang.formErrorMessage(objectPathGet(lang, `${prefixString}.type`))
  }]
}, {
  name: `${prefixString}.value`,
  label: objectPathGet(lang, `${prefixString}.value`),
  type: 'number',
  min: 0,
  rules: [{
    required: isRequired,
    message: lang.formErrorMessage(objectPathGet(lang, `${prefixString}.type`))
  }]
}, {
  name: `${prefixString}.min`,
  label: objectPathGet(lang, `${prefixString}.min`),
  type: 'number',
  min: 0,
  rules: [{
    required: isRequired,
    message: lang.formErrorMessage(objectPathGet(lang, `${prefixString}.type`))
  }]
}, {
  name: `${prefixString}.max`,
  label: objectPathGet(lang, `${prefixString}.max`),
  type: 'number',
  min: 0,
  rules: [{
    required: isRequired,
    message: lang.formErrorMessage(objectPathGet(lang, `${prefixString}.type`))
  }]
}];

// 业务费率信息
export const businessRate: any = ({isRequiredNormal = true} = {}) => [{
  title: lang.rateTemplate.costInfo,
  fields: [
    ...rateGroup({
      // isRequired: isRequiredNormal,
      prefixString: 'normalFeeRate'
    }),
    ...rateGroup({
      prefixString: 'serviceFeeRate'
    }),
  ]
}];


export const merchantBusinessUpdate: any = [{
  title: lang.explain,
  fields: [{
    label: lang.merchant.explain,
    name: 'describe'
  }]
}];

// 通道商户业务
export const businessFields = ({businessProps}) => [
  businessBasic(businessProps).slice(0)[0],
  businessRate().slice(0)[0]
];

