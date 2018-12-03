/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/30
 */
import * as React from 'react';
import { connect } from 'react-redux';
import objectPath from 'object-path';
import { Button, Form as ANTDForm, Icon, Popconfirm } from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
// import { getActions } from '../../core/store';
import { paymentRouteCreate } from './fields';
import { lang } from '../../locale';
import { CustomForm } from '../../component/Form/CustomForm';
import { OperatorTypeOptions } from '../../constants/selectObj/OperatorType';
import { getActions } from '../../core/store';
import { firstMerchantMode, MerchantMode, MerchantModeOptions } from '../../constants/selectObj/MerchantMode';
import { MerchantSelectMode, MerchantSelectModeOptions } from '../../constants/selectObj/MerchantSelectMode';
import MerchantNumberSelect from '../../component/Tool/MerchantNumberSelect';
import { PaymentRouteKeyOptions } from '../../constants/selectObj/PaymentRouteKey';

// 两种表单的类型
const fieldType: any = {
  selectMode: 'selectMode',
  selectModeValue: 'selectModeValue'
};


@autoBind
class Component extends React.Component<any, any> {

  // 商户代理模式表单
  merchantModeField = ({
    name: 'merchantProxyMode',
    label: lang.merchantMode,
    type: 'select',
    options: MerchantModeOptions,
    onChange: this.merchantModeChange,
    decoratorOptions: {
      initialValue: firstMerchantMode
    }
  });
  // 商户选择表单
  merchantSelectModeField = ({
    name: 'merchantSelectMode',
    label: lang.merchantSelectMode,
    type: 'select',
    options: MerchantSelectModeOptions,
    onChange: this.merchantSelectModeChange
  });
  // 指定商户号表单
  merchantSelectValueField = ({
    name: 'merchantSelectValue',
    label: lang.paymentRoute.merchantNoSpecify,
    render: () => <MerchantNumberSelect/>
  });

  constructor(props, content) {
    super(props, content);
    // 获取默认的商户代理模式
    let merchantModeType = objectPath.get(props, 'params.merchantProxyMode') || firstMerchantMode;
    // 默认表单
    let basicForm: any = this.filterField('');
    // 商户选择表单
    if (objectPath.get(props, 'params.merchantSelectMod')) {
      basicForm = this.filterField(fieldType.selectMode);
    }
    // 指定商户号表单
    if (objectPath.get(props, 'params.merchantSelectValue')) {
      basicForm = this.filterField(fieldType.selectModeValue);
    }
    this.state = {
      basicForm: paymentRouteCreate({
        channelFlagDisabled: props.params && props.params.isUpdate,
        setMerchantFields: basicForm,
        channelFlagChange: this.handleChannelFlagSearch,
      }),
      /**
       * 商户代理模式
       */
      merchantModeType
    };
  }

  /**
   * 资源配置表单
   * @param permissions  编辑状态时填充默认值的对象
   * @param index        下标
   * @param onAdd        新增
   * @param onDel        删除
   * @returns
   */
  fields(permissions: any = {}, index, onAdd, onDel) {
    return [{
      name: `conditions[${index}].key`,
      label: lang.paymentRoute.key,
      type: 'select',
      options: PaymentRouteKeyOptions,
      index
    }, {
      name: `conditions[${index}].operator`,
      label: lang.paymentRoute.operator,
      index,
      type: 'select',
      options: OperatorTypeOptions,
      decoratorOptions: {
        initialValue: objectPath.get(permissions, 'method')
      }
    }, {
      label: lang.paymentRoute.value,
      index,
      name: `conditions[${index}].value`
    }, {
      name: `btn[${index}].button`,
      label: '',
      index,
      rules: [{
        required: false
      }],
      render: () => (
        <Button.Group>
          <Popconfirm placement="top"
                      title={"您确认要做此操作？"}
                      onConfirm={() => onDel(index)}
                      okText="确认"
                      cancelText="取消"
          >
            <Button type="primary">
              <Icon type="minus"/>删除
            </Button>
          </Popconfirm>
          <Button type="primary"
                  onClick={onAdd}
          >
            添加<Icon type="plus"/>
          </Button>
        </Button.Group>
      )
    }];
  }

