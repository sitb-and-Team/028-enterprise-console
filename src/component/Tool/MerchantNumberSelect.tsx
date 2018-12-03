/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/15
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Select } from '@sitb/wbs/Select';

@connect(({channelMerchant}) => ({
  oneToManyMerchantSelect: channelMerchant.oneToManyMerchantSelect
}))
export default class MerchantNumberSelect extends React.Component<any> {

  render() {
    const {oneToManyMerchantSelect, ...props} = this.props;
    return (
      <Select options={oneToManyMerchantSelect}
              style={{width: '100%'}}
              placeholder="选择商户号"
              mode="multiple"
              {...props}
      />
    );
  }
}
