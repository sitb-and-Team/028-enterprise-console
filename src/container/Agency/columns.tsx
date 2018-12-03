import { lang } from '../../locale';
import { ColumnType } from '@sitb/wbs/DataGrid/DataGrid';
import { AgencyStatusOptions } from '../../constants/selectObj/AgencyStatus';
import { NatureOptions } from '../../constants/selectObj/Nature';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/15
 */
export const agencyColumn = [{
  title: lang.agency.id,
  dataIndex: 'code',
  isSorter: true
}, {
  title: lang.agency.name,
  dataIndex: 'name',
  isSorter: true
}, {
  title: lang.agency.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (status) => ({
    text: AgencyStatusOptions[status]
  })
}, {
  title: lang.nature,
  dataIndex: 'nature',
  render: nature => nature && NatureOptions[nature]
}, {
  title: lang.legalPerson,
  dataIndex: 'legalPerson.name'
}, {
  title: lang.legalPersonPhone,
  dataIndex: 'legalPerson.phoneNo'
}, {
  title: lang.address,
  dataIndex: 'address.street'
}, {
  title: lang.remark,
  dataIndex: 'remark'
}, {
  title: lang.createAt,
  dataIndex: 'createAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.agency.expiresTime,
  dataIndex: 'contractExpires',
  type: ColumnType.DATE_TIME
}];

// 机构分润
export const agencyProfitColumn = [{
  title: lang.collectMoneyAuditNumber,
  dataIndex: 'collectMoneyAuditNumber'
}, {
  title: lang.channelFlag,
  dataIndex: 'channelFlag'
}, {
  title: lang.channelMerchant.no,
  dataIndex: 'channelMerchantNo'
}, {
  title: lang.channelMerchant.number,
  dataIndex: 'channelMerchantNumber'
}, {
  title: lang.merchant.subAuditNumber,
  dataIndex: 'subAuditNumber'
}];
