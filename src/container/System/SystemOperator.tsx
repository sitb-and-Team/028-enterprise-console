/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { systemOperatorColumns } from './columns';
import { routerPath } from '../../core/router.config';
import { permission } from '../../constants/Permissions';
import {Form as ANTDForm} from "antd";


@autoBind
class Component extends React.Component<any, any> {

  /**
   * query
   */
  handleSearch() {
    getActions().systemOperator.startQuery();
  }

  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer columns={systemOperatorColumns}
                      loading={processing}
                      fieldGroups={[]}
                      ANTDForm={form}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      onSearch={this.handleSearch}
                      dataGridOther={{
                        rowSelection: null
                      }}
                      addUri={routerPath.systemOperatorCreate}
                      addPermission={permission.systemOperators.create}
      />
    );
  }
}
export const SystemOperator = connect(({systemOperator}) => ({
  processing: systemOperator.processing,
  searchParams: systemOperator.searchParams,
  page: systemOperator.page
}))(ANTDForm.create()(Component));
