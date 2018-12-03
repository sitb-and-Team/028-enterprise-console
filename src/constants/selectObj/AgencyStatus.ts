/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/12
 */
/**
 * 机构状态
 */
import { lang } from '../../locale/index';

export const AgencyStatus = {
  /**
   * 正常
   */
  normal: 'NORMAL',
  /**
   * 禁用
   */
  disabled: 'DISABLED',
  /**
   * 审核中
   */
  review: 'REVIEW',
  /**
   * 无效
   */
  invalid: 'INVALID'
};

export const AgencyStatusOptions = {
  [AgencyStatus.normal]: lang.normal,
  [AgencyStatus.disabled]: lang.disabled,
  [AgencyStatus.review]: lang.review,
  [AgencyStatus.invalid]: lang.invalid
};
