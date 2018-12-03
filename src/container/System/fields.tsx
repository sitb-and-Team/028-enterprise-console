import * as React from 'react';
import { lang } from '../../locale';
import { Props as FieldGroupProps } from "@sitb/wbs/Form/FieldGroup";
import { SystemPlatformOptions } from '../../constants/selectObj/SystemPlatform';
import MerchantReviewProcessSelect from '../../component/Tool/MerchantReviewProcessSelect';

// 新增境外地区码
export const localeRegionCode = require('../../constants/localeRegionCode.json');

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/31
 */

// 资源搜索
export const resourceSearch: Array<FieldGroupProps> = [{
  fields: [{
    name: 'uri',
    label: lang.resource.uri
  }, {
    name: 'platform',
    label: lang.resource.platform,
    type: 'select',
    options: SystemPlatformOptions
  }]
}];

// 资源创建
export const resourceCreate = (setFields) => [{
  title: lang.basicInfo,
  fields: [{
    name: 'platform',
    label: lang.resource.platform,
    type: 'select',
    options: SystemPlatformOptions
  }, {
    name: 'describe',
    label: lang.describe
  }]
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

/**
 * 系统参数配置 create
 * @param {any} roles     角色列表
 * @returns {Array<Props>}
 */
export const systemConfigCreate = ({roles}): Array<FieldGroupProps> => [{
  isSearch: true,
  title: lang.systemConfig.merchantReview,
  fields: [{
    label: '',
    name: 'MERCHANT_REVIEW_PROCESS.value',
    render: () => <MerchantReviewProcessSelect/>
  }]
}, {
  isSearch: true,
  title: lang.systemConfig.ownerBankIssuerNo,
  fields: [{
    label: '',
    name: 'OWNER_BANK_ISSUER_NO.value'
  }]
}, {
  isSearch: true,
  title: lang.systemConfig.localeRegion,
  fields: [{
    label: '',
    type: 'select',
    options: localeRegionCode,
    mode: 'multiple',
    name: 'LOCALE_REGION_CODES.value',
    style: {
      width: 1000
    }
  }]
}];

/**
 * 审核创建表单
 * @param systemProcessFields
 * @returns
 */
export const systemProcessCreate = (systemProcessFields) => [{
  title: lang.basicInfo,
  fields: [{
    label: lang.systemProcess.name,
    name: 'name'
  }, {
    label: lang.remark,
    name: 'remark'
  }]
}, {
  title: lang.systemProcess.processTitle,
  fields: [...systemProcessFields]
}];
