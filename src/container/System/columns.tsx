import * as React from 'react';
import { lang } from '../../locale';
import { Tag } from 'antd';
import { ColumnType } from '@sitb/wbs/DataGrid/DataGrid';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/31
 */
// 配置颜色
// let color = {
//   'GET': '#87d068',
//   'DELETE': '#f52',
//   'POST': '#2db7f5',
//   'PUT': '#108ee9',
//   'PATCH': '#108569'
// };

// 资源column
export const resourceColumn = [{
  title: lang.describe,
  dataIndex: 'describe'
}, {
  title: lang.resource.path,
  dataIndex: 'uri'
}];

// 角色column
export const roleColumn: any = [{
  title: lang.role.name,
  dataIndex: 'name'
}, {
  title: lang.describe,
  dataIndex: 'describe'
}, {
  title: lang.createAt,
  dataIndex: 'createAt',
  type: ColumnType.DATE
}];

// 操作员columns
export const systemOperatorColumns: any = [{
  title: lang.systemOperator.name,
  dataIndex: 'name'
}, {
  title: lang.systemOperator.roles,
  dataIndex: 'roles',
  render: roles => roles && roles.map((value, index) => <Tag key={index}>{value.name}</Tag>)
}, {
  title: lang.remark,
  dataIndex: 'remark'
}];

// 系统审核columns
export const systemProcessColumns: any = [{
  title: lang.systemProcess.name,
  dataIndex: 'name'
}, {
  title: lang.remark,
  dataIndex: 'remark'
}];
