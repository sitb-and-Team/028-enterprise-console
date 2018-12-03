import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import objectPath from 'object-path';
import { Form as ANTDForm } from 'antd';

import { PersistContainer } from '../../component/PersistContainer';
import { agencyCreate } from './fields';
import { AccountType } from '../../constants/AccountType';
import { getActions } from '../../core/store';
import { bank } from '@sitb/wbs/bank';
import { Nature } from '../../constants/selectObj/Nature';
import { SettleType } from '../../constants/selectObj/SettleType';


/**
 * 商户信息查询
 */

@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    let isRule = !(objectPath.get(props, 'params.isUpdate'));
    this.state = {
      /**
       * 账户类型
       */
      accountType: objectPath.get(props, 'params.settleAccount.accountType') || AccountType.bank,
      /**
       * 企业性质
       */
      nature: objectPath.get(props, 'params.nature') || Nature.enterprise,
      /**
       * 默认表单
       */
      fieldGroups: this.judgementField(),
      /**
       * 正则表达式
       */
      "legalPerson.identities[0].number": isRule,
      "legalPerson.phoneNo": isRule,
      "linkman.identities[0].number": isRule,
      "linkman.phoneNo": isRule,
      "agencyPhone": isRule,
      "settleAccount.bankReservedPhone": isRule
    }
  }

  componentWillMount() {
    this.updateFieldGroups({
      nature: this.state.nature,
      accountType: this.state.accountType
    });
  }

  /**
   * 统一生成表单
   * @returns
   */
  judgementField() {
    // 默认取state状态
    let state = this.state;
    let isUpdate: any = !(objectPath.get(this.props, 'params.isUpdate'));
    let legalPersonIdNoRule = state && state['legalPerson.identities[0].number'] || isUpdate;
    let legalPersonPhoneNoRule = state && state['legalPerson.phoneNo'] || isUpdate;
    let linkmanIdNoRule = state && state['linkman.identities[0].number'] || isUpdate;
    let linkmanPhoneNoRule = state && state['linkman.phoneNo'] || isUpdate;
    let settlePhoneNoRule = state && state['settleAccount.bankReservedPhone'] || isUpdate;
    let agencyPhoneBan = state && state['agencyPhone'] || isUpdate;
    return agencyCreate({
      legalPersonIdNoRule,
      legalPersonPhoneNoRule,
      linkmanIdNoRule,
      linkmanPhoneNoRule,
      settlePhoneNoRule,
      agencyPhoneBan,
      onFocus: this.handleFocusRule,
      agencyNatureChange: this.handleAgencyNatureChange,
      accountTypeChange: this.handleAccountTypeChange,
      agencyIdBan: objectPath.get(this.props, 'params.isUpdate')
    });
  }

  /**
   * 触发时，清空表单
   * @param key  需要清空的表单key
   */
  handleFocusRule(key) {
    if (objectPath.get(this.props, 'params.isUpdate')) {
      const {accountType} = this.state;
      const {nature} = this.state;
      // 因为state取了跟key一样的name
      this.setState({[key]: true});
      // 清空当前字段表单
      this.props.form.setFieldsValue({
        [key]: ''
      });
      // 如果更新过正则状态就必须要再刷新表单了
      if (this.state[key]) {
        return;
      }
      // 延迟重新加载表单，表单已经生成，正则不会绑定状态
      setTimeout(() => {
        this.handleAccountTypeChange(accountType);
        this.handleAgencyNatureChange(nature);
      }, 100);
    }
  }

  /**
   * field判断
   * @param nature
   * @param accountType
   * @param fieldGroups
   */
  updateFieldGroups({nature = '', accountType = ''}) {
    const {params} = this.props;
    const newFieldGroups = [...this.judgementField()];
    if (nature === Nature.personal) {
      newFieldGroups.splice(2, 1);
      // 新增情况下, 修改基本信息没有业务表单
      if (params && params.isAdd || params.isUpdate) {
        newFieldGroups[0].fields.splice(3, 1);
        // 删除结算类型，账户名称
        newFieldGroups[2].fields.splice(1, 1);
        newFieldGroups[2].fields.splice(2, 1);
      }
    }

    // 结算信息，结算账户类型change
    if (accountType === AccountType.aliPay) {
      let index: any = 3;
      // 商户性质为个人时，总体表单没有法人，下标改为2
      if (nature === Nature.personal) {
        index = 2;
      }
      // 性质为企业时，删除结算类型、账户名称
      if (nature === Nature.enterprise) {
        // 删除结算类型，账户名称
        newFieldGroups[index].fields.splice(1, 1);
        newFieldGroups[index].fields.splice(2, 1);
      }

      newFieldGroups[index].fields.splice(3, 1);
      newFieldGroups[index].fields.splice(1, 1);
    }
    this.setState({nature, accountType, fieldGroups: newFieldGroups});
  }

  /**
   * 结算账户类型change
   * @param accountType
   */
  handleAccountTypeChange(accountType) {
    this.updateFieldGroups({
      nature: this.state.nature,
      accountType
    });
  }

  /**
   * 机构类型change
   * @param nature
   */
  handleAgencyNatureChange(nature) {
    this.updateFieldGroups({
      nature,
      accountType: this.state.accountType
    });
  }

  /**
   * 过滤账户类型
   * @param values object
   * @param path   路径
   * @returns {any}
   */
  filterAccountValue(values, path) {
    // 获取账户类型
    let accountType = objectPath.get(values, `${path}.accountType`);
    // 默认取表单值
    let name = objectPath.get(values, `${path}.name`);
    // 如果是支付宝，只有三个字段 name number accountType
    if (accountType) {
      if (accountType === AccountType.aliPay) {
        name = values.legalPerson.name;
        return {name};
      }
      // 默认返回全部
      return {
        bankName: bank[values[path].settleBank].name,
        bankNo: bank[values[path].settleBank].openBankCode,
        settleType: values.nature === Nature.personal && SettleType.private || values[path].settleType,
        name
      };
    }
    return '';
  }

  /**
   * submit
   * @param values
   * @param form
   * @param isUpdate
   */
  handleSubmit(values, form, isUpdate) {
    const {params} = this.props;
    const newValue = Object.assign(values, {
      isUpdate,
      id: params && params.id || '',
      address: {
        province: values.address[0],
        city: values.address[1],
        county: values.address[2] && values.address[2] || '',
        street: values.street
      },
      linkman: {
        ...values.legalPerson,
        ...values.linkman
      },
      businessLicense: values.businessLicense && {
        number: values.businessLicense
      },
      settleAccount: {
        ...values.settleAccount,
        ...this.filterAccountValue(values, 'settleAccount')
      }
    });
    console.log('submit =>', values, newValue);
    getActions().agency.startUpdate(newValue);
  }

  render() {
    const {fieldGroups, nature} = this.state;
    const {params, processing, form, ...other} = this.props;
    let initialValue = {
      ...params,
      nature
    };

    // 转换默认值
    if (params && params.isUpdate) {
      initialValue = {
        ...params,
        nature,
        parentId: `${params.parent.id}`,
        address: [params.address.province, params.address.city, params.address.county],
        street: params.address.street,
        contractExpires: params.contractExpires && moment(params.contractExpires),
        settleAccount: {
          ...params.settleAccount,
          settleBank: Object.keys(bank).filter((value: any) => bank[value].openBankCode === params.settleAccount.bankNo),
          number: params.settleAccount.number
        },
        businessLicense: params.businessLicense && params.businessLicense.number
      };
    }
    return (
      <PersistContainer {...other}
                        form={form}
                        params={params}
                        initialValue={initialValue}
                        fieldGroups={fieldGroups}
                        loading={processing}
                        onSubmit={this.handleSubmit}
      />
    );
  }
}

export const AgencyPersist = connect(({agency}) => ({
  processing: agency.processing
}))(ANTDForm.create()(Component));
