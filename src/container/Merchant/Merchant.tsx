import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { Form as ANTDForm, Input, message, Modal } from 'antd';
import objectPath from 'object-path';

import { QueryContainer } from '../../component/QueryContainer';
import { lang } from '../../locale';
import { routerPath } from '../../core/router.config';
import FieldUtil from '../../utils/FieldUtil';
import ColumnUtil from '../../utils/ColumnUtil';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { getActions } from '../../core/store';
import { momentCommon } from '../../constants/objectKey';
import { merchantSearch } from './fields';
import { merchantColumn } from './columns';
import { Select } from '@sitb/wbs/Select';
import { MerchantStatusOptions } from '../../constants/selectObj/MerchantStatus';
import { permission } from '../../constants/Permissions';

@autoBind
export class Component extends React.Component<any, any> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      record: null,
      merchantStatus: '',
      describe: '',
      publicKeyValue: ''
    };
  }

  componentWillMount() {
    getActions().agency.startQuery();
  }

  /**
   * 存储当前行数据
   * @param record
   */
  onRowSelect(record) {
    this.setState({record});
  }

  /**
   * 跳转机构业务
   */
  handleGoToBusiness({record}) {
    getActions().navigator.navigate({
      routeName: routerPath.merchantBusiness,
      params: record
    });
    console.log('goto business', record);
  }

  /**
   * modal 开关
   * @param key
   * @param visible
   * @param records
   */
  switchVisible(key, visible, records: any = false) {
    getActions().merchant.openModal({
      key,
      visible
    });
    records && this.setState({record: records.record});
  }

  /**
   * 保存state方法
   * @param key
   * @param value
   */
  saveState(key, value) {
    this.setState({[key]: value});
  }


  /**
   * 上传公钥
   */
  handleUploadPublicKey() {
    const {record, publicKeyValue} = this.state;
    getActions().merchant.startUploadPublicKey({
      merchantId: record.id,
      publicKeyValue
    });
  }

  /**
   * query
   * @param params
   */
  handleSearch(params = this.props.searchParams) {
    // 时间处理
    let businessTime = objectPath.get(params, 'businessTime');
    params.startTime = businessTime && `${moment(businessTime[0]).format(momentCommon.DATE_FORMAT)} 00:00:00` || '';
    params.endTime = businessTime && `${moment(businessTime[1]).format(momentCommon.DATE_FORMAT)} 23:59:59` || '';
    Reflect.deleteProperty(params, 'businessTime');
    getActions().merchant.startQuery(params);
    console.log('merchant search:', params);
  }

  /**
   * 商户删除
   */
  handleDel() {
    const {record} = this.state;
    getActions().merchant.startDel({
      merchantId: record.id
    });
    console.log('merchant del =>', record);
  }

  /**
   * 重置商户状态
   */
  resetStatusValue() {
    this.saveState('merchantStatus', '');
    this.saveState('describe', '');
  }

  /**
   * 重置公钥
   */
  resetPublicKey() {
    this.saveState('publicKeyValue', '');
  }

  /**
   * 更换商户状态
   */
  handleStatus() {
    const {record, merchantStatus, describe} = this.state;
    if (!describe || !merchantStatus) {
      message.warning('修改状态或修改说明不能为空');
      return;
    }
    const newParams = {
      merchantId: record.id,
      status: merchantStatus,
      describe: describe
    };
    getActions().merchant.startStatus(newParams);
    console.log('change status=>', newParams);
  }

  /**
   * 编辑结算信息
   */
  handleUpdateSettle({record}) {
    getActions().navigator.navigate({
      routeName: routerPath.merchantUpdate,
      params: {
        ...record,
        isSettle: true,
        isExplain: true,
        isUpdate: true
      }
    });
  }

  /**
   * 编辑基本信息
   */
  handleUpdateBasic({record}) {
    getActions().navigator.navigate({
      routeName: routerPath.merchantUpdate,
      params: {
        ...record,
        isBasic: true,
        isUpdate: true
      }
    });
  }

  buttonGroupsConfig(record) {
    return [[{
      func: 'edit',
      tip: {
        title: lang.updateBasic
      },
      children: lang.updateBasic,
      disabled: record === null,
      onClick: () => this.handleUpdateBasic(record),
      permission: permission.merchant.update
    }, {
      func: 'edit',
      tip: {
        title: lang.updateSettle
      },
      children: lang.updateSettle,
      disabled: record === null,
      onClick: () => this.handleUpdateSettle(record),
      permission: permission.merchant.updateSettleAccount
    }, {
      func: 'edit',
      tip: {
        title: lang.evalState
      },
      children: lang.evalState,
      disabled: record === null,
      onClick: () => {
        this.resetStatusValue();
        this.switchVisible('statusVisible', true, record);
      },
      permission: permission.merchant.statusControl
    }], [{
      func: 'eye',
      tip: {
        title: lang.merchant.goToBusinessTitle
      },
      children: lang.merchant.goToBusinessTitle,
      disabled: record === null,
      onClick: () => this.handleGoToBusiness(record),
      permission: permission.merchantBusiness.query
    }, {
      func: 'edit',
      tip: {
        title: lang.merchant.uploadPublicKey
      },
      children: lang.merchant.uploadPublicKey,
      disabled: record === null,
      onClick: () => {
        this.switchVisible('publicKeyVisible', true);
        this.resetPublicKey();
      },
      permission: permission.merchant.updatePublicKey
    }]]
  }

  render() {
    const {statusVisible, publicKeyVisible, processing, page, form} = this.props;
    const {describe, merchantStatus, publicKeyValue} = this.state;
    return (
      <React.Fragment>
        <QueryContainer loading={processing}
                        ANTDForm={form}
                        title={() => (
                          <TotalUtil total={page.totalElements}
                                     totalAmount={page.totalAmount}
                          />)}
                        page={page}
                        buttonGroups={record => this.buttonGroupsConfig(record)}
                        columns={ColumnUtil.adjustRender(merchantColumn)}
                        fieldGroups={FieldUtil.adjustRender(merchantSearch)}
                        onSearch={this.handleSearch}
                        onDel={this.handleDel}
                        onRowSelect={this.onRowSelect}
                        addUri={routerPath.merchantCreate}
                        addPermission={permission.merchant.create}
        />
        <Modal title="修改商户状态"
               visible={statusVisible}
               confirmLoading={processing}
               maskClosable={false}
               onOk={this.handleStatus}
               onCancel={() => {
                 this.switchVisible('statusVisible', false);
                 this.resetStatusValue();
               }}
        >
          <Select options={MerchantStatusOptions}
                  onChange={status => this.saveState('merchantStatus', status)}
                  placeholder="选择更改的状态"
                  value={merchantStatus}
          />
          <br/>
          <br/>
          <Input.TextArea placeholder={lang.formErrorMessage(lang.explain)}
                          onChange={e => this.saveState('describe', e.target.value)}
                          value={describe}
          />
        </Modal>
        <Modal title={lang.merchant.uploadPublicKey}
               visible={publicKeyVisible}
               confirmLoading={processing}
               maskClosable={false}
               onOk={this.handleUploadPublicKey}
               onCancel={() => {
                 this.switchVisible('publicKeyVisible', false);
                 this.resetPublicKey()
               }}
        >
          <Input.TextArea placeholder={lang.formErrorMessage(lang.publicKey)}
                          onChange={e => this.saveState('publicKeyValue', e.target.value)}
                          value={publicKeyValue}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export const MerchantQuery = connect(({merchant}) => ({
  processing: merchant.processing,
  statusVisible: merchant.statusVisible,
  publicKeyVisible: merchant.publicKeyVisible,
  searchParams: merchant.searchParams,
  page: merchant.page
}))(ANTDForm.create()(Component));
