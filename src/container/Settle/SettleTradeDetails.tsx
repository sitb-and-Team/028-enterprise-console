/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/20
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Form as ANTDForm, message } from 'antd';
import objectPath from 'object-path';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { lang } from '../../locale';
import { routerPath } from '../../core/router.config';
import { settleTradeDetailsColumns } from './columns';
import { settleTradeDetailSearch } from './fields';
import ColumnUtil from '../../utils/ColumnUtil';
import { permission } from '../../constants/Permissions';
import { PopInput } from '../../component/Popover/PopInput';
import StringUtil from '../../utils/StringUtil';

@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      /**
       * 成功
       */
      isSuccessExplain: false,
      isSuccessAll: false,
      /**
       * 失败
       */
      isFailureExplain: false,
      isFailureAll: false,
      /**
       * 联行号
       */
      isBankNo: false,
      bankNoValue: ''
    };
  }

  componentWillMount() {
    const {params} = this.props;
    // 判断是否在当前页面刷新
    if (!params || !params.taskId) {
      getActions().navigator.navigate(routerPath.settleTask);
      return;
    }
  }

  /**
   * query
   * @param params
   */
  handleSearch(params = this.props.searchParams) {
    const {searchParams} = this.props;
    getActions().settleTradeDetails.startQuery({...searchParams, ...params});
    console.log('search -> ', {...searchParams, ...params});
  }

  popSwitch(key, status) {
    this.setState({[key]: status});
  }

  /**
   * 交易明细下载
   * @param record  当前行信息
   */
  handleDownLoad(record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    console.log('submit');
  }

  /**
   * 下载 取消函数
   */
  cancelPop(key, status) {
    // 关闭弹框
    this.popSwitch(key, status);
  }

  /**
   * 过滤除了 交易中 的状态
   * @param selectedRows
   * @returns {any}
   */
  someProcessing(selectedRows) {
    return selectedRows.some(record => record.status !== 'PROCESSING');
  }

  /**
   * 封装请求函数
   * @param {any} record        当前行数据
   * @param {any} actionType    请求类型
   * @param {any} status        回填请求状态
   * @param {any} isSelectAll   一键回填
   */
  handleGather({record, actionType = '', status = '', isSelectAll = false}) {
    // 判断是否有当前行数据
    if (!isSelectAll && !record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    // 关闭pop
    this.popSwitch(actionType, false);
    const {params: {taskId}} = this.props;
    const {bankNoValue} = this.state;
    const selectedRows = objectPath.get(record, 'selectedRows') || [];

    // 修改联行号，移除出款明细需要校验状态
    if (actionType === 'isBankNo' || actionType === 'removeTradeDetails') {
      // 获取状态，成功 执行中无法修改联行号
      const status = objectPath.get(record, 'record.status');
      if (status === 'SUCCESS' || status === 'PROCESSING') {
        message.warning('该状态不能进行该操作!');
        return;
      }
    }

    if (actionType === 'isFailureExplain' || actionType === 'isSuccessExplain') {
      // 获取状态，成功 执行中无法修改联行号
      const status = objectPath.get(record, 'record.status');
      if (status !== 'PROCESSING') {
        message.warning('该状态不能进行该操作!');
        return;
      }
    }

    // 动作为修改联行号
    if (actionType === 'isBankNo') {
      if (!bankNoValue) {
        message.warning('联行号不能为空');
        return;
      }
    }

    // 动作为移除明细
    if (actionType === 'removeTradeDetails') {
      if (record.selectedRows && StringUtil.someSuccessProcessing(record.selectedRows)) {
        message.warning('该状态不能进行该操作!');
        return;
      }
    }
    // 动作为成功 失败
    if (actionType === 'isFailureExplain' || actionType === 'isSuccessExplain') {
      if (!this.someProcessing(record.selectedRows)) {
        message.warning('该状态不能进行该操作!');
        return;
      }
    }

    // 获取多选明细id
    let ids: any = ColumnUtil.filterSelectRows(selectedRows);
    const newParams = {
      taskId,
      ids,
      status,
      isSelectAll,
      detailIds: ids,
      actionType,
      bankNoValue
    };
    getActions().settleTradeDetails.startGather(newParams);
    // 重置联行号
    this.handleSaveBankNo();
    console.log('submit', record);
  }

  /**
   * 保存联行号
   * @param e
   */
  handleSaveBankNo(e?) {
    // 获取当前value
    let bankNoValue = objectPath.get(e, 'target.value') || '';
    this.setState({bankNoValue});
  }

  /**
   * 提交出款
   * @param record  当前行数据
   */
  buttonGroupsConfig(record) {
    const {isSuccessExplain, isFailureExplain, isSuccessAll, isFailureAll, removeTradeDetails, isBankNo, bankNoValue} = this.state;
    // 获取长度,长度大于零就激活按钮
    const selectedRowLength = objectPath.get(record, 'selectedRows.length');
    const buttonDisabled = selectedRowLength > 0;
    return [{
      //   func: 'download',
      //   tip: {
      //     title: lang.settleTradeDetails.download,
      //     placement: "bottom"
      //   },
      //   children: lang.settleTradeDetails.download,
      //   disabled: !selected,
      //   onClick: () => this.handleDownLoad(record),
      //   permission: {isDefault: true}
      // }, [{
      func: 'edit',
      pop: {
        title: (
          <PopInput title={lang.settleDetails.editPaymentLineNumber}
                    value={bankNoValue}
                    onChange={this.handleSaveBankNo}
                    placeholder={lang.settleDetails.editPaymentLineNumber}
          />),
        visible: isBankNo,
        onConfirm: () => this.handleGather({record, actionType: 'isBankNo'}),
        onCancel: () => {
          this.popSwitch('isBankNo', false);
          this.handleSaveBankNo();
        }
      },
      children: lang.settleDetails.editPaymentLineNumber,
      disabled: !(selectedRowLength === 1),
      onClick: () => this.popSwitch('isBankNo', true),
      permission: permission.settleTradeDetail.editBankNo
    }, {
      func: 'edit',
      pop: {
        title: lang.settleTradeDetails.removeTradeDetails,
        visible: removeTradeDetails,
        onConfirm: () => this.handleGather({record, actionType: 'removeTradeDetails'}),
        onCancel: () => this.popSwitch('removeTradeDetails', false)
      },
      children: lang.settleTradeDetails.removeTradeDetails,
      disabled: !buttonDisabled,
      onClick: () => this.popSwitch('removeTradeDetails', true),
      permission: permission.settleTradeDetail.removeTradeDetail
    }, [{
      func: 'edit',
      pop: {
        title: lang.success,
        visible: isSuccessExplain,
        onConfirm: () => this.handleGather({
          record,
          status: 'SUCCESS',
          actionType: 'isSuccessExplain'
        }),
        onCancel: () => this.cancelPop('isSuccessExplain', false)
      },
      disabled: !buttonDisabled,
      children: lang.success,
      onClick: () => this.cancelPop('isSuccessExplain', true),
      permission: permission.settleTradeDetail.editStatus
    }, {
      func: 'edit',
      pop: {
        title: lang.failure,
        visible: isFailureExplain,
        onConfirm: () => this.handleGather({
          record,
          status: 'FAILURE',
          actionType: 'isFailureExplain'
        }),
        onCancel: () => this.cancelPop('isFailureExplain', false)
      },
      disabled: !buttonDisabled,
      children: lang.failure,
      onClick: () => this.cancelPop('isFailureExplain', true),
      permission: permission.settleTradeDetail.editStatus
    }, {
      func: 'edit',
      pop: {
        title: lang.settleTradeDetails.togetherSuccess,
        visible: isSuccessAll,
        onConfirm: () => this.handleGather({
          record,
          status: 'SUCCESS',
          actionType: 'isSuccessAll',
          isSelectAll: true
        }),
        onCancel: () => this.cancelPop('isSuccessAll', false)
      },
      disabled: false,
      children: lang.settleTradeDetails.togetherSuccess,
      onClick: () => this.cancelPop('isSuccessAll', true),
      permission: permission.settleTradeDetail.editStatus
    }, {
      func: 'edit',
      pop: {
        title: lang.settleTradeDetails.togetherFailure,
        visible: isFailureAll,
        onConfirm: () => this.handleGather({
          record,
          status: 'FAILURE',
          actionType: 'isFailureAll',
          isSelectAll: true
        }),
        onCancel: () => this.cancelPop('isFailureAll', false)
      },
      disabled: false,
      children: lang.settleTradeDetails.togetherFailure,
      onClick: () => this.cancelPop('isFailureAll', true),
      permission: permission.settleTradeDetail.editStatus
    }]]
  }

  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer columns={settleTradeDetailsColumns}
                      loading={processing}
                      ANTDForm={form}
                      fieldGroups={settleTradeDetailSearch}
                      buttonGroups={record => this.buttonGroupsConfig(record)}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      dataGridOther={{
                        rowSelectType: 'checkbox'
                      }}
                      onSearch={this.handleSearch}
                      addUri={routerPath.settleTaskCreate}
      />
    );
  }
}

export const SettleTradeDetails = connect(({settleTradeDetails}) => ({
  processing: settleTradeDetails.processing,
  searchParams: settleTradeDetails.searchParams,
  page: settleTradeDetails.page
}))(ANTDForm.create()(Component));
