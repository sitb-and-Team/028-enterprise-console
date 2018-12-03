import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { Select } from '@sitb/wbs/Select';
import {Form as ANTDForm, Modal} from 'antd';
import objectPath from 'object-path';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';

import { routerPath } from '../../core/router.config';
import { getActions } from '../../core/store';
import { momentCommon } from '../../constants/objectKey';
import { agencySearch } from './fields';
import FieldUtil from '../../utils/FieldUtil';
import ColumnUtil from '../../utils/ColumnUtil';
import { agencyColumn } from './columns';
import { lang } from '../../locale';
import { AgencyStatusOptions } from '../../constants/selectObj/AgencyStatus';
import { permission } from '../../constants/Permissions';



@autoBind
 class Component extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      record: null,
      status: ''
    };
  }

  /**
   * 搜索方法
   * @param {any} params
   */
  handleSearch(params = this.props.searchParams) {
    let expires = objectPath.get(params, 'expires');
    params.expiresStart = expires && `${moment(expires).format(momentCommon.DATE_FORMAT)} 00:00:00` || '';
    params.expiresEnd = expires && `${moment(expires).format(momentCommon.DATE_FORMAT)} 23:59:59` || '';
    Reflect.deleteProperty(params, 'expires');
    getActions().agency.startQuery(params);
    console.log('search =>', params);
  }

  /**
   * status 开关
   * @param visible  开关
   * @param records   当前行数据
   */
  switchStatus(visible, records: any = false) {
    getActions().agency.openModal(visible);
    records && this.setState({record: records.record});
  }

  /**
   * 存储机构状态
   * @param status
   */
  saveStatus(status) {
    console.log(status);
    this.setState({status});
  }

  /**
   * 修改机构状态
   */
  handleStatus() {
    const {record, status} = this.state;
    console.log('status', record);
    getActions().agency.startStatus({
      id: record.id,
      status
    });
  }

  /**
   * 跳转机构业务
   */
  handleGoToBusiness({record}) {
    getActions().navigator.navigate({
      routeName: routerPath.agencyBusiness,
      params: record
    });
    console.log('goto business', record);
  }

  /**
   * 按钮配置
   * @param record  组件中传递出来的record
   */
  buttonGroupsConfig(record) {
    return [{
      func: 'edit',
      tip: {
        title: lang.evalState
      },
      children: lang.evalState,
      disabled: record === null,
      onClick: () => this.switchStatus(true, record),
      permission: permission.agency.statusControl
    }, {
      func: 'eye',
      tip: {
        title: '查看通道商户业务'
      },
      children: '查看详情',
      disabled: record === null,
      onClick: () => this.handleGoToBusiness(record),
      permission: permission.agencyBusiness.query
    }]
  }

  render() {
    const {statusProcessing, searchParams, processing, page,form} = this.props;
    return (
      <React.Fragment>
        <QueryContainer loading={processing}
                        ANTDForm={form}
                        title={() => (
                          <TotalUtil total={page.totalElements}
                                     totalAmount={page.totalAmount}
                          />)}
                        page={page}
                        searchParams={searchParams}
                        buttonGroups={record => this.buttonGroupsConfig(record)}
                        columns={ColumnUtil.adjustRender(agencyColumn)}
                        fieldGroups={FieldUtil.adjustRender(agencySearch)}
                        onSearch={this.handleSearch}
                        delPermission={{}}
                        addUri={routerPath.agencyCreate}
                        editUri={routerPath.agencyUpdate}
                        addPermission={permission.agency.create}
                        editPermission={permission.agency.update}
        />
        <Modal title="修改机构状态"
               visible={statusProcessing}
               confirmLoading={processing}
               maskClosable={false}
               onOk={this.handleStatus}
               onCancel={() => this.switchStatus(false)}
        >
          <Select options={AgencyStatusOptions}
                  onChange={this.saveStatus}
                  placeholder="选择更改的状态"
          />
        </Modal>
      </React.Fragment>
    )
  }
}
export const Agency = connect(({agency}) => ({
  processing: agency.processing,
  statusProcessing: agency.statusProcessing,
  searchParams: agency.searchParams,
  page: agency.page
}))(ANTDForm.create()(Component));
