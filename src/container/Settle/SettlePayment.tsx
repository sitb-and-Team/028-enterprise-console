/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import objectPath from 'object-path';
import { QueryContainer } from '../../component/QueryContainer';
import { settleSearch } from './fields';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { momentCommon } from '../../constants/objectKey';
import { settlePaymentColumns } from './columns';
import { lang } from '../../locale';
import { routerPath } from '../../core/router.config';
import { permission } from '../../constants/Permissions';
import SettlePaymentExpandedRow from './SettlePaymentExpandedRow';
import { Form as ANTDForm, message } from 'antd';


@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      isPerform: false,
      isMandatory: false
    };
  }

  /**
   * query
   * @param params
   */
  handleSearch(params = this.props.searchParams) {
    // 结算时间
    let settleAt = objectPath.get(params, 'settleAt');
    params.startSettleAt = settleAt && `${moment(settleAt[0]).format(momentCommon.DATE_FORMAT)} 0:00:00` || '';
    params.endSettleAt = settleAt && `${moment(settleAt[1]).format(momentCommon.DATE_FORMAT)} 23:59:59` || '';
    Reflect.deleteProperty(params, 'settleAt');
    getActions().settlePayment.startQuery(params);
    console.log('search -> ', params);
  }

  /**
   * 执行出款
   * @param key      target
   * @param record   当前行数据
   */
  handlePerform(key, record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    // mandatory是否强制字段
    const data = {
      id: record.record.id,
      mandatory: key === 'isMandatory'
    };
    getActions().settlePayment.startPerform(data);
    this.popSwitch(key, false);
    console.log('settle perform =>', data);
  }

  /**
   * 跳转交易
   */
  handleGoToPaymentTrade(record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    // 获取交易流水号
    const auditNumber = objectPath.get(record, 'record.paymentRecord.auditNumber');
    // 更改为直接发送请求，再路由跳转，auditNumber交易流水号
    getActions().paymentTrade.startQuery({serialNumber: auditNumber});
    getActions().navigator.navigate(routerPath.paymentTrade);
    console.log('go to PaymentTrade =>', auditNumber);
  }

  popSwitch(key, status) {
    this.setState({[key]: status});
  }

  /**
   * 按钮配置
   * @param record
   */
  buttonGroupsConfig(record) {
    const {isPerform, isMandatory} = this.state;
    return [[{
      func: 'edit',
      pop: {
        title: lang.settle.perform,
        visible: isPerform,
        onConfirm: () => this.handlePerform('isPerform', record),
        onCancel: () => this.popSwitch('isPerform', false)
      },
      children: lang.settle.perform,
      disabled: record === null,
      onClick: () => this.popSwitch('isPerform', true),
      permission: permission.paymentSettle.handlePaymentTradeSettle
    }, {
      func: 'edit',
      pop: {
        title: lang.settle.mandatory,
        visible: isMandatory,
        onConfirm: () => this.handlePerform('isMandatory', record),
        onCancel: () => this.popSwitch('isMandatory', false)
      },
      children: lang.settle.mandatory,
      disabled: record === null,
      onClick: () => this.popSwitch('isMandatory', true),
      permission: permission.paymentSettle.handlePaymentTradeSettle
    }], [{
      func: 'eye',
      tip: {
        title: lang.settle.goToPaymentTradeTitle
      },
      children: lang.settle.goToPaymentTradeTitle,
      disabled: record === null,
      onClick: () => this.handleGoToPaymentTrade(record),
      permission: permission.paymentTrade.query
    }]]
  }

  render() {
    const {processing, page, searchParams, form} = this.props;
    return (
      <QueryContainer columns={settlePaymentColumns}
                      loading={processing}
                      ANTDForm={form}
                      fieldGroups={settleSearch}
                      buttonGroups={record => this.buttonGroupsConfig(record)}
                      expandedRowRender={SettlePaymentExpandedRow}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      searchParams={searchParams}
                      onSearch={this.handleSearch}
      />
    );
  }
}

export const SettlePayment = connect(({settlePayment}) => ({
  processing: settlePayment.processing,
  searchParams: settlePayment.searchParams,
  page: settlePayment.page
}))(ANTDForm.create()(Component));
