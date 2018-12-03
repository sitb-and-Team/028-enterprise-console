/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/15
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { systemProcessColumns } from './columns';
import { permission } from '../../constants/Permissions';
import { routerPath } from '../../core/router.config';
import {Form as ANTDForm, message} from 'antd';
import { lang } from '../../locale';

@connect(({systemProcess}) => ({
  processing: systemProcess.processing,
  searchParams: systemProcess.searchParams,
  page: systemProcess.page
}))
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
    getActions().systemProcess.startQuery(params);
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
    getActions().systemProcess.startDel({systemProcessId: record.id});
    console.log('del =>', record.id);
  }

  render() {
    const {processing, page ,form} = this.props;
    return (
      <QueryContainer columns={systemProcessColumns}
                      loading={processing}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      ANTDForm={form}
                      onRowSelect={this.onRowSelect}
                      onSearch={this.handleSearch}
                      onDel={this.handleDel}
                      addUri={routerPath.systemProcessCreate}
                      editUri={routerPath.systemProcessUpdate}
                      addPermission={permission.systemProcess.create}
                      editPermission={permission.systemProcess.update}
                      delPermission={permission.systemProcess.delete}
      />
    );
  }
}

export const SystemProcess = connect(({systemProcess}) => ({
  processing: systemProcess.processing,
  searchParams: systemProcess.searchParams,
  page: systemProcess.page
}))(ANTDForm.create()(Component));
