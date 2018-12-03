/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/17
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { message, Spin } from 'antd';
import { Select } from '@sitb/wbs/Select';
import hasPermission from '@sitb/wbs/utils/hasPermission';

import { getActions } from '../../core/store';
import { permission } from '../../constants/Permissions';
import { lang } from '../../locale';

/**
 * 独立的 userSelect
 */
@connect(({user}) => ({
  page: user.page,
  processing: user.processing
}))
export class UserSelect extends React.Component<any> {
  componentWillMount() {
    // 权限校验
    if (hasPermission(permission.user.query)) {
      getActions().user.startQuery();
    } else {
      message.warning(lang.permissionError(lang.systemOperator.userId));
    }
  }

  render() {
    const {page: {content}, processing, ...props} = this.props;
    return (
      <Select options={content}
              style={{width: '100%'}}
              placeholder="选择用户"
              getValue={({id}) => `${id}`}
              getLabel={(user: any) => `${user.username}`}
              notFoundContent={processing ? <Spin size="small"/> : null}
              {...props}
      />
    );
  }
}
