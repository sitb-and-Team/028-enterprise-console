import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';

import { getActions } from '../../core/store';
import { routerPath } from '../../core/router.config';
import { channelMerchantColumn } from './columns';
import { permission } from '../../constants/Permissions';
import { QueryContainer } from '../../component/QueryContainer';
import { channelMerchantSearch } from './fields';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import {Form as ANTDForm} from "antd";


@autoBind
class Component extends React.Component<any> {
  /**
   * 通道商户搜索
   * @param params 搜索参数
   */
  onSearch(params = this.props.searchParams) {
    getActions().channelMerchant.startQuery(params);
    console.log('search =>', params);
  }

  /**
   * 跳转到商户业务
   * @param {any} record  当前行数据
   */
  handleGoToBusiness({record}) {
    getActions().navigator.navigate({
      routeName: routerPath.channelMerchantBusiness,
      params: record
    });
    console.log('goto business', record);
  }

  /**
   * 按钮配置
   * @param record
   */
  buttonGroupsConfig(record) {
    return [{
      func: 'eye',
      tip: {
        title: '查看通道商户业务'
      },
      children: '查看详情',
      disabled: record == null,
      onClick: () => this.handleGoToBusiness(record),
      permission: permission.channelMerchantBusiness.query
    }]
  }

  render() {
    const {page, loading, searchParams, form} = this.props;
    return (
      <QueryContainer buttonGroups={record => this.buttonGroupsConfig(record)}
                      columns={channelMerchantColumn}
                      onSearch={this.onSearch}
                      ANTDForm={form}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      loading={loading}
                      searchParams={searchParams}
                      fieldGroups={channelMerchantSearch}
                      addUri={routerPath.channelMerchantCreate}
                      editUri={routerPath.channelMerchantUpdate}
                      addPermission={permission.channelMerchant.create}
                      editPermission={permission.channelMerchant.update}
      />
    )
  }
}

export const ChannelMerchant = connect(({channelMerchant}) => ({
  loading: channelMerchant.processing,
  searchParams: channelMerchant.searchParams,
  page: channelMerchant.page
}))(ANTDForm.create()(Component));
