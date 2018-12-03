/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/17
 */
import * as styles from '../../styles/application';
import * as React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import hasPermission, { setPermissions } from '@sitb/wbs/utils/hasPermission';
import { getAgencyRules } from '../../core/SessionServices';

import { getActions } from '../../core/store'
import Content from './Content';
import Header from './Header';
import Menu from './Menu';
import { permission } from '../../constants/Permissions';

const {Sider, Footer} = Layout;

@withRouter
export default class MainContainer extends React.Component<any> {

  state = {
    collapsed: false,
  };

  componentWillMount() {
    const rules = getAgencyRules();
    if (rules) {
      this.handleSetPermissions(rules);
    }
  }

  componentDidMount() {
    // 获取通道标识
    if (hasPermission(permission.channel.query)) {
      getActions().channel.startChannels();
    }
    if (hasPermission(permission.systemAgency.children)) {
      // 获取下级机构
      getActions().session.getChildrenAgency();
    }
    const {pathname} = this.props.location;
    if (pathname === '/') {
      getActions().navigator.replace('dashboard');
    }
  }

  /**
   * 生成permission
   * @param rules
   */
  handleSetPermissions(rules) {
    const newRules: any = [];
    rules.forEach(rule => {
      if (rule.permissions) {
        rule.permissions.forEach(permission => {
          const {method, uri} = permission;
          newRules.push({
            method,
            uri
          });
        });
      }
    });
    // set权限配置
    setPermissions(newRules);
  }

  /**
   * 菜单形态变化
   */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const {location} = this.props;
    const {collapsed} = this.state;
    return (
      <Layout style={styles.default.container}>
        <Sider trigger={null}
               collapsible
               collapsed={collapsed}
               style={{
                 position: 'fixed',
                 top: 0,
                 bottom: 0
               }}
        >
          <Menu location={location}/>
        </Sider>
        <Layout style={{marginLeft: !collapsed && 200 || 80}}>
          <Header collapsed={collapsed}
                  toggle={this.toggle}
          />
          <Content {...this.props}/>
          <Footer style={{textAlign: 'center'}}>
            {'©2018'}
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

