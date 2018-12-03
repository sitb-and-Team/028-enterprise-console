/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/17
 */
import * as React from 'react';
import {Spin} from 'antd';

export class Loading extends React.Component {
  render() {
    return (
      <div style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.72)'
      }}>
        <Spin size="large"/>
      </div>
    )
  }
}
