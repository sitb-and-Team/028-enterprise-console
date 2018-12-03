/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/19
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
 * 独立的 channelSelect
 */
@connect(({channel}) => ({
  channelFlag: channel.channelFlag
}))
export class ChannelSelect extends React.Component<any> {
  componentWillMount() {
    // 权限校验
    if (hasPermission(permission.channel.query)) {
      getActions().channel.startChannels();
    } else {
      message.warning(lang.permissionError(lang.channelFlag));
    }
  }

  render() {
    const {channelFlag: {content}, ...props} = this.props;
    return (
      <Select options={content || []}
              style={{width: '100%'}}
              placeholder="选择通道"
              getValue={({code}) => `${code}`}
              getLabel={agency => `${agency.code}`}
              {...props}
      />
    );
  }
}
