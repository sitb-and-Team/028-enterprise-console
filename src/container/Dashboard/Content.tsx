/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/22
 */
import * as React from 'react';
import { Button, Col, DatePicker, Row, Tabs } from 'antd';
import Bar from 'ant-design-pro/lib/Charts/Bar';
import CardGridView from '../../component/Card/CardGridView';

// 模拟数据
const salesData: any = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const cardGridViewConfig: any = {
  setCol: {
    lg: 24,
    md: 24,
    xl: 24
  },
  layout: 'stretch',
  rows: [{
    label: '1号商户001',
    defaultValue: '23222'
  }, {
    label: '2号商户002',
    defaultValue: '23223'
  }, {
    label: '3号商户333',
    defaultValue: '23223'
  }, {
    label: '4号商户333',
    defaultValue: '23223'
  }, {
    label: '5号商户333',
    defaultValue: '23223'
  }, {
    label: '6号商户333',
    defaultValue: '23223'
  }, {
    label: '7号商户333',
    defaultValue: '23223'
  }, {
    label: '8号商户333',
    defaultValue: '23223'
  }, {
    label: '8号商户333',
    defaultValue: '23223'
  }, {
    label: '8号商户333',
    defaultValue: '23223'
  }]
};

export class Content extends React.Component {

  renderContent(tabConfig) {
    return tabConfig.map((tabs, index) => {
      const {tab} = tabs;
      return (
        <Tabs.TabPane tab={tab}
                      key={index}
        >
          <Row>
            <Col span={19}>
              <Bar height={300}
                   title='交易趋势'
                   data={salesData}
              />
            </Col>
            <Col span={5}>
              <CardGridView params={{test: ''}}
                            config={cardGridViewConfig}
                            title="交易排名"
              />
            </Col>
          </Row>
        </Tabs.TabPane>
      )
    });
  }

  render() {
    const operations = (
      <Button.Group>
        <Button>{'今日'}</Button>
        <Button>{'本周'}</Button>
        <Button>{'本月'}</Button>
        <Button>{'全年'}</Button>
        <DatePicker.RangePicker/>
      </Button.Group>
    );
    const tabConfig = [{
      tab: 'pos'
    }, {
      tab: '支付宝'
    }, {
      tab: '微信'
    }, {
      tab: '快捷'
    }, {
      tab: '网关'
    }];
    return (
      <Tabs tabBarExtraContent={operations}
            style={{
              marginTop: 20,
              padding: 24,
              backgroundColor: 'white'
            }}
      >
        {this.renderContent(tabConfig)}
      </Tabs>
    )
  }
}
