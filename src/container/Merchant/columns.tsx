import * as React from 'react';
import objectPath from 'object-path';
import { Progress } from 'antd';
import { Column, ColumnType } from '@sitb/wbs/DataGrid/DataGrid';

import { lang } from '../../locale';
import { MerchantStatusOptions } from '../../constants/selectObj/MerchantStatus';
import { NatureOptions } from '../../constants/selectObj/Nature';
import { MerchantReviewsStatusOptions } from '../../constants/selectObj/MerchantReviewsStatus';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */

// 通道column
export const merchantColumn: Array<Column> = [{
  title: `${lang.agencyCode}-${lang.agency.name}`,
  dataIndex: 'agency',
  render: (agency) => agency && `${agency.code}-${agency.name}`
}, {
  title: `${lang.merchant.number}-${lang.merchant.name}`,
  dataIndex: 'merchantNo',
  render: (merchantNo, {merchantName}) => (merchantNo && merchantName) && `${merchantNo}-${merchantName}`
}, {
  title: lang.merchant.title,
  dataIndex: 'title'
}, {
  title: lang.merchant.nature,
  dataIndex: 'nature',
  render: nature => nature && NatureOptions[nature]
}, {
  title: lang.legalPerson,
  dataIndex: 'legalPerson.name'
}, {
  title: lang.legalPersonPhone,
  dataIndex: 'legalPerson.phoneNo'
}, {
  title: lang.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (status) => ({
    text: MerchantStatusOptions[status]
  })
}, {
  title: lang.businessTime,
  dataIndex: 'createAt',
  type: ColumnType.DATE_TIME
}];


// 商户审核columns
export const merchantReviewColumns = [{
  title: lang.merchant.info,
  dataIndex: 'merchantNo',
  render: (merchant, data) => {
    // before新增的情况是没有数据
    let merchantName = objectPath.get(data, 'before.merchantName') || objectPath.get(data, 'after.merchantName') || '-';
    let merchantNo = objectPath.get(data, 'before.merchantNo') || objectPath.get(data, 'after.merchantNo') || '-';
    return `${merchantNo}-${merchantName}`
  }
}, {
  title: lang.merchantReview.progress,
  dataIndex: 'nextReviewUserIndex',
  render: (nextReviewUserIndex, data) => {
    // 获取审核流程长度
    let percentLength = objectPath.get(data, 'reviewProcess.chain') && objectPath.get(data, 'reviewProcess.chain').length;
    // 获取
    let newNextReviewUserIndex = nextReviewUserIndex - 1;
    let proportion = Math.ceil(100 / percentLength) * newNextReviewUserIndex;
    let status: any = 'active';

    // 当下标为 -1 时，审核走完了
    if (nextReviewUserIndex === -1) {
      proportion = 100;
      status = 'success';
    }
    // 设置失败颜色
    if (data.status === 'FAILURE') {
      status = 'exception';
    }
    return (
      <Progress percent={proportion}
                size="small"
                status={status}
      />
    )
  }
}, {
  title: lang.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (status) => ({
    text: MerchantReviewsStatusOptions[status]
  }),
}, {
  title: lang.createAt,
  dataIndex: 'histories[0].reviewAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.describe,
  dataIndex: 'histories[0].describe'
}];
