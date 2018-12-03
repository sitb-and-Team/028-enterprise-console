/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';

import { getActions } from '../../core/store';
import { momentCommon } from '../../constants/objectKey';
import { agencyProfitSearch } from './fields';
import FieldUtil from '../../utils/FieldUtil';
import ColumnUtil from '../../utils/ColumnUtil';
import { agencyProfitColumn } from './columns';
import {Form as ANTDForm} from "antd";


@autoBind
class Component extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      record: null,
    };
  }

  /**
   * 搜索方法
   * @param {any} params
   */
  handleSearch(params = this.props.searchParams) {
    if (params.tradeAt) {
      params.startTime = moment(params.tradeAt[0]).format(momentCommon.DATETIME_FORMAT);
      params.endTime = moment(params.tradeAt[1]).format(momentCommon.DATETIME_FORMAT);
      Reflect.deleteProperty(params, 'tradeAt');
    }
    getActions().agencyProfit.startQuery(params);
    console.log('search =>', params);
  }

  onRowSelect(record) {
    console.log(this);
    this.setState({record});
  }

  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer loading={processing}
                      ANTDForm={form}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      columns={ColumnUtil.adjustRender(agencyProfitColumn)}
                      fieldGroups={FieldUtil.adjustRender(agencyProfitSearch)}
                      onSearch={this.handleSearch}
                      onRowSelect={this.onRowSelect}
                      delPermission={{}}
                      addPermission={{}}
                      editPermission={{}}
      />
    )
  }
}

export const AgencyProfit = connect(({agencyProfit}) => ({
  processing: agencyProfit.processing,
  searchParams: agencyProfit.searchParams,
  page: agencyProfit.page
}))(ANTDForm.create()(Component));
