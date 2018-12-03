/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/9
 */
import GridViewUtil from './GridViewUtil';
import { objectPathGet } from '../component/Tool/GridInfoUtil';

// 需要跳过的字段
let checkKeywordList: any = [],
  labelList: any = {};

export default class ReviewUtils {

  /**
   * setCheckKeyWordList
   * @param list 列表
   */
  static setCheckKeyWordList(list: Array<string>) {
    checkKeywordList = list;
  }

  /**
   * setLabelObject
   * @param objects  对象
   */
  static setLabelObject(objects: object) {
    labelList = objects;
  }

  /**
   * 校验两个对象不同值的集合
   * @param dataSources         被遍历的对象
   * @param key                 检查的key
   * @param {boolean} isChange  遍历出值不同的开关
   * @returns {any}
   */
  static someData(dataSources, key, isChange = false) {
    // 修改值的开关
    if (isChange) {
      return dataSources.some(dataSource => (dataSource.value === key.value && dataSource.defaultValue !== key.defaultValue));
    }
    // 检验不同值
    return dataSources.some(dataSource => (dataSource.value === key.value && dataSource.defaultValue === key.defaultValue));
  }

  /**
   * 生成集合
   * @param targetData          被过滤的对象
   * @param dataSources         过滤的对象
   * @param {boolean} isChange  遍历修改值的开关
   * @returns {any}
   */
  static filterData(targetData, dataSources, isChange = false) {
    // 修改值的开关
    if (isChange) {
      return targetData.filter(key => this.someData(dataSources, key, isChange));
    }
    // 检验不同值
    return targetData.filter(key => !this.someData(dataSources, key));
  }

  /**
   * 根据value添加 gridViewUtil props
   * @param value
   * @returns {any}
   */
  static adjustSpreadProps(value) {
    let PUSH_OBJECT: any = {};
    // 根据key判断是否添加mapping set
    let mappingObject: any = GridViewUtil.adjustMappingObject(value);
    let setValue: any = GridViewUtil.adjustSetValue(value);
    if (mappingObject) {
      PUSH_OBJECT = {
        ...PUSH_OBJECT,
        mappingObject
      }
    }
    if (setValue) {
      PUSH_OBJECT = {
        ...PUSH_OBJECT,
        mappingObject,
        setValue
      }
    }
    return PUSH_OBJECT;
  }

  /**
   * 检查需要跳过的字段
   * @param checkKey
   * @returns {any}
   */
  static checkKeyword(checkKey) {
    return checkKeywordList.some(key => key === checkKey);
  }

  /**
   * 展开所有数据
   * @param filterData      被遍历的对象
   * @param secondKey       父级对象key
   * @param isArray         判断遍历的子对象是否有array
   * 以下是扩展功能
   * @param extendGridView  是否扩展，在遍历的时候加gridView相关的props
   * @returns {any}
   */
  static generateSpreadData({filterData, secondKey = '', isArray = false, extendGridView = false}) {
    // 存放数据的变量
    let finalData: any = [];
    Object.keys(filterData).map((filterKey: any) => {
      // 遍历对象key是否包含跳过的字段
      if (!this.checkKeyword(secondKey || filterKey)) {

        // value为object的情况
        if (filterData[filterKey] instanceof Object) {
          // 生成包含上一级的path
          let path = secondKey && `${secondKey}.${filterKey}` || filterKey;

          // 判断当前对象key是否为array类型，传递到下一层，因为数组的path需要改为[]包裹
          let arranged = Array.isArray(filterData[filterKey]);
          // 判断上一层的数据类型是否为array，生成新path
          if (isArray) {
            path = secondKey && `${secondKey}[${filterKey}]` || `[${filterKey}]`;
          }
          finalData.push(...this.generateSpreadData({
            filterData: filterData[filterKey],
            secondKey: path,
            isArray: arranged,
            extendGridView
          }));
          return;
        }

        // 最后生成的一整条path、隐射、value
        let value = secondKey && `${secondKey}.${filterKey}` || filterKey;
        let label = objectPathGet(labelList, value);
        let defaultValue = objectPathGet(filterData, filterKey);

        // 默认push
        let PUSH_OBJECT: any = {
          label, value, defaultValue
        };

        // 是否扩展，增加gridView的配置
        if (extendGridView) {
          PUSH_OBJECT = extendGridView && {
            label, value, defaultValue,
            ...this.adjustSpreadProps(value)
          };
        }

        finalData.push(PUSH_OBJECT);
      }
    });
    return finalData;
  }

  /* 以下是把generateSpreadData展开生成的数据，修改成table展示数据 */
  /**
   * 统一给table 数据添加扩展属性
   * @param values    被判断的值
   * @returns {any}
   */
  static adjustTableDataSourceProps(values) {
    let newValue: any = values.defaultValue;
    // 对象扩展
    if (values.mappingObject) {
      newValue = newValue && values.mappingObject[`${newValue}`];
    }
    // setValue
    if (values.setValue) {
      newValue = values.setValue(newValue);
    }
    return newValue;
  }

  /**
   *  渲染多个数据
   * @param {any} after
   * @param {any} beforeItem
   * @param reverse
   */
  static generateMultipleData({after, beforeItem, reverse}) {
    let afterValue: any = ' ';
    // 判断扩展
    let beforeValue = this.adjustTableDataSourceProps(beforeItem);
    // 匹配数据，判断扩展
    let afterData = after.find(afterItem => afterItem.label === beforeItem.label && afterItem.value === beforeItem.value);
    if (afterData) {
      afterValue = this.adjustTableDataSourceProps(afterData);
    }
    return {
      key: beforeItem.label,
      beforeValue: reverse && afterValue || beforeValue,
      afterValue: reverse && beforeValue || afterValue
    };
  }

  /**
   * 渲染单个的数据，after或者before
   * @param {any} after   之前的数据
   * @param {any} before  之后的数据
   * @returns {any}
   */
  static generateSingleData({after, before}) {
    const RETURN_VALUE: any = [];
    // 被遍历的数组
    const forEachVariable = after || before;
    forEachVariable.forEach(item => {
      let defaultValue = this.adjustTableDataSourceProps(item);
      // 区分value
      let afterValue = after && defaultValue || '';
      let beforeValue = before && defaultValue || '';

      // 校验一次value
      if (!item.defaultValue) {
        console.warn('defaultValue 为空，请检查generateSpreadData生成的数据');
      }
      RETURN_VALUE.push({
        key: item.label,
        beforeValue,
        afterValue
      });
    });
    return RETURN_VALUE;
  }

  /**
   * 生成审核表格数据
   * @param {any} after   之前的数据
   * @param {any} before  之后的数据
   * @param reverse
   * @returns {any}
   */
  static generateTableDataSource({after, before, reverse = false}: any = {}) {
    let RETURN_VALUE: any = [];
    // 如果after before都存在，需要循环判断两者的相同属性
    if (after && before) {
      before.forEach(beforeItem => RETURN_VALUE.push(this.generateMultipleData({after, beforeItem, reverse})));
      return RETURN_VALUE;
    }
    // 默认返回单方面的数据
    return this.generateSingleData({after, before});
  }
}
