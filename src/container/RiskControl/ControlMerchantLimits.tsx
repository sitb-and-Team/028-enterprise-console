import * as React from "react";
import { connect } from 'react-redux';
import { getActions } from "../../core/store";
import { routerPath } from "../../core/router.config";
import { permission } from "../../constants/Permissions";
import { autoBind } from "@sitb/wbs/autoBind";
import { QueryContainer } from "../../component/QueryContainer";
import TotalUtil from "../../component/DataGrid/TotalUtil";
import ColumnUtil from "../../utils/ColumnUtil";
import FieldUtil from "../../utils/FieldUtil";
import { controlMerchantLimitsColumn, merchantQuotaManagementSearch } from "./fields";
import { Form as ANTDForm, message } from "antd";
import { lang } from "../../locale";

@autoBind
class Component extends React.Component<any, any> {

  /**
   * 搜索方法
   * @param {any} params
   */
  handleSearch(params = this.props.searchParams) {
    getActions().controlMerchantLimits.startQuery(params);
  }

  handleDel(record) {
    // 判断是否有当前行数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    getActions().controlMerchantLimits.startDel({paymentRouteId: record.record.id});
    console.log('del =>', record.record.id);
  }

  render() {
    const {searchParams, processing, page, form} = this.props;
    return (
      <React.Fragment>
        <QueryContainer loading={processing}
                        title={() => (
                          <TotalUtil total={page.totalElements}
                                     totalAmount={page.totalAmount}
                          />)}
                        page={page}
                        ANTDForm={form}
                        searchParams={searchParams}
                        columns={ColumnUtil.adjustRender(controlMerchantLimitsColumn)}
                        fieldGroups={FieldUtil.adjustRender(merchantQuotaManagementSearch)}
                        onSearch={this.handleSearch}
                        onDel={this.handleDel}
                        addUri={routerPath.controlMerchantLimitsCreate}
                        editUri={routerPath.controlMerchantLimitsUpdate}
                        addPermission={permission.controlMerchantLimits.create}
                        editPermission={permission.controlMerchantLimits.update}
                        delPermission={permission.controlMerchantLimits.delete}
        />
      </React.Fragment>
    )
  }
}

export const ControlMerchantLimits = connect(({controlMerchantLimits}) => ({
  processing: controlMerchantLimits.processing,
  statusProcessing: controlMerchantLimits.statusProcessing,
  searchParams: controlMerchantLimits.searchParams,
  page: controlMerchantLimits.page
}))(ANTDForm.create()(Component));
