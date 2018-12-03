/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/18
 */
import { BusinessTypeData } from '../constants/BusinessType';
import { RateType, RateTypeOptions } from '../constants/selectObj/RateType';

export default class ColumnUtil {

  /**
   * 调整columns
   * @param columns columns数组对象
   * @returns {any}
   * @constructor
   */
  static adjustRender(columns) {
    columns.forEach(values => {
      if (values.type) {
        switch (values.type) {
          // 费率、服务器费类型
          case 'feeRateType':
            values.render = key => key && RateTypeOptions[key];
            break;
          // 业务类型
          case 'businessType':
            values.render = key => key && BusinessTypeData[key];
            break;
          default:
        }
      }
    });
    return columns;
  }

  /**
   * 转化单位
   * @param type    费率类型
   * @returns {string}
   */
  static unitJudgment(type: string | undefined) {
    // 为百分比的情况
    if (type && (type === RateType.percentage || type === RateType.cap_percentage)) {
      return '%';
    }
    return '元';
  }

  /**
   * 过滤rows
   * @param selectedRows
   * @returns {any}
   */
  static filterSelectRows(selectedRows) {
    let newSelected: any = [];
    selectedRows.forEach(key => {
      if (typeof key === 'string') {
        newSelected.push(key);
      } else {
        newSelected.push(key.id);
      }
    });
    return newSelected;
  }
}
