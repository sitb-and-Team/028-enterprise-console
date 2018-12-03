/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/19
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import objectPath from 'object-path';
import { getActions } from '../../core/store';
import { Form } from '../../component/Form/Form';

import { channelMerchantCreate } from './fields';
import MerchantSearch from '../../component/Tool/MerchantSearch';
import { routerPath } from '../../core/router.config';
import { isBoolean } from 'util';
import { lang } from '../../locale';
import { StatusType, StatusTypeOptions } from '../../constants/selectObj/StatusType';
import { MerchantMode, MerchantModeOptions } from '../../constants/selectObj/MerchantMode';
import {Form as ANTDForm} from "antd";


@autoBind
class Component extends React.Component<any, any> {
  // 商户模式表单
  merchantModeFields = [{
    name: 'proxyMode',
    label: lang.merchantMode,
    type: 'select',
    options: MerchantModeOptions,
    onChange: this.handleMerchantModeChange
  }, {
    name: 'priority',
    label: lang.priority,
    rules: [{
      required: false
    }]
  }, {
    name: 'enabled',
    label: lang.status,
    rules: [{
      required: false
    }],
    type: 'select',
    options: StatusTypeOptions,
    decoratorOptions: {
      initialValue: StatusType.true
    }
  }, {
    name: 'remark',
    label: lang.remark,
    rules: [{
      required: false
    }]
  }];

  constructor(props, content) {
    super(props, content);
    let fields = this.merchantModeFields;
    let mode = objectPath.get(props, 'params.proxyMode');
    // 判断商户模式，加载表单
    if (mode) {
      fields = this.distinguishField(mode);
    }
    this.state = {
      fields: channelMerchantCreate(fields)
    }
  }

  componentWillMount() {
    const {params} = this.props;
    // 如果刷新当前页面，返回到仪表盘
    if (!(params && (!params.isUpdate || !params.isAdd))) {
      getActions().navigator.navigate(routerPath.dashboard);
    }
  }

  /**
   * 区分表单
   * @param mode
   * @returns {any}
   */
  distinguishField(mode) {
    const {params} = this.props;
    // 获取本地商户id，并传递给search组件搜索
    let merchantId = objectPath.get(params, 'localMerchantId');
    // 默认表单
    let fields: any = this.merchantModeFields.slice(0);
    // 新增本地商户表单
    if (mode === MerchantMode.oneToOne) {
      fields.splice(1, 0, {
        name: 'localMerchantId',
        label: lang.merchant.local,
        render: () => <MerchantSearch merchantId={merchantId}/>
      });
    }
    return fields;
  }

  /**
   * 商户代理模式change
   * @param mode     代理模式
   */
  handleMerchantModeChange(mode) {
    this.setState({
      fields: channelMerchantCreate(this.distinguishField(mode))
    });
  }

  /**
   * submit
   * @param values
   */
  handleSubmit(values) {
    const {params} = this.props;
    const newValue = Object.assign(values, {
      isUpdate: params.isUpdate,
      id: params.isUpdate && params.id
    });
    getActions().channelMerchant.startUpdate(newValue);
    console.log('value =>', values, newValue);
  }

  render() {
    const {processing, params, form} = this.props;
    const {fields} = this.state;
    let initialValue = (params && params.isUpdate) && {
      ...params,
      localMerchantId: `${params.localMerchant && params.localMerchant.id}`,
      enabled: isBoolean(params.enabled) && `${params.enabled}`
    } || {};
    return (
      <Form loading={processing}
            form={form}
            onSubmit={this.handleSubmit}
            initialValue={initialValue}
            fieldGroups={fields}
      />
    )
  }
}

export const ChannelMerchantPersist = connect(({channelMerchant}) => ({
  processing: channelMerchant.processing,
  searchParams: channelMerchant.searchParams,
  page: channelMerchant.page
}))(ANTDForm.create()(Component));
