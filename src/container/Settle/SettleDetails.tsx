/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/20
 */
import * as React from 'react';
import { connect } from 'react-redux';
import objectPath from 'object-path';
import { Form as ANTDForm, message } from 'antd';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { autoBind } from '@sitb/wbs/autoBind';
import { lang } from '../../locale';
import { routerPath } from '../../core/router.config';
import { getActions } from '../../core/store';
import { settleDetailsColumns } from './columns';
import { permission } from '../../constants/Permissions';
import ColumnUtil from '../../utils/ColumnUtil';
import StringUtil from '../../utils/StringUtil';

@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      removeDetail: false
    };
  }

  /**
   * query
   * @param {any} params
   */
  handleSearch(params = this.props.searchParams) {
    getActions().settleDetails.startQuery(params);
    console.log('submit', params);
  }

  /**
   * 移除明细
   * @param record
   */
  handleRemoveDetail(record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    // 单条
    if (record.record.status === 'SUCCESS') {
      message.warning('该状态不能进行该操作!');
      return;
    }
    // list
    if (StringUtil.someSuccess(record.selectedRows)) {
      message.warning('该状态不能进行该操作!');
      return;
    }

    // 获取多选明细id
    let settleIds: any = ColumnUtil.filterSelectRows(record.selectedRows);
    getActions().settleDetails.startRemoveDetail(settleIds);
    this.popSwitch('removeDetail', false);
    console.log('removeDetail', settleIds);
  }

  /**
   * pop弹框
   * @param key
   * @param status
   */
  popSwitch(key, status) {
    this.setState({[key]: status});
  }

  /**
   * 提交出款
   * @param record  当前行数据
   */
  buttonGroupsConfig(record) {
    const {removeDetail} = this.state;
    // 根据长度判断按钮状态
    const selectedRowLength = objectPath.get(record, 'selectedRows.length');
    const buttonDisabled = selectedRowLength > 0;
    return [[{
      func: 'edit',
      pop: {
        title: lang.settleDetails.removeDetail,
        visible: removeDetail,
        onConfirm: () => this.handleRemoveDetail(record),
        onCancel: () => this.popSwitch('removeDetail', false)
      },
      children: lang.settleDetails.removeDetail,
      disabled: !buttonDisabled,
      onClick: () => this.popSwitch('removeDetail', true),
      permission: permission.settleTradeDetail.removeDetail
    }]]
  }

  render() {
    const {processing, page, form, searchParams} = this.props;
    return (
      <QueryContainer columns={settleDetailsColumns}
                      loading={processing}
                      ANTDForm={form}
                      buttonGroups={record => this.buttonGroupsConfig(record)}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      dataGridOther={{
                        rowSelectType: 'checkbox'
                      }}
                      searchParams={searchParams}
                      onSearch={this.handleSearch}
                      addUri={routerPath.settleTaskCreate}
      />
    );
  }
}

export const SettleDetails = connect(({settleDetails}) => ({
  processing: settleDetails.processing,
  searchParams: settleDetails.searchParams,
  page: settleDetails.page
}))(ANTDForm.create()(Component));
