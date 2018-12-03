import * as React from 'react';
import objectPath from 'object-path';
import { Form as ANTDForm } from "antd";
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { paymentLimitsCreate } from './fields';

@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      merchantBan: objectPath.get(props, 'params.isUpdate')
    };
  }

  /**
   * submit方法
   * @param {any} values
   */
  handleSubmit(values) {
    const {params} = this.props;
    // 分解商户信息
    const merchant: any = values.merchant.split('|');
    const newValue = Object.assign(values, {
      isUpdate: params.isUpdate,
      merchant: {
        merchantNo: merchant[0],
        merchantName: merchant[1]
      },
      id: params.isUpdate && params.id
    });
    getActions().controlMerchantLimits.startUpdate(newValue);
    console.log('submit =>', values);
  }

  render() {
    const {params, processing, match, form} = this.props;
    const {merchantBan} = this.state;
    // 默认值 商户默认值结构为 商户号|商户名 的字符串
    let initialValue = (params && params.isUpdate) && {
      ...params,
      merchant: `${params.merchant.merchantNo}|${params.merchant.merchantName}`
    } || {};
    return (
      <PersistContainer form={form}
                        match={match}
                        params={params}
                        loading={processing}
                        initialValue={initialValue}
                        fieldGroups={FieldUtil.adjustRender(paymentLimitsCreate({merchantBan}))}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const PersistControlMerchantLimits = connect(({controlMerchantLimits}) => ({
  processing: controlMerchantLimits.processing,
  page: controlMerchantLimits.page
}))(ANTDForm.create()(Component));

