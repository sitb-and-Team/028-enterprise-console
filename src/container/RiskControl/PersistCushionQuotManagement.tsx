import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { cushionQuotManagementPersist } from './fields';
import { Form as ANTDForm } from "antd";
import * as moment from "moment";


@autoBind
class Component extends React.Component<any, any> {

  /**
   * submit方法
   * @param {any} values
   */
  handleSubmit(values) {
    const {params} = this.props;
    const newValue = Object.assign(values, {
      isUpdate: params.isUpdate,
      id: params.isUpdate && params.id,
      // open: values.businessTime && moment(values.businessTime[0]).format(momentCommon.DATE_FORMAT),
      // close: values.businessTime && moment(values.businessTime[1]).format(momentCommon.DATE_FORMAT)
    });
    getActions().cushionQuotManagement.startUpdate(newValue);
    console.log('submit =>', values);
  }

  render() {
    const {params, processing, match, form} = this.props;
    // 默认值
    console.log(params);
    console.log(11111111);
    let initialValue = (params && params.isUpdate) && {
      ...params,
      open: params.businessTime.open && moment(params.businessTime.open),
      close: params.businessTime.open && moment(params.businessTime.close)
    } || {};
    return (
      <PersistContainer form={form}
                        match={match}
                        params={params}
                        loading={processing}
                        initialValue={initialValue}
                        fieldGroups={FieldUtil.adjustRender(cushionQuotManagementPersist)}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const PersistCushionQuotManagement = connect(({cushionQuotManagement}) => ({
  processing: cushionQuotManagement.processing,
  page: cushionQuotManagement.page
}))(ANTDForm.create()(Component));
