import * as React from 'react';
import { lang } from '../../locale';
import { SettleStatusOptions } from '../../constants/selectObj/SettleStatus';
import { ChannelSelect } from '../../component/Tool/ChannelSelect';
import { AgencySelect } from '../../component/Tool/AgencySelect';
import { MerchantFeeSettleCycleOptions } from '../../constants/selectObj/MerchantFeeSettleCycle';
import { SettleProcessingModeOptions } from '../../constants/selectObj/SettleProcessingMode';
import { SettleTradeDetailStatusOptions } from '../../constants/selectObj/SettleTrandDetailStatus';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */

// 结算信息表单
export const settleSearch: any = [{
  fields: [{
    label: lang.settle.auditNumber,
    name: 'auditNumber',
    maxLength:35
    // }, {
    //   label: lang.channelMerchant.number,
    //   name: 'channelAuditNumber'
  }, {
    label: lang.settle.channelFlag,
    name: 'channelFlag',
    render: () => <ChannelSelect/>
  }, {
    label: lang.settle.settleCycle,
    name: 'settleCycle',
    type: 'select',
    options: MerchantFeeSettleCycleOptions
  }, {
    label: lang.settle.status,
    name: 'status',
    type: 'select',
    options: SettleStatusOptions
  }, {
    label: lang.settleAt,
    name: 'settleAt',
    type: 'dateRange'
  }, {
    label: lang.settleAt,
    name: 'paymentRecordId',
    style: {
      display: 'none'
    }
  }]
}];

// 出款任务search
export const settleTaskSearch: any = [{
  fields: [{
    label: lang.channelFlag,
    name: 'channelFlag',
    render: () => <ChannelSelect/>
  }, {
    label: lang.agencyCode,
    name: 'agencyCode',
    render: () => <AgencySelect/>
  }, {
    label: lang.agency.path,
    name: 'agencyPath',
    render: () => <AgencySelect getValue={(({path}) => `${path}`)}/>
  }, {
    label: lang.settleCycle,
    name: 'settleCycle',
    type: 'select',
    options: MerchantFeeSettleCycleOptions
  }, {
    label: lang.createAt,
    name: 'createTime',
    type: 'dateRange'
  }]
}];

// 交易对账search表单
export const settleReconciliationTaskSearch = [{
  isSearch: true,
  fields: [{
    label: lang.tradeAt,
    name: 'paymentAt',
    type: 'dateRange'
  }]
}];

// 交易对账 新增表单
export const settleReconciliationTaskFields = [{
  fields: [{
    label: lang.tradeAt,
    name: 'paymentAt',
    type: 'date'
  }]
}];

// 出款任务表单
export const settleTaskFields = [{
  title: lang.settleTask.screeningTitle,
  fields: [{
    label: lang.settleTask.channelFlag,
    name: 'channelFlag',
    rules: [{
      required: false
    }],
    render: () => <ChannelSelect/>
  }, {
    label: lang.settleTask.agency,
    name: 'agencyCode',
    rules: [{
      required: false
    }],
    render: () => <AgencySelect getValue={(({code}) => `${code}`)}/>
  }, {
    label: lang.settleTask.agencyPath,
    name: 'agencyPath',
    rules: [{
      required: false
    }],
    render: () => <AgencySelect getValue={(({path}) => `${path}`)}/>
  }, {
    label: lang.settleCycle,
    name: 'settleCycle',
    type: 'select',
    rules: [{
      required: false
    }],
    options: MerchantFeeSettleCycleOptions
  }, {
    name: 'paymentAt',
    label: lang.settleTask.startTradeAt,
    type: 'dateRange'
  }]
}, {
  title: lang.settleTask.processTitle,
  fields: [{
    label: lang.settleTask.settleChannelFlag,
    name: 'settleChannelFlag',
    render: () => <ChannelSelect/>
  }, {
    label: lang.settleTask.processMode,
    name: 'processMode',
    type: 'select',
    options: SettleProcessingModeOptions
  }, {
    label: lang.describe,
    name: 'describe',
    rules: [{
      required: false
    }]
  }, {
    label: lang.remark,
    name: 'remark',
    rules: [{
      required: false
    }]
  }]
}];

// 出款明细搜索表单
export const settleTradeDetailSearch: any = [{
  fields: [{
    label: lang.merchant.number,
    name: 'merchantNo'
  }, {
    label: lang.merchant.name,
    name: 'merchantName'
  }, {
    label: lang.merchant.settleAccount.number,
    name: 'number'
  }, {
    label: lang.status,
    name: 'status',
    type: 'select',
    options: SettleTradeDetailStatusOptions
  }]
}];
