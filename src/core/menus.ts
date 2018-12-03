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
  name: menu.channel,
  path: routerPath.channel,
  icon: 'barcode',
  children: [{
    //   name: menu.channelBusiness,
    //   path: routerPath.channelBusiness,
    //   permission: permission.channelsBusiness.query
    // }, {
    name: menu.merchant,
    path: routerPath.channelMerchant,
    permission: permission.channelMerchant.query
  }, {
    name: menu.config,
    path: routerPath.channelConfig,
    permission: permission.channelConfig.query
  }]
}, {
  name: menu.agency,
  path: routerPath.agency,
  icon: 'bank',
  children: [{
    name: menu.agency,
    path: routerPath.agency,
    permission: permission.agency.query
  }, {
    //   name: menu.config,
    //   path: routerPath.agencyConfig,
    //   permission: permission.agencyConfig.query
    // }, {
    name: menu.agencyProfit,
    path: routerPath.agencyProfit,
    permission: permission.agencyProfit.queryProfit
  }]
}, {
  name: menu.merchant,
  path: routerPath.merchant,
  icon: 'shop',
  children: [{
    name: menu.merchant,
    path: routerPath.merchant,
    permission: permission.merchant.query
  }, {
    name: menu.merchantReview,
    path: routerPath.merchantReview,
    permission: permission.merchantReView.query
  }, {
    name: menu.merchantBusinessReview,
    path: routerPath.merchantBusinessReview,
    permission: permission.merchantBusinessReview.query
  }]
}, {
  name: menu.riskControl,
  path: routerPath.riskControl,
  icon: 'control',
  children: [{
    name: menu.controlMerchantLimits,
    path: routerPath.controlMerchantLimits,
    permission: permission.controlMerchantLimits.query
  }, {
    name: menu.cushionQuotManagement,
    path: routerPath.cushionQuotManagement,
    permission: permission.cushionQuotManagement.query
  }]
}, {
  name: menu.paymentTrade,
  path: routerPath.payment,
  icon: 'profile',
  children: [{
    name: menu.paymentTrade,
    path: routerPath.paymentTrade,
    permission: permission.paymentTrade.query
  }, {
    name: menu.paymentRoute,
    path: routerPath.paymentRoute,
    permission: permission.paymentRoute.query
  }]
}, {
  name: menu.settlement,
  path: routerPath.settlePayment,
  icon: 'pay-circle-o',
  children: [{
    name: menu.settlePayment,
    path: routerPath.settlePayment,
    permission: permission.paymentSettle.query
  }, {
    name: menu.settleTask,
    path: routerPath.settleTask,
    permission: permission.settleTask.query
  }, {
    name: menu.settleReconciliationTask,
    path: routerPath.settleReconciliationTask,
    permission: permission.settleReconciliationTask.query
  }]
}, {
  name: menu.template,
  path: routerPath.rateTemplate,
  icon: 'copy',
  children: [{
    name: menu.rateTemplate,
    path: routerPath.rateTemplate,
    permission: permission.rateTemplate.query
  }]
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
