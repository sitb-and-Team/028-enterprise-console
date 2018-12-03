/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/31
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import objectPath from 'object-path';

import { getActions } from '../../core/store';
import { Form } from '../../component/Form/Form';
import { businessFields } from '../../constants/FieldsBusiness';
import { routerPath } from '../../core/router.config';
import { Form as ANTDForm, message } from "antd";
import { lang } from '../../locale';
import StringUtil from '../../utils/StringUtil';


@autoBind
class Component extends React.Component<any> {
  componentWillMount() {
    const {params} = this.props;
    // 判断是否有路由参数
    if (!params) {
      getActions().navigator.navigate(routerPath.dashboard);
      return;
    }
  }

  handleSubmit(values) {
    const {params} = this.props;
    let newValue = values;
    newValue.merchantId = params.merchantId;
    // 编辑动作传递 isUpdate
    if (params.isUpdate) {
      newValue = Object.assign(values, {
        isUpdate: true,
        merchantId: params.merchantId,
        merchantBusinessId: params.merchantBusinessId
      });
    }
    // 判断费率值
    if (StringUtil.judgmentRate(newValue)) {
      message.warning(lang.minGreaterMaxMessage);
      return;
    }
    getActions().channelMerchantBusiness.startUpdate(newValue);
    console.log('value =>', values, newValue);
  }

  render() {
    const {loading, params, form} = this.props;
    // 商户业务表单
    const merchantBusinessField: any = businessFields({
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
    };
    return (
      <Form loading={loading}
            form={form}
            onSubmit={this.handleSubmit}
            initialValue={initialValue}
            fieldGroups={merchantBusinessField}
      />
    )
  }
}

export const ChannelMerchantBusinessPersist = connect(({channelMerchantBusiness}) => ({
  loading: channelMerchantBusiness.processing,
  searchParams: channelMerchantBusiness.searchParams,
  page: channelMerchantBusiness.page
}))(ANTDForm.create()(Component));
