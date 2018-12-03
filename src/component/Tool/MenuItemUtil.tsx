import { Menu as MenuConfigProps } from '../../core/menus';
import * as React from 'react';
import { Icon, Menu as ANTDMenu } from 'antd';
import { Link } from 'react-router-dom';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/27
 */

export class MenuItemUtil {
  /**
   * 渲染菜单
   * @param {Array<Menu>} menus
   * @returns {React.ReactNode}
   */
  static renderMenu(menus: Array<MenuConfigProps>): React.ReactNode {
    return menus.map(({path, icon, name, children}) => children ? (
      <ANTDMenu.SubMenu key={path}
                        title={this.renderMenuTitle(icon, name)}
      >
        {this.renderMenu(children)}
      </ANTDMenu.SubMenu>
    ) : (
      <ANTDMenu.Item key={path}>
        <Link to={path}>
          {this.renderMenuTitle(icon, name)}
        </Link>
      </ANTDMenu.Item>
    ));
  }

  /**
   * @param icon 图标string
   * @param name menu名 string
   * @returns {any}
   */
  static renderMenuTitle(icon: string | React.ReactNode, name: string): React.ReactNode {
    return (
      <React.Fragment>
        {typeof icon === 'string' ? (
          <Icon type={icon}/>
        ) : icon}
        <span>{name}</span>
      </React.Fragment>
    );
  }

  /**
   * 渲染下拉菜单
   * @param menus
   * @returns {any}
   */
  static renderDropDownMenus(menus) {
    return (
      <ANTDMenu>
        {
          menus.map(({icon, name, ...other}, index) => (
            <ANTDMenu.Item key={index}
                           {...other}
            >
              {this.renderMenuTitle(icon, name)}
            </ANTDMenu.Item>
          ))
        }
      </ANTDMenu>
    )
  }
}
