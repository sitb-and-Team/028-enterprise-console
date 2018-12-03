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
import { routerPath } from '../../core/router.config';
import { roleColumn } from './columns';
import { permission } from '../../constants/Permissions';
import {Form as ANTDForm, message} from 'antd';
import { lang } from '../../locale';


@autoBind
class Component extends React.Component<any, any> {
  /**
   * query
   * @param params
   */
  handleSearch(params = this.props.searchParams) {
    const newParams = {
      ...params,
      size: 10
    };
    getActions().systemRole.startQuery(newParams);
    console.log('search =>', newParams);
  }

  handleDel(record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    console.log('删除角色', record.record);
    getActions().systemRole.del(record.record.id);
  }

  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer columns={roleColumn}
                      loading={processing}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      ANTDForm={form}
                      onSearch={this.handleSearch}
                      onDel={this.handleDel}
                      addUri={routerPath.systemRoleCreate}
                      editUri={routerPath.systemRoleUpdate}
                      addPermission={permission.systemRole.create}
                      editPermission={permission.systemRole.update}
                      delPermission={permission.systemRole.delete}
      />
    );
  }
}

export const SystemRole = connect(({systemRole}) => ({
  processing: systemRole.processing,
  searchParams: systemRole.searchParams,
  page: systemRole.page
}))(ANTDForm.create()(Component))
