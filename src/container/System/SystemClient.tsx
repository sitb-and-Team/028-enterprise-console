/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/31
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';

import { getActions } from '../../core/store';
import { routerPath } from '../../core/router.config';
import { lang } from '../../locale';
import { permission } from '../../constants/Permissions';
import {Form as ANTDForm, message} from 'antd';

const columns = [{
  title: lang.remark,
  dataIndex: 'remark'
}];

@connect(({systemClient}) => ({
  processing: systemClient.processing,
  searchParams: systemClient.searchParams,
  page: systemClient.page
}))
@autoBind
class Component extends React.Component<any, any> {
  /**
   * 搜索方法
   * @param {any} params
   */
  handleSearch(params = this.props.searchParams) {
    getActions().systemClient.startQuery(params);
    console.log('search =>', params);
  }

  handleDel(record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    console.log('删除客户端', record);
    getActions().systemClient.del(record.record.clientId);
  }

  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer loading={processing}
                      title={() => (<TotalUtil total={page.content.length}/>)}
                      page={page}
                      columns={columns}
                      ANTDForm={form}
                      fieldGroups={[]}
                      onSearch={this.handleSearch}
                      onDel={this.handleDel}
                      addUri={routerPath.systemClientCreate}
                      addPermission={permission.systemClient.create}
                      delPermission={permission.systemClient.delete}
                      editPermission={{}}
      />
    )
  }
}

export const SystemClient = connect(({systemClient}) => ({
  processing: systemClient.processing,
  searchParams: systemClient.searchParams,
  page: systemClient.page
}))(ANTDForm.create()(Component));