  /**
   * 区分表单
   * @param type
   * @returns {any}
   */
  filterField(type) {
    let basicForm: any = [this.merchantModeField];
    switch (type) {
      // 商户选择
      case fieldType.selectMode: {
        basicForm = [this.merchantModeField, this.merchantSelectModeField];
        break;
      }
      // 指定商户id
      case fieldType.selectModeValue: {
        basicForm = [this.merchantModeField, this.merchantSelectModeField, this.merchantSelectValueField];
        break;
      }
      default:
    }
    return basicForm;
  }

  /**
   * setState
   * @param type   selectMode，selectModeValue
   * @returns {any} setState对应表单，默认返回商户代理模式表单
   */
  distinguishField(type) {
    const {params} = this.props;
    this.setState({
      basicForm: paymentRouteCreate({
        channelFlagDisabled: params.isUpdate,
        setMerchantFields: this.filterField(type),
        channelFlagChange: this.handleChannelFlagSearch
      })
    });
  }

  /**
   * 商户代理模式
   * @param merchantModeType  代理模式
   */
  merchantModeChange(merchantModeType) {
    // 存储代理模式，商户选择change需要
    this.setState({merchantModeType});
    let type: any = merchantModeType === MerchantMode.oneToMany ? fieldType.selectMode : '';
    this.distinguishField(type);
  }

  /**
   *  商户选择
   * @param merchantSelectModeType 商户选择type
   */
  merchantSelectModeChange(merchantSelectModeType) {
    let type: any = fieldType.selectMode;
    // 固定一个、负载均衡、随机状态，修改为selectModeValue表单
    if (merchantSelectModeType === MerchantSelectMode.fixed || merchantSelectModeType === MerchantSelectMode.fixedBalance || merchantSelectModeType === MerchantSelectMode.fixedRandom) {
      type = fieldType.selectModeValue;
    }
    this.distinguishField(type);
  }

  /**
   * 通道表示change
   * @param channelFlag  通道标识
   */
  handleChannelFlagSearch(channelFlag) {
    getActions().channelMerchant.startQuery({channelFlag});
    this.distinguishField('');
    // 重新渲染商户选择表单
    setTimeout(() => {
      const {merchantModeType} = this.state;
      if (merchantModeType === MerchantMode.oneToMany) {
        this.merchantSelectModeChange('');
      }
    }, 200);
  }

  /**
   * submit
   * @param values 表单值
   */
  handleSubmit(values) {
    const {params = {}} = this.props;
    const newValue = {
      id: params.id,
      isUpdate: params.isUpdate,
      ...values,
      conditions: values.conditions && values.conditions.filter(value => value)
    };
    getActions().paymentRoute.startUpdate(newValue);
    console.log('value =>', values, newValue);
  }

  render() {
    const {loading, params, form} = this.props;
    const {basicForm} = this.state;
    const permissionsUUid = objectPath.get(params, 'conditions');
    return (
      <CustomForm loading={loading}
                  onSubmit={this.handleSubmit}
                  params={params}
                  form={form}
                  basicForm={basicForm}
                  fieldTemplate={this.fields}
                  fieldsValue={permissionsUUid}
      />
    )
  }
}

export const PaymentRoutePersist = connect(({paymentRoute, channelMerchant}) => ({
  loading: paymentRoute.processing,
  searchParams: paymentRoute.searchParams,
  page: paymentRoute.page,
  operatorIndex: paymentRoute.operatorIndex,
  oneToManyMerchantSelect: channelMerchant.oneToManyMerchantSelect
}))(ANTDForm.create()(Component));
