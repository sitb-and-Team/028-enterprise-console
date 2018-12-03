/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/22
 */
import * as React from 'react';

/**
 * 灰色背景容器
 */
export class GrayBackgroundContainer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(240,242,245,1)',
          position: 'absolute'
        }}
        />
        {this.props.children}
      </React.Fragment>
    )
  }
}
