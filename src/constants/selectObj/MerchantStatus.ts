/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/12
 */
/**
 * 机构状态
 */
import { lang } from '../../locale/index';

export const MerchantStatus = {
  /**
   * 正常
   */
  normal: 'NORMAL',
  /**
   * 等待激活
   */
  waitActive: 'WAIT_ACTIVE',
  /**
   * 禁用
   */
  disabled: 'DISABLED',
  /**
   * 无效
   */
  delete: 'DELETE'
};

export const MerchantStatusOptions = {
  [MerchantStatus.normal]: lang.normal,
  [MerchantStatus.waitActive]: lang.waitActive,
  [MerchantStatus.disabled]: lang.disabled,
  [MerchantStatus.delete]: lang.delete
};
