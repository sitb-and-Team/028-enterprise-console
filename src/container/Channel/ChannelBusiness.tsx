/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/14
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';

import { routerPath } from '../../core/router.config';
import { getActions } from '../../core/store';
import ColumnUtil from '../../utils/ColumnUtil';
import { lang } from '../../locale';
import { channelBusinessSearch } from './fields';
import { businessColumn } from '../../constants/ColumnsBusiness';
import FieldUtil from '../../utils/FieldUtil';
import { permission } from '../../constants/Permissions';
import ObjectUtil from '../../utils/ObjectUtil';
import {Form as ANTDForm} from "antd";


@autoBind
class Component extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      record: null,
      /**
       * 通道代码
       */
      channelFlag: ''
    };
  }

  onRowSelect(record) {
    this.setState({record});
  }

  /**
   * 搜索方法
   * @param {any} params
   */
  handleSearch(params = this.props.searchParams) {
    // 每次搜索，存储最新的channelFlag
    this.setState({
      channelFlag: params.channelFlag
    });
    getActions().channelBusiness.startQuery(params);
    console.log('search =>', params);
  }

  /**
   * create update
   * @param isUpdate 编辑字段
   */
  handleUpdate(isUpdate) {
    const {record, channelFlag} = this.state;
    // 默认新增
    let params = {
      isAdd: true
    };
    let routeName = routerPath.channelBusinessCreate;
    if (isUpdate) {
      // 编辑传递原params record update
      params = {
        ...record,
        channelFlag,
        isUpdate
      };
      routeName = routerPath.channelBusinessUpdate;
    }
    getActions().navigator.navigate({
      routeName,
      params
    });
  }

  /**
   * 修改状态
   */
  handleStatus() {
    const {record, channelFlag} = this.state;
    // 深拷贝
    const newRecord = ObjectUtil.clone(record);
    // 当前数据id 通道代码 更改状态
    const newParams = {
      businessType: record.businessType,
      channelFlag: channelFlag,
      enabled: !newRecord.enabled
    };
    getActions().channelBusiness.startStatus(newParams);
    console.log('change status=>', record, newParams);
  }

  render() {
    const {processing, page, searchParams, form} = this.props;
    const buttonConfig: any = [{
      func: 'edit',
      pop: {
        title: lang.evalState
      },
      children: lang.evalState,
      disabled: this.state.record === null,
      onClick: this.handleStatus,
      permission: permission.channelsBusiness.modifyStatus
    }];
    return (
      <QueryContainer loading={processing}
                      title={() => (<TotalUtil total={page.content.length}/>)}
                      page={page}
                      ANTDForm={form}
                      searchParams={searchParams}
                      buttonGroups={buttonConfig}
                      columns={ColumnUtil.adjustRender(businessColumn)}
                      fieldGroups={FieldUtil.adjustRender(channelBusinessSearch)}
                      onSearch={this.handleSearch}
                      onRowSelect={this.onRowSelect}
                      onAdd={() => this.handleUpdate(false)}
                      onEdit={() => this.handleUpdate(true)}
                      addPermission={permission.channelsBusiness.create}
                      editPermission={permission.channelsBusiness.update}
                      delPermission={{}}
      />
    )
  }
}

export const ChannelBusiness = connect(({channelBusiness}) => ({
  processing: channelBusiness.processing,
  searchParams: channelBusiness.searchParams,
  page: channelBusiness.page
}))(ANTDForm.create()(Component));
