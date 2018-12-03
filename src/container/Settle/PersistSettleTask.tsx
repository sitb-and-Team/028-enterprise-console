/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/15
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';

import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { settleTaskFields } from './fields';
import { momentCommon } from '../../constants/objectKey';
import { Form as ANTDForm } from "antd";


@autoBind
class Component extends React.Component<any, any> {
  /**
   * submit方法
   * @param {any} values
   * @param {any} form
   * @param {any} isUpdate
   */
  handleSubmit(values, form, isUpdate) {
    const newValues = Object.assign({}, values, {
      paymentStartAt: `${moment(values.paymentAt[0]).format(momentCommon.DATE_FORMAT)} 0:00:00`,
      paymentEndAt: `${moment(values.paymentAt[1]).format(momentCommon.DATE_FORMAT)} 23:59:59`
    });
    getActions().settleTask.startUpdate(newValues);
    console.log('submit =>', newValues);
  }

  render() {
    const {processing, form} = this.props;
    // 默认值
    let initialValue = {};
    return (
      <PersistContainer {...this.props}
                        form={form}
                        loading={processing}
                        initialValue={initialValue}
                        fieldGroups={FieldUtil.adjustRender(settleTaskFields)}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const PersistSettleTask = connect(({settleTask}) => ({
  loading: settleTask.processing
}))(ANTDForm.create()(Component));
