/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/6
 */
import * as styles from '../../styles/application';
import * as React from 'react';
import { Menu as ANTDMenu } from 'antd';
import { getOperatorMenus } from '../../core/menus';
import { MenuItemUtil } from '../../component/Tool/MenuItemUtil';

export interface Props {
  location: any;
}

export interface State {
  openKeys: string[];
}

export default class Menu extends React.Component<Props, State> {
  // 经过权限判断过后的menus变量
  menus = getOperatorMenus();

  state: any = {
    openKeys: []
  };

  /**
   * 菜单change 函数
   * @param openKeys 当前所展开的menu数组
   */
  onOpenChange = (openKeys) => {
    // 获取最后数组组后一个key
    const latestOpenKey: any = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : []
    });
  };

  render() {
    const {pathname} = this.props.location;
    let path = pathname === '/' ? '/dashboard' : pathname;
    const defaultOpenKeys: string[] = [];
    this.menus.forEach(menu => {
      if (path.startsWith(menu.path)) {
        defaultOpenKeys.push(menu.path);
      }
    });
    return (
      <React.Fragment>
        <div style={{
          textAlign: 'center',
          whiteSpace: 'nowrap',
          ...styles.default.menuLogo,
          ...styles.default.menuLogoMode
        }}>
          {'收单管理平台'}
        </div>
        <ANTDMenu defaultOpenKeys={defaultOpenKeys}
                  defaultSelectedKeys={['1']}
                  mode="inline"
                  theme="dark"
                  selectedKeys={[path]}
                  openKeys={this.state.openKeys}
                  onOpenChange={this.onOpenChange}
        >
          {MenuItemUtil.renderMenu(this.menus)}
        </ANTDMenu>
      </React.Fragment>
    );
  }
}
