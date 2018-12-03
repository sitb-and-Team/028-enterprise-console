/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/30
 */
/**
 * 垫资对象类型
 */
import { lang } from '../../locale';

export const CushionQuotType = {
  /**
   * 机构
   */
  agency: 'AGENCY',
  /**
   * 商户
   */
  merchant: 'MERCHANT'
};

export const CushionQuotTypeOptions = {
  [CushionQuotType.agency]: lang.cushionQuotManagement.agency,
  [CushionQuotType.merchant]: lang.cushionQuotManagement.merchant
};
