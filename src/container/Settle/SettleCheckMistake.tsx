/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */
import * as React from 'react';
import { connect } from 'react-redux';
import ColumnUtil from '../../utils/ColumnUtil';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { DataGrid } from '@sitb/wbs/DataGrid';
import { settleCheckMistakeColumns } from './columns';
import {Form as ANTDForm} from "antd";


@autoBind
class Component extends React.Component<any, any> {

  componentWillMount() {
    const {params} = this.props;
    if (params) {
      this.handleSearch(params);
    }
  }

  /**
   * 搜索方法
   * @param {any} params
   */
  handleSearch(params = {}) {
    getActions().settleCheckMistake.startQuery(params);
    console.log('search =>', params);
  }

  render() {
    const {processing, page} = this.props;
    return (
      <DataGrid page={page}
                columns={ColumnUtil.adjustRender(settleCheckMistakeColumns)}
                loading={processing}
                rowSelection={undefined}
                title={() => (
                  <TotalUtil total={page.totalElements}
                             totalAmount={page.totalAmount}
                  />)}
      />
    )
  }
}

export const SettleCheckMistake = connect(({settleCheckMistake}) => ({
  processing: settleCheckMistake.processing,
  searchParams: settleCheckMistake.searchParams,
  page: settleCheckMistake.page
}))(ANTDForm.create()(Component));
