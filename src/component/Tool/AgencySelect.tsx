/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/15
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { SelectProps } from 'antd/lib/select';
import { message } from 'antd';
import { Select } from '@sitb/wbs/Select';
import hasPermission from '@sitb/wbs/utils/hasPermission';

import { getActions } from '../../core/store';
import { permission } from '../../constants/Permissions';
import { lang } from '../../locale';
import { getAgencies, getAgencyId } from '../../core/SessionServices';

export interface Props extends SelectProps {
  /**
   * 下机机构
   */
  childrenAgencies?: any;
  getValue?: (options, index) => void;
  /**
   * 是否包含本身
   */
  own?: boolean;
}

/**
 * 独立的 agencySelect
 */
@connect(({session}) => ({
  childrenAgencies: session.childrenAgencies
}))
export class AgencySelect extends React.Component<Props> {
  constructor(props, content) {
    super(props, content);
  }

  componentWillMount() {
    // 权限校验
    if (hasPermission(permission.systemAgency.children)) {
      getActions().session.getChildrenAgency();
    } else {
      message.warning(lang.permissionError(lang.agency.childAgency));
    }
  }

  /**
   * 组建options
   * @returns {any}
   */
  makeOptions = () => {
    const {childrenAgencies, own = false} = this.props;
    // 默认展示包含自己跟下级机构
    let newOptions = childrenAgencies;
    if (own) {
      let agencies = getAgencies() || [];
      agencies = agencies.find(agency => `${agency.agency.id}` === getAgencyId()) || [];
      newOptions = newOptions.concat(agencies.agency);
    }
    return newOptions;
  };

  render() {
    const {childrenAgencies, ...props} = this.props;
    return (
      <Select options={this.makeOptions()}
              style={{width: '100%'}}
              placeholder="选择机构"
              getValue={({id}) => `${id}`}
              getLabel={agency => `${agency.code}-${agency.name}` || `${agency}`}
              {...props}
      />
    );
  }
}
