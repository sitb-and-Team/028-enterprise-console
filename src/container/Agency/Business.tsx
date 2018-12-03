/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/10
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { businessColumn } from '../../constants/ColumnsBusiness';
import { lang } from '../../locale';
import { permission } from '../../constants/Permissions';
import ObjectUtil from '../../utils/ObjectUtil';
import ColumnUtil from '../../utils/ColumnUtil';
import { QueryContainer } from '../../component/QueryContainer';
import { routerPath } from '../../core/router.config';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { Tabs } from "antd";
import CardGridView from "../../component/Card/CardGridView";
import { objectPathGet } from "../../component/Tool/GridInfoUtil";
import { infoConfig } from './expandedRow';

export function createTabs(Info, params, title) {
  return Info.map((item, index) => {
    return (
      <Tabs.TabPane tab={item.itemTitle}
                    key={index}
      >
        <CardGridView params={params}
                      config={item}
                      title={title}
        />
      </Tabs.TabPane>)
  });
}

// agencyBusiness表格
export const agencyBusinessColumns: any = businessColumn.slice(0);

agencyBusinessColumns.splice(7, 0, {
  title: lang.feeSplittingRate,
  dataIndex: 'feeSplittingRate',
  align: 'right'
});
@connect(({agencyBusiness}) => ({
  loading: agencyBusiness.processing,
  searchParams: agencyBusiness.searchParams,
  page: agencyBusiness.page
}))
@autoBind
export class AgencyBusiness extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
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
    getActions().agencyBusiness.startQuery({
      id: params.id,
      page: page,
      size: (global as any).pageSize
    });
  }

  /**
   * 更改状态
   */
  onStatus({record}) {
    // 深拷贝当前row，防止enabled更改了row值
    const {params} = this.props;
    const newSelectedRow = ObjectUtil.clone(record);
    const newParams = Object.assign(newSelectedRow, {
      businessType: newSelectedRow.businessType,
      agencyId: params.id,
      enabled: !newSelectedRow.enabled
    });
    getActions().agencyBusiness.startStatus(newParams);
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
      permission: permission.agencyBusiness.statusControl
    }]
  }


  render() {
    const {params, page, searchParams, loading, from} = this.props;
    // 新增业务，查询业务类型需要parent，还有机构id
    const additionalParams: any = params && {
      parent: params.parent,
      agencyId: params.id,
    } || {};
    const title = `${lang.agency.info}: ${objectPathGet(params, 'name')}`;
    return (
      <React.Fragment>
        <Tabs>
          {createTabs(infoConfig, params, title)}
        </Tabs>
        <QueryContainer buttonGroups={record => this.buttonGroupsConfig(record)}
                        title={() => (<TotalUtil total={page.content.length}/>)}
                        page={page}
                        ANTDForm={from}
                        loading={loading}
                        dataGridOther={{pagination: undefined, rowKey: 'businessType'}}
                        params={additionalParams}
                        searchParams={searchParams}
                        columns={ColumnUtil.adjustRender(agencyBusinessColumns || [])}
                        addUri={routerPath.agencyBusinessCreate}
                        editUri={routerPath.agencyBusinessUpdate}
                        addPermission={permission.agencyBusiness.create}
                        editPermission={permission.agencyBusiness.update}
        />
      </React.Fragment>
    )
  }
}
