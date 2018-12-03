/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/14
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import objectPath from 'object-path';

import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { channelBusinessFields } from './fields';
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
    const {params} = this.props;
    // 编辑动作传递 isUpdate
    let newValue = Object.assign(values, {
      isUpdate,
      id: params.id
    });
    getActions().channelBusiness.startUpdate(newValue);
    console.log('search =>', newValue);
  }

  render() {
    const {params, match, loading, form} = this.props;
    // 自己组件columns
    const merchantBusinessField: any = channelBusinessFields({
      channelFlagBen: params && params.isUpdate,
      businessProps: {
        businessTypeDisabled: params && params.isUpdate,
        getAll: true
      }
    });
    // 默认值
    let initialValue = (params && params.isUpdate) && {
      ...params,
      openTime: objectPath.get(params, 'businessTime.open') && moment(params.businessTime.open),
      closeTime: objectPath.get(params, 'businessTime.close') && moment(params.businessTime.close),
      holidayEnabled: `${params.holidayEnabled}`
    } || {};
    return (
      <PersistContainer loading={loading}
                        match={match}
                        form={form}
                        initialValue={initialValue}
                        fieldGroups={FieldUtil.adjustRender(merchantBusinessField)}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const ChannelBusinessPersist = connect(({agencyBusiness}) => ({
  loading: agencyBusiness.processing,
  page: agencyBusiness.page
}))(ANTDForm.create()(Component));
