/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/16
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Option, Select } from '@sitb/wbs/Select';
import { getActions } from '../../core/store';
import { SelectProps } from 'antd/lib/select';

export interface Props extends SelectProps {
  /**
   * 可能存在首次搜索的商户id
   */
  merchantId?: string;
  /**
   * 后台数据
   */
  page?: any;
  /**
   * 状态
   */
  processing?: boolean;
  getLabel?: (option: Option, index: number) => string;
  getValue?: (option: Option, index: number) => any;
}

/**
 * 可以搜索搜索商户的select
 */
@connect(({merchant}) => ({
  processing: merchant.processing,
  page: merchant.page
}))
export default class MerchantSearch extends React.Component<Props, any> {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  componentWillMount() {
    const {merchantId} = this.props;
    this.handleSearch(merchantId);
  }

  /**
   * 根据商户号、商户名搜索
   * @param {string} nameOrNo
   */
  handleSearch = (nameOrNo = '') => {
    getActions().merchant.startQuery({nameOrNo});
    console.log('search merchant', nameOrNo);
  };

  render() {
    const {value} = this.state;
    const {page: {content}, processing, ...props} = this.props;
    return (
      <Select options={content}
              value={value}
              showSearch
              style={{width: '100%'}}
              filterOption={false}
              getValue={({id}) => `${id}`}
              getLabel={(merchant: any) => `${merchant.merchantNo}-${merchant.merchantName}`}
              placeholder="搜索本地商户"
              notFoundContent={processing ? <Spin size="small"/> : null}
              onSearch={this.handleSearch}
              onChange={value => this.setState({value})}
              {...props}
      />
    );
  }
}
