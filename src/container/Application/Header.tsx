/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/6
 */
import styles from '../../styles/application';
import * as React from 'react';
import { Col, Dropdown, Icon, Layout, Row } from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
import { getAgencies, getAgencyId } from '../../core/SessionServices';
import { switchAgencySelect } from '../../constants/renderAgencySelect';
import { getActions } from '../../core/store';
import { MenuItemUtil } from '../../component/Tool/MenuItemUtil';
import { routerPath } from '../../core/router.config';

// 匹配当前登录用户数据
export const activeUser: any = (getAgencyId() && getAgencies()) && getAgencies().find(agencyes => `${agencyes.agency.id}` === `${getAgencyId()}`);

export interface Props {
  collapsed: boolean;
  toggle: () => void;
}

@autoBind
export default class Header extends React.Component<Props, any> {
  /**
   * 存储机构id
   * @param value
   */
  handleChangeAgencyId(value) {
    getActions().session.startAgencyId(value);
  }

  /**
   * 退出
   */
  handleEntityExit() {
    console.log('退出');
    getActions().session.startEntityExit();
  }

  /**
   * 查看用户信息
   */
  handleGoToUser() {
    getActions().navigator.navigate(routerPath.profile);
  }

  render() {
    // 匹配操作员名称
    // 下拉菜单配置
    const menuConfig = [{
      name: '用户信息',
      icon: 'user',
      onClick: this.handleGoToUser
    }, {
      name: '机构信息',
      icon: 'shop',
      disabled: true
    }, {
      name: '退出',
      icon: 'poweroff',
      onClick: this.handleEntityExit
    }];
    return (
      <React.Fragment>
        <Layout.Header style={{...styles.header, ...styles.headerMode}}>
          <Icon style={{...styles.isHeaderCut, ...styles.isHeaderCutMode}}
                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.props.toggle}
          />
          <Row className="paddingRight20">
            <Col style={styles.headerAgency}>
              {
                switchAgencySelect({
                  options: getAgencies(),
                  onChange: this.handleChangeAgencyId,
                  value: getAgencyId()
                })
              }
            </Col>
            <Dropdown.Button overlay={MenuItemUtil.renderDropDownMenus(menuConfig)}
                             trigger={['click']}
            >
              {MenuItemUtil.renderMenuTitle('user', activeUser.name)}
            </Dropdown.Button>
          </Row>
        </Layout.Header>
      </React.Fragment>
    );
  }

}

