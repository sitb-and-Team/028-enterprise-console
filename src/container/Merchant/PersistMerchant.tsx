import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { bank } from '@sitb/wbs/bank';
import objectPath from 'object-path';
import { Form as ANTDForm } from 'antd';

import { PersistContainer } from '../../component/PersistContainer';
import { Nature } from '../../constants/selectObj/Nature';
import { getActions } from '../../core/store';
import { merchantBasicUpdate, merchantCostFields, merchantCreate } from './fields';
import { AccountType } from '../../constants/AccountType';
import { SettleType } from '../../constants/selectObj/SettleType';
import MerchantUtils from './MerchantUtils';
import Common from '@sitb/wbs/constants/Common';

@(ANTDForm.create as any)()
@connect(({merchant}) => ({
  loading: merchant.processing
}))
@autoBind
export class MerchantPersist extends React.Component<any, any> {

  constructor(props) {
    super(props);
    // 获取结算账户类型
    let accountType = objectPath.get(props, 'params.settleAccount.accountType');
    // 获取扣款账户类型
    let nature = objectPath.get(props, 'params.nature');
    let isRule = !(objectPath.get(props, 'params.isUpdate'));
    this.state = {
      fieldGroups: this.judgementField(),
      nature: nature || Nature.personal,
      account: accountType || AccountType.bank,
      /**
       * 正则表达式
       */
      "legalPerson.identities[0].number": isRule,
      "legalPerson.phoneNo": isRule,
      "linkman.identities[0].number": isRule,
      "linkman.phoneNo": isRule,
      "settleAccount.bankReservedPhone": isRule
    };
  }

  componentWillMount() {
    getActions().session.getChildrenAgency();
    let newState: any = {
      account: this.state.account,
      nature: this.state.nature
    };
    this.updateFieldGroups(newState);
  }

  /**
   * 根据当前状态，创建对应表单
   * @returns {(any)[]}
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
    const {params} = this.props;
    // 默认新增表单
    let fieldGroups = merchantCreate({
      onFocus: this.handleFocusRule,
      onNatureChange: this.handleNatureChange,
      accountTypeChange: this.handleAccountTypeChange,
      legalPersonIdNoRule,
      legalPersonPhoneNoRule,
      linkmanIdNoRule,
      linkmanPhoneNoRule
    });
    // 结算表单
    if (params && params.isSettle) {
      fieldGroups = merchantCostFields({
        onFocus: this.handleFocusRule,
        accountTypeChange: this.handleAccountTypeChange,
        settleTypeBan: params.nature === Nature.personal,
        settlePhoneNoRule
      });
    }
    // 基本表单
    if (params && params.isBasic) {
      fieldGroups = merchantBasicUpdate({
        onFocus: this.handleFocusRule,
        onNatureChange: this.handleNatureChange,
        legalPersonBan: true,
        legalIdTypeBan: true,
        legalIdNoBan: true,
        legalPhoneBan: true,
        legalEmailBan: true,
        agencyIdBan: true,
        merchantSettleModeBan: true,
        legalPersonIdNoRule,
        legalPersonPhoneNoRule,
        linkmanIdNoRule,
        linkmanPhoneNoRule,
        settlePhoneNoRule
      });
    }
    return fieldGroups;
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
      console.log(key);
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
        this.handleNatureChange(nature);
      }, 100);
    }
  }

  /**
   * 更新表单
   * @param {any} nature 商户性质
   * @param {any} account 结算账户类型
   * @param {any} fieldGroups
   */
  updateFieldGroups({nature = '', account = ''}) {
    const {params} = this.props;
    const newFieldGroups = [...this.judgementField()];
    // 商户性质部分的表单change
    if (nature === Nature.personal) {
      // 新增情况下, 修改基本信息没有业务表单
      if (params && (params.isAdd || params.isBasic)) {
        // 删除联系人
        newFieldGroups.splice(2, 1);
        // 删除营业执照  证件类型
        newFieldGroups[0].fields.splice(4, 2);

        // 删除扣款结算类型，账户名称
        newFieldGroups[2].fields.splice(1, 1);
        newFieldGroups[2].fields.splice(2, 1);

        if (params && params.isAdd) {
          // 删除结算类型，账户名称
          newFieldGroups[3].fields.splice(1, 1);
          newFieldGroups[3].fields.splice(2, 1);
        }
      }
    }

    // 结算信息，结算账户类型change
    if (account === AccountType.aliPay) {
      let index: any = 4;
      // 商户性质为个人时，总体表单没有法人，下标改为2
      if (nature === Nature.personal) {
        index = 3;
      }

      // 如果是编辑结算信息的请求，下标为0
      if (params && params.isSettle) {
        index = 0;
        // 删除结算类型，账户名称，针对编辑结算信息的情况
        newFieldGroups[index].fields.splice(1, 1);
        newFieldGroups[index].fields.splice(2, 1);
      }

      // 更换企业性质时已经删除过了，但在更改账户类型的时候需要根据类型再判断删除。
      if (params && params.isAdd) {
        // 企业性质编辑结算信息的情况
        if (nature === Nature.enterprise) {
          // 删除结算类型，账户名称
          newFieldGroups[index].fields.splice(1, 1);
          newFieldGroups[index].fields.splice(2, 1);
        }
      }

      // 默认删除结算卡信息
      newFieldGroups[index].fields.splice(3, 1);
      newFieldGroups[index].fields.splice(1, 1);
    }
    this.setState({nature, account, fieldGroups: newFieldGroups});
  }

