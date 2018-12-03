/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/30
 */
import * as React from 'react';
import { connect } from 'react-redux';
import {Form as ANTDForm, message} from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';

import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';

import { routeSearch } from './fields';
import { routerPath } from '../../core/router.config';
import { getActions } from '../../core/store';
import PaymentRouteExpandedRow from './PaymentRouteExpandedRow';
import { permission } from '../../constants/Permissions';
import { lang } from '../../locale';
import { paymentRouteColumns } from './columns';

@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      record: null
    };
  }

  /**
   * 保存当前行数据
   * @param record
   */
  onRowSelect(record) {
    this.setState({record});
  }

  /**
   * query
   * @param params
   */
  handleSearch(params) {
    getActions().paymentRoute.startQuery(params);
    console.log('search -> ', params);
  }

  /**
   * DEL
   */
  handleDel() {
    const {record} = this.state;
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    getActions().paymentRoute.startDel({paymentRouteId: record.id});
    console.log('del =>', record.id);
  }

  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer columns={paymentRouteColumns}
                      ANTDForm={form}
                      loading={processing}
                      fieldGroups={routeSearch}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      onRowSelect={this.onRowSelect}
                      onSearch={this.handleSearch}
                      onDel={this.handleDel}
                      expandedRowRender={PaymentRouteExpandedRow}
                      addUri={routerPath.paymentRouteCreate}
                      editUri={routerPath.paymentRouteUpdate}
                      addPermission={permission.paymentRoute.create}
                      editPermission={permission.paymentRoute.update}
                      delPermission={permission.paymentRoute.delete}
      />
    );
  }
}

export const PaymentRoute = connect(({paymentRoute}) => ({
  processing: paymentRoute.processing,
  searchParams: paymentRoute.searchParams,
  page: paymentRoute.page
}))(ANTDForm.create()(Component));
