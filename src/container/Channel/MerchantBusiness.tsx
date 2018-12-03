/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/30
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';

import { getActions } from '../../core/store';
import { objectPathGet } from '../../component/Tool/GridInfoUtil';
import CardGridView from '../../component/Card/CardGridView';

import { routerPath } from '../../core/router.config';
import { businessColumn } from '../../constants/ColumnsBusiness';
import { permission } from '../../constants/Permissions';
import { merchantBusinessShow } from './expandedRow';
import { lang } from '../../locale';
import { QueryContainer } from '../../component/QueryContainer';
import ColumnUtil from '../../utils/ColumnUtil';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import {Form as ANTDForm} from "antd";

// 深拷贝columns
const merchantBusinessColumn = businessColumn.slice(0);


@autoBind
class Component extends React.Component<any, any> {

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
    getActions().channelMerchantBusiness.startQuery({
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
    const newParams = Object.assign({}, record, {
      businessType: record.businessType,
      merchantId: params.id,
      enabled: !record.enabled
    });
    getActions().channelMerchantBusiness.startStatus(newParams);
    console.log('change status=>', newParams);
  }

  /**
   * 生成按钮扩展配置
   * @param record  当前行数据
   */
  buttonGroupsConfig(record) {
    return [{
      func: 'eye',
      pop: {
        title: '确认要修改业务状态？'
      },
      onClick: () => this.onStatus(record),
      children: '更改业务状态',
      disabled: record == null,
      permission: permission.channelMerchantBusiness.modifyStatus
    }]
  }

  render() {
    const {params, page, searchParams, loading, form} = this.props;
    // 传递 merchantId
    let additionalParams = params && {
      merchantId: params.id
    } || {};
    return (
      <React.Fragment>
        <CardGridView params={params}
                      config={merchantBusinessShow}
                      icon={{type: 'global'}}
                      title={`${lang.channelMerchant.title}: ${objectPathGet(params, 'merchantNo')}-${objectPathGet(params, 'merchantName')}`}
        />
        <QueryContainer buttonGroups={record => this.buttonGroupsConfig(record)}
                        page={page}
                        ANTDForm={form}
                        dataGridOther={{pagination: undefined}}
                        loading={loading}
                        params={additionalParams}
                        searchParams={searchParams}
                        title={() => (<TotalUtil total={page.content.length}/>)}
                        columns={ColumnUtil.adjustRender(merchantBusinessColumn || [])}
                        addUri={routerPath.channelMerchantBusinessCreate}
                        editUri={routerPath.channelMerchantBusinessCreate}
                        addPermission={permission.channelMerchantBusiness.create}
                        editPermission={permission.channelMerchantBusiness.update}
        />
      </React.Fragment>
    )
  }
}

export const ChannelMerchantBusiness = connect(({channelMerchantBusiness}) => ({
  loading: channelMerchantBusiness.processing,
  searchParams: channelMerchantBusiness.searchParams,
  page: channelMerchantBusiness.page
}))(ANTDForm.create()(Component));
