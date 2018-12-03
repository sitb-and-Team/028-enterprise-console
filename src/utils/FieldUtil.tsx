import { lang } from '../locale';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/15
 */
export default class FieldUtil {
  static adjustRender(fieldGroups) {
    fieldGroups.forEach(group => {
      // 遍历fields
      group.fields.map(values => {
        // issearch为搜索表单
        if (!values.rules) {
          values.rules = [{
            required: !group.isSearch,
            message: lang.formErrorMessage(values.label)
          }]
        }
      });
      Reflect.deleteProperty(group, 'isSearch');
    });
    return fieldGroups;
  }
}
