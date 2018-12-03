/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/18
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import objectPath from 'object-path';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import {Form as ANTDForm, message} from 'antd';

import { QueryContainer } from '../../component/QueryContainer';
import FieldUtil from '../../utils/FieldUtil';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import ColumnUtil from '../../utils/ColumnUtil';

import { settleReconciliationTaskSearch } from './fields';
import { settleReconciliationTaskColumns } from './columns';
import { momentCommon } from '../../constants/objectKey';
import { routerPath } from '../../core/router.config';
import { permission } from '../../constants/Permissions';
import { menu } from '../../locale';

@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      channelFlags: []
    };
  }

  /**
   * 搜索方法
   * @param {any} params
   */
  handleSearch(params = this.props.searchParams) {
    let paymentAt = objectPath.get(params, 'paymentAt');
    params.startTime = paymentAt && `${moment(paymentAt[0]).format(momentCommon.DATE_FORMAT)} 00:00:00` || '';
    params.endTime = paymentAt && `${moment(paymentAt[1]).format(momentCommon.DATE_FORMAT)} 23:59:59` || '';
    Reflect.deleteProperty(params, 'paymentAt');
    getActions().settleReconciliationTask.startQuery(params);
    console.log('search =>', params);
  }

  /**
   * 跳转到mistake
   */
  handleGoToMistake({record}) {
    console.log('go to mistake', record.id);
    getActions().navigator.navigate({
      routeName: routerPath.settleCheckMistake,
      params: {
        mistakeId: record.id
      }
    });
  }

  /**
   * 任务阶段
   * @param record
   * @param key
   */
  handleStageTask(record, key) {
    const {id} = record;
    const {channelFlags} = this.state;
    // 参数
    let params: any = {stageName: key};
    if (key === 'CHANNEL_COMPARE') {
      if (!channelFlags.length) {
        message.warning('生成对账任务失败，请选择通道');
        return;
      }
      // 参数修改为 通道标识
      params = {isChannel: true, channelFlags};
    }
    getActions().settleReconciliationTask.startStageTask({taskId: id, ...params});
    console.log('record:', record, 'key:', key, 'channelFlags', channelFlags);
  }

  /**
   * 通道交易 单选、全选触发的事件
   * @param channelFlags
   */
  handleSaveChannel(channelFlags) {
    this.setState({channelFlags});
    console.log('save', channelFlags);
  }

  /**
   * 按钮配置
   * @param record
   */
  buttonGroupsConfig(record) {
    return [{
      func: 'eye',
      tip: {
        title: menu.settleCheckMistake
      },
      children: menu.settleCheckMistake,
      disabled: record === null,
      onClick: () => this.handleGoToMistake(record),
      permission: permission.settleCheckMistakes.query
    }]
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
                      buttonGroups={record => this.buttonGroupsConfig(record)}
                      columns={ColumnUtil.adjustRender(settleReconciliationTaskColumns({
                        handleStageSubmit: (record, key) => this.handleStageTask(record, key),
                        handleSaveChannel: checks => this.handleSaveChannel(checks)
                      }))}
                      fieldGroups={FieldUtil.adjustRender(settleReconciliationTaskSearch)}
                      onSearch={this.handleSearch}
                      delPermission={{}}
                      editPermission={{}}
                      addPermission={permission.settleReconciliationTask.create}
                      addUri={routerPath.settleReconciliationTaskCreate}
                      editUri={routerPath.settleReconciliationTaskUpdate}
      />
    )
  }
}
export const SettleReconciliationTask = connect(({settleReconciliationTask}) => ({
  processing: settleReconciliationTask.processing,
  searchParams: settleReconciliationTask.searchParams,
  page: settleReconciliationTask.page
}))(ANTDForm.create()(Component));
