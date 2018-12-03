/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/24
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Select } from '@sitb/wbs/Select';
import { getActions } from '../../core/store';

@connect(({systemProcess}) => ({
  page: systemProcess.page
}))
export default class MerchantReviewProcessSelect extends React.Component<any> {

  componentWillMount() {
    getActions().systemProcess.startQuery();
  }

  render() {
    const {page: {content}, ...props} = this.props;
    return (
      <Select options={content}
              style={{width: '100%'}}
              getValue={({id}) => `${id}`}
              getLabel={merchantAudit => `${merchantAudit.name}`}
              placeholder="选择审核规则"
              {...props}
      />
    )
  }
}
