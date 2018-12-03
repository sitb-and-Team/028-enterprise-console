/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/21
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Select } from '@sitb/wbs/Select';

@connect(({session}) => ({
  selectResource: session.selectResource
}))
export class ResourcesSelect extends React.Component<any> {
  render() {
    const {selectResource} = this.props;
    return (
      <Select options={selectResource}
              placeholder="请选择模块"
              getValue={({id}) => `${id}`}
              getLabel={(value: any) => `${value.describe}`}
              {...this.props}
      />);
  }
}
