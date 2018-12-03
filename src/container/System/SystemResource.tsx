/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/31
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { resourceColumn } from './columns';
import { resourceSearch } from './fields';
import { routerPath } from '../../core/router.config';
import { permission } from '../../constants/Permissions';
import {Form as ANTDForm, message} from 'antd';
import { lang } from '../../locale';

@connect(({systemResource}) => ({
  processing: systemResource.processing,
  searchParams: systemResource.searchParams,
  page: systemResource.page
}))
@autoBind
class Component extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      record: null
    };
  }

  onRowSelect(record) {
    this.setState({record});
  }

  /**
   * query
   * @param params
   */
  handleSearch(params = this.props.searchParams) {
    getActions().systemResource.startQuery(params);
    console.log('search =>', params);
  }

  /**
   * 删除
   */
  handleDel() {
    const {record} = this.state;
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    getActions().systemResource.startDel({
      resourceId: record.id
    });
    console.log('del =>', record.id);
  }

  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer columns={resourceColumn}
                      loading={processing}
                      fieldGroups={resourceSearch}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      ANTDForm={form}
                      onDel={this.handleDel}
                      onSearch={this.handleSearch}
                      onRowSelect={this.onRowSelect}
                      addUri={routerPath.systemResourceCreate}
                      addPermission={permission.systemResources.createOrUpdate}
                      editUri={routerPath.systemResourceCreate}
                      editPermission={permission.systemResources.createOrUpdate}
                      delPermission={permission.systemResources.delete}
      />
    );
  }
}
export const SystemResource = connect(({systemResource}) => ({
  processing: systemResource.processing,
  searchParams: systemResource.searchParams,
  page: systemResource.page
}))(ANTDForm.create()(Component))
