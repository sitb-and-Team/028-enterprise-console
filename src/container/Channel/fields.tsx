import {lang} from '../../locale';
import * as React from 'react';
import {ChannelSelect} from '../../component/Tool/ChannelSelect';
import {businessBasic, businessRate} from '../../constants/FieldsBusiness';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/6
 */

// 通道业务搜索表单
export const channelBusinessSearch: any = [{
  fields: [{
    name: 'channelFlag',
    label: lang.channelFlag,
    render: () => <ChannelSelect/>
  }]
}];

// 通道商户搜索表单
export const channelMerchantSearch = [{
  fields: [{
    name: 'channelFlag',
    label: lang.channelFlag,
    render: () => <ChannelSelect/>
  }, {
    name: 'merchantNo',
    label: lang.merchant.number
  }, {
    name: 'merchantName',
    label: lang.merchant.name
  }, {
    name: 'localMerchantNo',
    label: lang.channelMerchant.localMerchantNo
  }]
}];

/**
 * 通道商户创建表单
 * @param merchantModeField  商户模式表单
 * @returns
 */
export const channelMerchantCreate = merchantModeField => [{
  title: lang.basicInfo,
  fields: [{
    name: 'channelFlag',
    label: lang.channelFlag,
    render: () => <ChannelSelect/>
  }, {
    name: 'merchantNo',
    label: lang.merchant.number,
    maxLength: 15
  }, {
    name: 'merchantName',
    label: lang.merchant.name
  }, {
    name: 'title',
    label: lang.merchant.title
  }]
}, {
  title: '密钥信息',
  fields: [{
    name: 'key',
    label: lang.key,
    rules: [{
      required: false
    }]
  }, {
    name: 'privateKey',
    label: lang.privateKey,
    rules: [{
      required: false
    }]
  }, {
    name: 'publicKey',
    label: lang.publicKey,
    rules: [{
      required: false
    }]
  }]
}, {
  title: '代理模式',
  fields: [...merchantModeField]
}];

// 通道参数配置表单
export const channelConfigFields = [{
  title: lang.channelConfig.oneToOneCreate,
  fields: [{
    name: 'oneToOneCreate.aliPay',
    label: lang.aliPay,
    type: 'switch',
    decoratorOptions: {
      initialValue: false
    }
  }, {
    name: 'oneToOneCreate.weChatPay',
    label: lang.weChatPay,
    type: 'switch',
    decoratorOptions: {
      initialValue: false
    }
  }, {
    name: 'oneToOneCreate.quickPay',
    label: lang.quickPay,
    type: 'switch',
    decoratorOptions: {
      initialValue: false
    }
  }]
}];

// 通道
export const channelBusinessFields = ({channelFlagBen = false, businessProps}) => [{
  title: lang.basicInfo,
  fields: [{
    name: 'channelFlag',
    label: lang.channelFlag,
    render: () => <ChannelSelect disabled={channelFlagBen}/>
  },
    ...businessBasic(businessProps).slice(0)[0].fields
  ]
},
  businessRate().slice(0)[0]
];
