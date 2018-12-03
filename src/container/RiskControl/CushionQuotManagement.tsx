import * as React from 'react';
import { connect } from 'react-redux';
import {Form as ANTDForm, message} from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { routerPath } from '../../core/router.config';
import { getActions } from '../../core/store';
import { permission } from '../../constants/Permissions';
import { lang } from '../../locale';
import { CushionQuotManagementColumns } from "../RiskControl/columns";


@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      record: null
    };
  }

  /**
   * 保存当前行数据
   * @param record
   */
  onRowSelect(record) {
    this.setState({record});
  }

  /**
   * query
   * @param params
   */
  handleSearch(params) {
    getActions().cushionQuotManagement.startQuery(params);
    console.log('search -> ', params);
  }

  /**
   * DEL
   */
  handleDel() {
    console.log(this.props);
    const {record} = this.state;
    console.log(record);
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    getActions().cushionQuotManagement.startDel({paymentRouteId: record.id});
    console.log('del =>', record.id);
  }



  render() {
    const {processing, page, form} = this.props;
    return (
      <QueryContainer columns={CushionQuotManagementColumns}
                      loading={processing}
                      ANTDForm={form}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      onRowSelect={this.onRowSelect}
                      onSearch={this.handleSearch}
                      onDel={this.handleDel}
                      addUri={routerPath.cushionQuotManagementCreate}
                      editUri={routerPath.cushionQuotManagementUpdate}
                      addPermission={permission.cushionQuotManagement.create}
                      editPermission={permission.cushionQuotManagement.update}
                      delPermission={permission.cushionQuotManagement.delete}
      />
    );
  }
}
export const CushionQuotManagement = connect(({cushionQuotManagement}) => ({
  processing: cushionQuotManagement.processing,
  searchParams: cushionQuotManagement.searchParams,
  page: cushionQuotManagement.page,
}))(ANTDForm.create()(Component));
