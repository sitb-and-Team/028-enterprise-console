import Common from '@sitb/wbs/constants/Common';
import * as moment from 'moment';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao
 * data: 2018/6/14
 */
export default class StringUtil {
  /**
   * 去除前后空格
   * @param str 当前带有空格的字符串
   */
  static trim(str) {
    if (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    }
    return str;
  }

  /**
   * 格式化时间
   * @param {string}    target 开始还是结束，默认开始
   * @param data        传递时间
   * @returns {string}
   */
  static formatTime(target = 'start', data: any = false) {
    let prefix = '00:00:00';
    if (target === 'end') {
      prefix = '23:59:59';
    }
    if (data) {
      return `${moment(data).format(Common.DATE_FORMAT)} ${prefix}`;
    }
    return `${moment().format(Common.DATE_FORMAT)} ${prefix}`;
  }

  /**
   * 过滤 成功状态
   * @param selectedRows  list数据
   * @returns {any}
   */
  static someSuccess(selectedRows) {
    return selectedRows.some(record => record.status === 'SUCCESS');
  }

  /**
   * 过滤 成功
   * @param selectedRows
   * @returns {any}
   */
  static someSuccessProcessing(selectedRows) {
    return selectedRows.some(record => record.status === 'SUCCESS' || record.status === 'PROCESSING');
  }

  /**
   * 过滤 状态为处理中
   * @param selectedRows
   * @returns {any}
   */
  static someProcessing(selectedRows) {
    return selectedRows.some(record => record.status === 'PROCESSING');
  }


  /**
   * 判断费率
   * @param data
   * @returns {any}
   */
  static judgmentRate(data) {
    return Object.keys(data).some(keys => {
      if (this.filterType(keys)) {
        // 判断是否有pos结算
        if (keys === 'posFeeRate') {
          return this.judgmentRate(data[keys]);
        }
        // 判断值
        return Number(data[keys].min) > Number(data[keys].max);
      }
      return false;
    });
  }

  /**
   * 过滤Type
   * @param key      key
   * @returns {any}
   */
  static filterType(key) {
    let rateString: any = [
      'normalFeeRate',
      'serviceFeeRate',
      'posFeeRate',
      'debit',
      'ownerDebit',
      'credit',
      'ownerCredit',
      'abroadDebit',
      'abroadCredit'
    ];
    return rateString.some(string => string === key);
  }
}
