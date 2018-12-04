/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/12
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { routerPath } from '../../core/router.config';
import { businessColumn } from '../../constants/ColumnsBusiness';
import { permission } from '../../constants/Permissions';
import ColumnUtil from '../../utils/ColumnUtil';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import ObjectUtil from '../../utils/ObjectUtil';
import objectPath from 'object-path';
import { Form as ANTDForm, message } from "antd";
import {PopInput} from "../../component/Popover/PopInput";


@autoBind
class Component extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      selectedRow: null,
      describe: ''
    };
  }

  componentWillMount() {
    const {params} = this.props;
    // 判断是否有路由参数
    if (!params) {
      getActions().navigator.navigate(routerPath.dashboard);
      return;
    }
    this.onSearch(params);

  }

  /**
   * 重置页码为0 搜索
   * @param {any} params
   * @param {any} page
   */
  onSearch(params = this.props.searchParams, page = 0) {
    getActions().merchantBusiness.startQuery({
      id: params.id,
      page: page,
      size: (global as any).pageSize
    });
  }

  /**
   * 更改状态
   */
  onStatus({record}) {
    const {params} = this.props;
    const {describe} = this.state;
    // 防止变量污染
    const newSelectedRow = ObjectUtil.clone(record);
    if (!describe) {
      message.warning('请填写修改说明');
      return;
    }
    const newParams = {
      businessType: newSelectedRow.businessType,
      merchantId: params.id,
      enabled: !newSelectedRow.enabled,
      describe: describe
    };
    getActions().merchantBusiness.startStatus(newParams);
    this.resetRemark();
    console.log('change status=>', newParams);
  }


  /**
   * 审核备注change
   * @param e
   */
  handleSaveRemark(e?) {
    // 获取当前value
    let describe = objectPath.get(e, 'target.value') || '';
    this.setState({describe});
  }


  /**
   * 清空备注
   */
  resetRemark() {
    this.setState({describe: ''});
  }

  /**
   * 生成按钮扩展配置
   * @param record  当前行数据
   */
  buttonGroupsConfig(record) {
    const {describe} = this.state;
    return [{
      func: 'eye',
      pop: {
        // title: '确认要修改业务状态？'
        title: (
          <PopInput title= '确认要修改业务状态？'
                    value={describe}
                    onChange={this.handleSaveRemark}
          />),
        onConfirm: () => this.onStatus(record),
        onCancel: () => this.resetRemark()
      },
      children: '更改业务状态',
      disabled: record == null,
      permission: permission.merchantBusiness.modifyStatus
    }]
  }


  render() {
    const {params, page, searchParams, loading, form} = this.props;

    const editParams: any = params && {
      merchantId: params.id,
      agency: params.agency
    } || {};
    return (
      <React.Fragment>
        <QueryContainer buttonGroups={record => this.buttonGroupsConfig(record)}
                        ANTDForm={form}
                        title={() => (<TotalUtil total={page.content.length}/>)}
                        page={page}
                        dataGridOther={{pagination: undefined}}
                        loading={loading}
                        params={editParams}
                        searchParams={searchParams}
                        columns={ColumnUtil.adjustRender(businessColumn.slice(0))}
                        addUri={routerPath.merchantBusinessCreate}
                        editUri={routerPath.merchantBusinessUpdate}
                        addPermission={permission.merchantBusiness.create}
                        editPermission={permission.merchantBusiness.update}
        />
      </React.Fragment>
    )
  }
}

export const MerchantBusiness = connect(({merchantBusiness}) => ({
  loading: merchantBusiness.processing,
  searchParams: merchantBusiness.searchParams,
  page: merchantBusiness.page
}))(ANTDForm.create()(Component));
