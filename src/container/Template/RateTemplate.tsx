/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/16
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';

import { routerPath } from '../../core/router.config';
import { getActions } from '../../core/store';
import ColumnUtil from '../../utils/ColumnUtil';
import { permission } from '../../constants/Permissions';
import { rateTemplateSearch } from './fields';
import { rateTemplateColumns } from './columns';
import { Form as ANTDForm, message } from 'antd';
import { lang } from '../../locale';
import RateTemplateExpandedRow from './RateTemplateExpandedRow';

@autoBind
class Component extends React.Component<any, any> {

  /**
   * 搜索方法
   * @param {any} params
   */
  handleSearch(params = this.props.searchParams) {
    getActions().rateTemplate.startQuery(params);
    console.log('search =>', params);
  }

  handleDel(record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    getActions().rateTemplate.startDel(record.record.id);
    console.log('del =>', record.record);
  }


  render() {
    const {processing, page, searchParams, form} = this.props;
    return (
      <QueryContainer loading={processing}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      ANTDForm={form}
                      searchParams={searchParams}
                      columns={ColumnUtil.adjustRender(rateTemplateColumns)}
                      expandedRowRender={RateTemplateExpandedRow}
                      fieldGroups={rateTemplateSearch}
                      onSearch={this.handleSearch}
                      onDel={this.handleDel}
                      addUri={routerPath.rateTemplateCreate}
                      editUri={routerPath.rateTemplateUpdate}
                      addPermission={permission.rateTemplate.create}
                      editPermission={permission.rateTemplate.update}
                      delPermission={permission.rateTemplate.del}
      />
    )
  }
}

export const RateTemplate = connect(({rateTemplate}) => ({
  processing: rateTemplate.processing,
  searchParams: rateTemplate.searchParams,
  page: rateTemplate.page
}))(ANTDForm.create()(Component));
