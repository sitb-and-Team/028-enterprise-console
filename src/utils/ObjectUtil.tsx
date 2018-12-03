/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/23
 */
export default class ObjectUtil {
  /**
   * 去除对象空元素
   * @param obj
   * @returns {{}}
   */
  static filterObject(obj) {
    let newObject = {};
    for (let key in obj) {
      //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
      if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
        //记录属性
        newObject[key] = obj[key];
      }
    }
    //返回对象
    return newObject;
  }
  /**
   * 深拷贝 转化成字符串的方法
   * @param obj 对象或者数组
   * @returns {any}
   */
  static clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
