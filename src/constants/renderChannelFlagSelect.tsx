/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/22
 */
import * as React from 'react';
import { Select } from '@sitb/wbs/Select';

export const channelType = require('web-common/locales/channelType.json');
export const firstChannelType = Object.keys(channelType)[0];

// 渲染通道标识下拉选择列表
export const renderChannelFlagSelect = (onChange?, props?: object) => (
  <Select options={channelType}
          onChange={onChange}
          style={{width: 150}}
          placeholder="切换通道"
          getValue={({id}) => `${id}`}
          getLabel={value => `${value}`}
          {...props}
  />);
