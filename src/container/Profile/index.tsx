/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/7
 */
import * as React from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { Profile } from './Profile';
import { ProfileAgencyBusiness } from './AgencyBusiness';
import { lang } from '../../locale';
import { GrayBackgroundContainer } from '../../component/HocComponent/GrayBackgroundContainer';

export class ProfileIndex extends React.Component<any> {

  render() {
    return (
      <GrayBackgroundContainer>
        <Row type='flex'
             gutter={10}
        >
          <Col span={7}>
            <Profile/>
          </Col>

          <Col span={17}>
            <Card>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab={lang.agencyBusiness.title}
                              key="1"
                >
                  <ProfileAgencyBusiness/>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </GrayBackgroundContainer>
    )
  }
}
