/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/6
 */
import * as React from 'react';
import { Icon } from 'antd';

export interface Props {
  /**
   * 总数
   */
  total?: number | React.ReactNode;
  /**
   * 总金额
   */
  totalAmount?: number | React.ReactNode;
}

export default class TotalUtil extends React.Component<Props> {
  renderTotal(totalNum: string | React.ReactNode) {
    const content = (typeof totalNum === 'number' ? (
      <React.Fragment>
        {'共'}
        <span style={{
          margin: '0 5px',
          color: '#1890ff',
          fontWeight: 700
        }}>{totalNum}</span>
        {'条记录   '}
      </React.Fragment>
    ) : totalNum);
    return (
      <React.Fragment>
        <Icon style={{
          marginRight: '5px',
          fontSize: 16,
          color: '#1890ff'
        }}
              type="exclamation-circle"
        />
        {content}
      </React.Fragment>
    )
  }

  renderTotalAmount(totalAmount) {
    const content = (typeof totalAmount === 'number' ? (
      <React.Fragment>
        <span style={{marginLeft: 5}}>{'总数'}
          <span style={{
            margin: '0 5px',
            color: '#1890ff',
            fontWeight: 700
          }}>{totalAmount}</span>
          {'元'}
            </span>
      </React.Fragment>
    ) : totalAmount);
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    )
  }

  render() {
    const {total, totalAmount} = this.props;
    return (
      <p style={{
        margin: 0,
        fontSize: 15,
        color: '#333'
      }}>
        {this.renderTotal(total)}
        {this.renderTotalAmount(totalAmount)}
      </p>
    );
  }
}
