import { ReactNode } from 'react';
import { permission, PermissionProps } from '../constants/Permissions';
import { menu } from '../locale';
import { routerPath } from './router.config';

// import hasPermission from '@sitb/wbs/utils/hasPermission';

export interface Menu {
  name: string
  icon?: string | ReactNode
  path: string
  permission?: PermissionProps
  children?: Array<Menu>
}

// 菜单配置
export const menus: Array<Menu> = [{
  name: menu.dashboard,
  path: routerPath.dashboard,
  icon: 'dashboard'
}, {
  name: menu.merchant,
  path: routerPath.merchant,
  icon: 'shop',
  permission: permission.merchant.query
}, {
  name: menu.paymentTrade,
  path: routerPath.paymentTrade,
  icon: 'profile',
  permission: permission.paymentTrade.query
}, {
  name: menu.settlement,
  path: routerPath.settlePayment,
  icon: 'pay-circle-o',
  permission: permission.paymentSettle.query
}, {
  name: menu.system,
  path: routerPath.system,
  icon: 'video-camera',
  children: [{
    name: menu.config,
    path: routerPath.systemConfig,
    permission: permission.systemConfig.query
  }, {
    name: menu.systemResource,
    path: routerPath.systemResource,
    permission: permission.systemResources.query
  }, {
    name: menu.systemRole,
    path: routerPath.systemRole,
    permission: permission.systemRole.query
  }, {
    name: menu.systemOperator,
    path: routerPath.systemOperator,
    permission: permission.systemOperators.query
  }, {
    name: menu.systemClient,
    path: routerPath.systemClient,
    permission: permission.systemClient.query
  }, {
    name: menu.systemProcess,
    path: routerPath.systemProcess,
    permission: permission.systemProcess.query
  }]
}];

/**
 * 权限检查
 * @param {Array<Menu>} menus   存放menu的数组
 * @param {Menu} menu           当前menu对象
 */
function check(menus: Array<Menu>, menu: Menu) {
//   if (menu.permission && hasPermission(menu.permission)) {
//     menus.push(menu);
//   }
//   // 默认加载仪表盘
//   if (menu.path === routerPath.dashboard) {
//     menus.push(menu);
// }
  menus.push(menu);
}

export function getOperatorMenus(): Array<Menu> {
  const newMenus: Array<Menu> = [];
  menus.forEach(menu => {
    if (menu.children) {
      let children: Array<Menu> = [];
      menu.children.forEach(subMenu => check(children, subMenu));
      if (children.length > 0) {
        menu.children = children;
        newMenus.push(menu);
      }
    } else {
      check(newMenus, menu);
    }
  });
  return newMenus;
}
