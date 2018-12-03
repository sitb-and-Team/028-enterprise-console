/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/16
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';

import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { rateTemplateFields } from './fields';
import { Form as ANTDForm, message } from "antd";
import StringUtil from '../../utils/StringUtil';
import { lang } from '../../locale';


@autoBind
class Component extends React.Component<any, any> {
  /**
   * submit方法
   * @param {any} values
   * @param {any} form
   * @param {any} isUpdate
   */
  handleSubmit(values, form, isUpdate) {
    const {params} = this.props;
    // 编辑动作传递 isUpdate
    let newValue: any = Object.assign({}, values, {
      isUpdate,
      id: params.id
    });
    // 判断费率值
    if (StringUtil.judgmentRate(newValue)) {
      message.warning(lang.minGreaterMaxMessage);
      return;
    }
    getActions().rateTemplate.startUpdate(newValue);
    console.log('search =>', newValue);
  }


  render() {
    const {params, form} = this.props;
    let initialValue = (params && params.isUpdate) && {
      ...params
    } || {};
    return (
      <PersistContainer {...this.props}
                        col={{
                          lg: 12
                        }}
                        form={form}
                        initialValue={initialValue}
                        fieldGroups={FieldUtil.adjustRender(rateTemplateFields)}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const PersistRateTemplate = connect(({rateTemplate}) => ({
  loading: rateTemplate.processing,
  page: rateTemplate.page
}))(ANTDForm.create()(Component));
