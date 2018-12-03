/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';

import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { settleReconciliationTaskFields } from './fields';
import { Form as ANTDForm } from "antd";
import { momentCommon } from '../../constants/objectKey';


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
    let newValue = Object.assign(values, {
      isUpdate,
      paymentStartAt: `${moment(values.paymentAt).format(momentCommon.DATE_FORMAT)} 00:00:00`,
      paymentEndAt: `${moment(values.paymentAt).format(momentCommon.DATE_FORMAT)} 23:59:59`,
      id: params.id
    });
    getActions().settleReconciliationTask.startUpdate(newValue);
    console.log('search =>', newValue);
  }

  render() {
    const {params, form} = this.props;
    // 默认值
    let initialValue = (params && params.isUpdate) && {
      ...params
    } || {};
    return (
      <PersistContainer {...this.props}
                        form={form}
                        initialValue={initialValue}
                        fieldGroups={FieldUtil.adjustRender(settleReconciliationTaskFields)}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const SettleReconciliationTaskPersist = connect(({settleReconciliationTask}) => ({
  loading: settleReconciliationTask.processing,
  page: settleReconciliationTask.page
}))(ANTDForm.create()(Component));
