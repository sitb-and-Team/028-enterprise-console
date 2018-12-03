/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/19
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Select } from '@sitb/wbs/Select';
import { getActions } from '../../core/store';
import { SelectProps } from 'antd/es/select';

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
  processing?: boolean
}

/**
 * 可以搜索搜索商户的select
 */
@connect(({rateTemplate}) => ({
  processing: rateTemplate.processing,
  page: rateTemplate.page
}))
export default class RateTemplateSelect extends React.Component<Props, any> {

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
   * 根据模块名搜索
   * @param {string} name
   */
  handleSearch = (name = '') => {
    getActions().rateTemplate.startQuery({name});
    console.log('search merchant', name);
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
              getLabel={(rateTemplate: any) => `${rateTemplate.name}`}
              placeholder="搜索费率模版"
              notFoundContent={processing ? <Spin size="small"/> : null}
              onSearch={this.handleSearch}
              onChange={value => this.setState({value})}
              {...props}
      />
    );
  }
}
