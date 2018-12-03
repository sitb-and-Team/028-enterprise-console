/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/29
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { Form as ANTDForm, message } from 'antd';
import objectPath from 'object-path';
import { QueryContainer } from '../../component/QueryContainer';
import { settleTaskSearch } from './fields';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { momentCommon } from '../../constants/objectKey';
import { settleTaskColumns } from './columns';
import { lang } from '../../locale';
import { permission } from '../../constants/Permissions';
import { routerPath } from '../../core/router.config';
import { PopInput } from "../../component/Popover/PopInput";

@autoBind
class Component extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      /**
       * 审核备注
       */
      reviewFilename: '',
      submit: false,
      del: false,
      download: false
    };
  }

  /**
   * 审核文件名change
   * @param e
   */
  handleRemarkChange(e) {
    // 获取当前value
    let reviewFilename = e.target.value;
    this.setState({reviewFilename});
  }

  /**
   * 清空文件名
   */
  resetFileName() {
    this.setState({reviewFilename: ''});
  }

  /**
   * query
   * @param params
   */
  handleSearch(params = this.props.searchParams) {
    // 支付时间
    let createTime = objectPath.get(params, 'createTime');
    params.startCreateAt = createTime && `${moment(createTime[0]).format(momentCommon.DATE_FORMAT)} 0:00:00` || '';
    params.endCreateAt = createTime && `${moment(createTime[1]).format(momentCommon.DATE_FORMAT)} 23:59:59` || '';
    Reflect.deleteProperty(params, 'createTime');

    getActions().settleTask.startQuery(params);
    console.log('search -> ', params);
  }

  /**
   * 交易下载
   */
  handleDownLoad(record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    const {reviewFilename} = this.state;
    // 校验审核文件名
    if (!reviewFilename) {
      message.warning(lang.formErrorMessage(lang.settleTask.remark));
      return;
    }
    let reviewData: any = {
      taskId: record.record.id,
      filename: reviewFilename
    };
    getActions().settleTask.startDown(reviewData);
    // 清空文件名
    this.cancelDownload();
    console.log('submit =>', reviewData);
  }

  handleFocusAction(record, target) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    const id = record.record.id;
    switch (target) {
      case 'submit':
        getActions().settleTask.startGather({id: record.record.id});
        break;
      case 'del':
        getActions().settleTask.startGather({id: record.record.id, key: 'del'});
        break;
      case 'settleDetails':
        getActions().navigator.navigate(routerPath.settleDetails);
        getActions().settleDetails.startQuery({batchNumber: id});
        break;
      case 'settleTradeDetails':
        // 跳转交易明细
        getActions().navigator.navigate({
          routeName: routerPath.settleTradeDetails,
          params: {taskId: id}
        });
        getActions().settleTradeDetails.startQuery({taskId: id});
        break;
      default:
    }
    this.popSwitch(target, false);
    console.log(record);
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
   * 下载 取消函数
   */
  cancelDownload() {
    // 清空文件名 关闭弹框
    this.resetFileName();
    this.popSwitch('download', false);
  }

  /**
   * 配置button
   * @param record  当前行数据
   */
  buttonGroupsConfig(record) {
    const {reviewFilename, submit, del, download} = this.state;
    // 获取阶段、状态
    const stage = objectPath.get(record, 'record.stage');
    const status = objectPath.get(record, 'record.status');
    // 当阶段 为初始化、 状态为成功才能进行提交
    const submitDisabled = (((stage && status) && (stage === 'INIT' && status === 'SUCCESS')));
    // 当阶段 为初始化 才能进行删除
    const delDisabled = stage && stage === 'INIT';
    return [[{
      func: 'edit',
      pop: {
        title: lang.settle.submit,
        visible: submit,
        onConfirm: () => this.handleFocusAction(submitDisabled && record, 'submit'),
        onCancel: () => this.popSwitch('submit', false)
      },
      children: lang.settle.submit,
      disabled: !submitDisabled,
      onClick: () => this.popSwitch('submit', true),
      permission: permission.settleTask.submit
    }, {
      func: 'edit',
      pop: {
        title: lang.settle.del,
        visible: del,
        onConfirm: () => this.handleFocusAction(delDisabled && record, 'del'),
        onCancel: () => this.popSwitch('del', false)
      },
      children: lang.settle.del,
      disabled: !delDisabled,
      onClick: () => this.popSwitch('del', true),
      permission: permission.settleTask.del
    }], [{
      func: 'eye-o',
      tip: {
        title: lang.settle.paymentSettleDetails
      },
      children: lang.settle.paymentSettleDetails,
      disabled: record === null,
      onClick: () => this.handleFocusAction(record, 'settleDetails'),
      permission: permission.paymentSettle.query
    }, {
      func: 'eye-o',
      tip: {
        title: lang.settle.paymentTradeDetails
      },
      children: lang.settle.paymentTradeDetails,
      disabled: record === null,
      onClick: () => this.handleFocusAction(record, 'settleTradeDetails'),
      permission: permission.settleTradeDetail.query
    }, {
      func: 'download',
      pop: {
        title: (
          <PopInput title={lang.settleTaskDown}
                    placeholder={lang.settleTask.fileName}
                    value={reviewFilename}
                    onChange={this.handleRemarkChange}
          />),
        placement: "top",
        visible: download,
        onConfirm: () => this.handleDownLoad(record),
        onCancel: this.cancelDownload
      },
      children: lang.settleTaskDown,
      disabled: !(((stage && status) && (stage === 'INIT' && status === 'SUCCESS'))),
      onClick: () => this.popSwitch('download', true),
      permission: permission.paymentSettle.download
    }]]
  }

  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer columns={settleTaskColumns}
                      loading={processing}
                      ANTDForm={form}
                      fieldGroups={settleTaskSearch}
                      buttonGroups={record => this.buttonGroupsConfig(record)}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      onSearch={this.handleSearch}
                      addUri={routerPath.settleTaskCreate}
                      addPermission={permission.settleTask.create}
      />
    );
  }
}

export const SettleTask = connect(({settleTask}) => ({
  processing: settleTask.processing,
  searchParams: settleTask.searchParams,
  page: settleTask.page
}))(ANTDForm.create()(Component));
