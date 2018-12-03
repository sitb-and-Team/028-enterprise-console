/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/10
 */
/**
 * 商户证件类型
 */
import { lang } from '../../locale';

export const MerchantBusinessType = {
  /**
   * 营业执照
   */
  businessLicense: 'BUSINESS_LICENSE',
  /**
   * 多证合一的营业执照
   */
  businessLicenseAllOne: 'BUSINESS_LICENSE_ALL_ONE',
  /**
   * 事业单位证书
   */
  institution: 'INSTITUTION'
};

export const MerchantBusinessOptions = {
  [MerchantBusinessType.businessLicense]: lang.merchant.businessLicenseString,
  [MerchantBusinessType.businessLicenseAllOne]: lang.merchant.businessLicenseAllOne,
  [MerchantBusinessType.institution]: lang.merchant.institution
};
