/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/10
 */
import * as React from 'react';
import { Card, Icon } from 'antd';
import { GridInfoProps, gridInfoUtil } from '../Tool/GridInfoUtil';
import { CardProps } from 'antd/lib/card';

export interface Props extends CardProps {
  /**
   * 服务端数据
   */
  params: any;
  /**
   * 数据配置
   */
  config: GridInfoProps;
  /**
   * title标题
   */
  title?: string;
  /**
   * iconProps
   */
  icon?: object
}

export default class CardGridView extends React.Component<Props> {
  render() {
    const {params, config, title, icon, ...other} = this.props;
    return (
      <Card bordered={false}
            {...other}
      >
        {
          title && (
            <p style={{
              marginBottom: '0.5em',
              fontSize: 18,
              fontWeight: 700
            }}>
              <Icon type="border"
                    theme="twoTone"
                    style={{
                      marginRight: 5
                    }}
                    {...icon}
              />
              {title}
            </p>
          )
        }
        {(config && config.rows) && gridInfoUtil(config, params)}
      </Card>
    )
  }
}
