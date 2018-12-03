/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/17
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Select } from '@sitb/wbs/Select';
import hasPermission from '@sitb/wbs/utils/hasPermission';
import { message } from 'antd';

import { getActions } from '../../core/store';
import { permission } from '../../constants/Permissions';
import { lang } from '../../locale';

/**
 * 独立的 roleSelect
 */
@connect(({systemRole}) => ({
  page: systemRole.page
}))
export class RoleSelect extends React.Component<any> {
  componentWillMount() {
    // 权限校验
    if (hasPermission(permission.systemRole.query)) {
      getActions().systemRole.startQuery();
    } else {
      message.warning(lang.permissionError(lang.role.id));
    }
  }

  render() {
    const {page: {content}, ...props} = this.props;
    return (
      <Select options={content}
              style={{width: '100%'}}
              placeholder="选择角色"
              getValue={({id}) => `${id}`}
              getLabel={({name}) => `${name}`}
              {...props}
      />
    );
  }
}
