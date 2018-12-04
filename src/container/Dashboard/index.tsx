/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/22
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { ReactNode } from 'react';
import { ChartCard } from 'ant-design-pro/lib/Charts';
import { IChartCardProps } from 'ant-design-pro/lib/Charts/ChartCard';
import { Col, Icon, Row, Tooltip } from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
import { GrayBackgroundContainer } from '../../component/HocComponent/GrayBackgroundContainer';
import { chartCardConfig } from './config';
import { Content } from './Content';
import { getActions } from '../../core/store';

export interface ActionItem {
  title: string;
  icon: string;
}

export interface ChartCardProps extends IChartCardProps {
  action?: ActionItem
  children?: ReactNode
}


@connect(({paymentTrade}) => ({
  aliPay: paymentTrade.aliPay,
  weChatPay: paymentTrade.weChatPay,
  unionPay: paymentTrade.unionPay,
  posPayDirect: paymentTrade.posPayDirect,
  posPayIndirect: paymentTrade.posPayIndirect,
  all: paymentTrade.all
}))
@autoBind
export class Dashboard extends React.Component<any> {

  componentWillMount() {
    getActions().paymentTrade.searchStats();
  }

  static title = '仪表盘';

  renderChartCard(configs: Array<ChartCardProps>) {
    return configs.map((config, index) => {
      const {title, action, total, footer, contentHeight, children} = config;
      let chartProps = {
        title, total, footer, contentHeight,
        action: action && (
          <Tooltip key={index}
                   title={action.title}
          >
            <Icon type={action.icon}/>
          </Tooltip>
        )
      };
      // 栅格
      let colProps = {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 6,
        xl: 6,
        key: index
      };
      return (
        <Col {...colProps}>
          <ChartCard {...chartProps}>
            {children}
          </ChartCard>
        </Col>
      );
    });
  }

  render() {

    return (
      <GrayBackgroundContainer>
        <Row gutter={16}>
          {
            this.renderChartCard(chartCardConfig)
          }
        </Row>
        <Content/>
      </GrayBackgroundContainer>
    );
  }
}
