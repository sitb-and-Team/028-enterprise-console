/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/6
 */
import * as React from 'react';
import { Icon, Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';

export interface Props extends PopconfirmProps {
  /**
   * iconType
   */
  iconType: string;
  /**
   * icon事件
   */
  iconClick?: () => void;
}

/**
 * 包裹icon的pop
 */
export class PopIcon extends React.Component<Props> {

  render() {
    const {
      iconType,
      iconClick,
      ...other
    } = this.props;
    return (
      <Popconfirm okText="是"
                  cancelText="否"
                  {...other}
      >
        <Icon type={iconType}
              onClick={iconClick}
              style={{
                paddingLeft: 20,
                paddingRight: 20
              }}
        />
      </Popconfirm>
    )
  }
}