  /**
   * 商户类型
   * @param nature
   */
  handleNatureChange(nature) {
    this.updateFieldGroups({
      nature,
      account: this.state.account
    });
  }

  /**
   * 结算账户类型change
   * @param account
   */
  handleAccountTypeChange(account) {
    this.updateFieldGroups({
      nature: this.state.nature,
      account
    });
  }

  /**
   * 过滤结算账户信息
   * @param values
   * @param path
   * @returns {any}
   */
  filterAccountValue(values, path) {
    const {params} = this.props;
    // 获取账户类型
    let accountType = objectPath.get(values, `${path}.accountType`);
    // 获取机构性质
    let agencyNature = params.isSettle && params.nature || values.nature;
    // 默认获取表单name
    let name = objectPath.get(values, `${path}.name`);
    // 如果是支付宝，只有三个字段 name number accountType
    if (accountType) {
      if (accountType === AccountType.aliPay) {
        // 如果机构性质为个人，name为法人name，但这里有分两种情况，一种是只编辑结算信息（取params缓存），一种是新增的时候（取法人表单value）
        if (agencyNature === Nature.personal) {
          if (params.isSettle) {
            name = params.legalPerson.name
          } else {
            name = values.legalPerson.name;
          }
        }
        return {name};
      }
      // 默认返回全部
      return {
        bankName: bank[values[path].settleBank].name,
        bankNo: bank[values[path].settleBank].openBankCode,
        settleType: agencyNature === Nature.personal && SettleType.private || values[path].settleType,
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
      isSettle: isUpdate && params.isSettle,
      isBasic: isUpdate && params.isBasic,
      id: params && params.id || '',
      status: isUpdate && params.status || 'NORMAL',
      describe: values.describe,
      address: values.address && {
        province: values.address[0],
        city: values.address[1],
        county: values.address[2] && values.address[2] || '',
        street: values.street
      },
      businessLicense: (values.businessLicense && values.businessIdType) && {
        type: values.businessIdType,
        number: values.businessLicense
      },
      linkman: {
        ...values.legalPerson,
        ...values.linkman
      },
      settleAccount: values.settleAccount && {
        ...values.settleAccount,
        ...this.filterAccountValue(values, 'settleAccount')
      },
      feeSettleAccount: values.feeSettleAccount && {
        ...values.feeSettleAccount,
        ...this.filterAccountValue(values, 'feeSettleAccount')
      },
      businessIdType: params.businessLicense && params.businessLicense.type,
      businessTime: {
        open: values.open && moment(values.open).format(Common.TIME_FORMAT),
        close: values.close && moment(values.close).format(Common.TIME_FORMAT)
      },
      weChatPayMcc: values.weChatPayMcc && values.weChatPayMcc[values.weChatPayMcc.length - 1]
    });
    console.log('submit =>', values, newValue);
    Reflect.deleteProperty(newValue, 'settleBank');
    getActions().merchant.startPersist(newValue);
  }

  render() {
    const {fieldGroups} = this.state;
    const {params, form} = this.props;
    let initialValue = {
      ...params
    };
    // 转换默认值
    if (params && params.isUpdate) {
      initialValue = {
        ...params,
        describe: params.describe,
        agencyId: params.agency && `${params.agency.id}`,
        address: params.address && [params.address.province, params.address.city, params.address.county],
        street: params.address && params.address.street,
        open: params.businessTime && moment(params.businessTime.open),
        close: params.businessTime && moment(params.businessTime.close),
        settleAccount: {
          ...params.settleAccount,
          settleBank: Object.keys(bank).filter((value: any) => bank[value].openBankCode === params.settleAccount.bankNo),
          number: params.settleAccount.number
        },
        feeSettleAccount: {
          ...params.feeSettleAccount,
          settleBank: Object.keys(bank).filter((value: any) => bank[value].openBankCode === params.feeSettleAccount.bankNo),
          number: params.feeSettleAccount.number
        },
        weChatPayMcc: params.weChatPayMcc && MerchantUtils.mapWeChatPayMcc(params.weChatPayMcc),
        businessIdType: params.businessLicense && params.businessLicense.type,
        businessLicense: params.businessLicense && params.businessLicense.number
      }
    }
    return (
      <PersistContainer {...this.props}
                        form={form}
                        initialValue={initialValue}
                        fieldGroups={fieldGroups}
                        onSubmit={this.handleSubmit}
      />
    );
  }
}
