/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/20
 */
/**
 * 费率类型
 */
import { lang } from '../../locale';

export const RateType = {
  /**
   * 固定值
   */
  cap: 'CAP',
  /**
   * 百分比
   */
  percentage: 'PERCENTAGE',
  /**
   * 封顶加百分比
   */
  cap_percentage: 'CAP_PERCENTAGE'
};

export const RateTypeOptions = {
  [RateType.cap]: lang.cap,
  [RateType.percentage]: lang.percentage,
  [RateType.cap_percentage]: lang.cap_percentage
};
