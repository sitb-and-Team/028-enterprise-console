/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: hjf(2283785225@qq.com)
 * date: 2018/10/31
 */
/**
 * 商户所属行业
 */
import { lang } from '../../locale';

export const MerchantAliPayMcc = {
  /**
   * 美食
   */
  food: '2015050700000000',
  /**
   *  超市便利店
   */
  supermarket: '2015091000052157',
  /**
   * 休闲娱乐
   */
  entertainment: '2015062600004525',
  /**
   * 购物
   */
  shopping: '2015062600002758',
  /**
   * 爱车
   */
  car: '2016062900190124',
  /**
   * 生活服务
   */
  service: '2015063000020189',
  /**
   * 教育培训
   */
  education: '2016042200000148',
  /**
   * 医疗健康
   */
  health: '2016062900190296',
  /**
   * 航旅
   */
  travel: '2015080600000001',
  /**
   * 专业销售/批发
   */
  salesWholesale: '2016062900190337',
  /**
   * 政府/社会组织
   */
  governmentSocialOrg: '2016062900190371'
};

export const MerchantAliPayMccOptions = {
  [MerchantAliPayMcc.food]: lang.merchant.food,
  [MerchantAliPayMcc.supermarket]: lang.merchant.supermarket,
  [MerchantAliPayMcc.entertainment]: lang.merchant.entertainment,
  [MerchantAliPayMcc.shopping]: lang.merchant.shopping,
  [MerchantAliPayMcc.car]: lang.merchant.car,
  [MerchantAliPayMcc.service]: lang.merchant.service,
  [MerchantAliPayMcc.education]: lang.merchant.education,
  [MerchantAliPayMcc.health]: lang.merchant.health,
  [MerchantAliPayMcc.travel]: lang.merchant.travel,
  [MerchantAliPayMcc.salesWholesale]: lang.merchant.salesWholesale,
  [MerchantAliPayMcc.governmentSocialOrg]: lang.merchant.governmentSocialOrg,
};
