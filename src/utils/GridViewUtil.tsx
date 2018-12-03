import ColumnUtil from './ColumnUtil';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/9
 */

export interface RowItem {
  /**
   * 展示label
   */
  label: string;
  /**
   * 展示value
   */
  value: string;
  /**
   * 费率type
   */
  type: string;
}

// 默认值
let mappingObjectKey = {};
let mappingObjectGather = {};

let setValueKey = {};
let setValueGather = {};

/**
 * 针对CardGridView组件 服务的工具
 */
export default class GridViewUtil {

  /**
   * set需要映射、value函数
   * @param {any} mappingKey
   * @param {any} mappingGather
   * @param {any} valueKey
   * @param {any} valueGather
   */
  static setGridViewConfig({mappingKey, mappingGather, valueKey = {}, valueGather = {}}) {
    mappingObjectKey = mappingKey;
    mappingObjectGather = mappingGather;
    setValueKey = valueKey;
    setValueGather = valueGather
  }

  /**
   * 根据所定义的key，添加mappingObject
   * @param checkKey 被检查的key
   * @returns {any}
   */
  static adjustMappingObject(checkKey) {
    let mappingObject: any = false;
    Object.keys(mappingObjectKey).forEach(constantKey => {
      if (checkKey.search(constantKey) !== -1) {
        mappingObject = mappingObjectGather[constantKey]
      }
    });
    return mappingObject;
  }

  /**
   * 根据所定义的key，添加setValue
   * @param checkKey 被检查的key
   * @returns {any}
   */
  static adjustSetValue(checkKey) {
    let setValue: any = false;
    Object.keys(setValueKey).forEach(constantKey => {
      if (checkKey.search(constantKey) !== -1) {
        setValue = setValueGather[constantKey]
      }
    });
    return setValue;
  }

  /**
   * 生成RowItem
   * @param config 配置对象
   * @returns {object}
   */
  static generateRowItem(config: RowItem) {
    const {label, value, type} = config;
    const setValue = rate => rate && (type && `${rate}${ColumnUtil.unitJudgment(type)}` || `${rate}元`);
    return {
      label,
      value,
      setValue
    }
  };

  /**
   * 生成Row
   * @param configs
   * @returns {any}
   */
  static generateRows(configs) {
    const DEFAULT_ROWS: any = [];
    const {config} = configs;
    config.forEach((item:RowItem) => {
      DEFAULT_ROWS.push(this.generateRowItem(item));
    });
    return DEFAULT_ROWS;
  };
}
