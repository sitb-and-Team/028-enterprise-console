/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/12
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import objectPath from 'object-path';
import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { merchantBusinessCostFields } from './fields';
import { businessBasic, businessRate, merchantBusinessUpdate } from '../../constants/FieldsBusiness';
import { lang } from '../../locale';
import { Form as ANTDForm, message } from 'antd';
import RateTemplateSelect from '../../component/Tool/RateTemplateSelect';
import ReviewUtils from '../../utils/ReviewUtils';
import { posTemplateFields } from '../Template/fields';
import StringUtil from '../../utils/StringUtil';

// 需要跳过，需要检查的字段
let checkKeyWordList: any = ['id', 'name'];

@autoBind
export class Component extends React.Component<any, any> {

  state: any = {
    /**
     * normal基本费率,因为初始化生成表单需要用isRequiredNormal绑定
     */
    isRequiredNormal: true
  };

  constructor(props, content) {
    super(props, content);
    this.state = {
      /**
       * 业务表单
       */
      fieldGroups: this.judgementField({}),
      /**
       * 业务类型
       */
      businessType: objectPath.get(props, 'params.businessType')
    };
    // set检查字段
    ReviewUtils.setCheckKeyWordList(checkKeyWordList);
  }

  componentWillMount() {
    const {businessType} = this.state;
    this.updateFieldGroups({
      businessType
    });
  }

  /**
   * submit方法
   * @param {any} values
   * @param {any} form
   */
  handleSubmit(values, form) {
    const {params} = this.props;
    // 编辑动作传递 isUpdate
    let newValue = Object.assign(values, {
      isUpdate: params.isUpdate,
      merchantId: params.merchantId,
      enabled:params.enabled,
    });
    // 判断费率值
    if (StringUtil.judgmentRate(newValue)) {
      message.warning(lang.minGreaterMaxMessage);
      return;
    }
    getActions().merchantBusiness.startUpdate(newValue);
    console.log('search =>', newValue);
  }

  /**
   * 使用模版change
   * @param id      当前选中的模版id
   */
  handleTemplateChange(id) {
    // 获取全部的模版
    const rateTemplates = objectPath.get(this, 'props.rateTemplate.content');

    // 对比id找到相应的模版
    let rateTemplate: any = {};
    rateTemplates.forEach(templates => {
      if (templates.id === id) {
        rateTemplate = templates
      }
    });
    // 有长度再set值
    if (Object.values(rateTemplate).length > 0) {
      // 先展开数据再遍历setValue
      ReviewUtils.generateSpreadData({filterData: rateTemplate}).forEach(item => {
        this.props.form.setFieldsValue({
          [item.value]: item.defaultValue
        });
      });
    }
  }

  /**
   * 生成表单
   * @param setFields  附加的表单
   */
  judgementField({setFields = false}) {
    const {params} = this.props;
    console.log(this.props.match.params.type);
    const urlType =this.props.match.params.type;
    const {isRequiredNormal} = this.state;
    let fieldGroups: any = [{
      title: lang.basicInfo,
      fields: [
        ...businessBasic({
          businessTypeDisabled: params && params.isUpdate,
          parentAgencyId: objectPath.get(params, 'agency.id'),
          onChange: this.businessChange
        }).slice(0)[0].fields.concat(merchantBusinessCostFields)
      ]
    }, {
      title: lang.merchant.rateTemplateTitle,
      fields: [{
        name: 'template',
        label: lang.rateTemplate.name,
        rules: [{
          required: false,
          message: lang.formErrorMessage(lang.rateTemplate.name)
        }],
        render: () => <RateTemplateSelect onChange={this.handleTemplateChange}/>
      }]
    },
      businessRate({isRequiredNormal}).slice(0)[0]
    ];
    // post类型才会有setFields
    if (setFields && Array.isArray(setFields)) {
      fieldGroups.push(...setFields.slice(0));
    }
    if (urlType === 'update'){
      fieldGroups.push(...merchantBusinessUpdate);
    }
    return fieldGroups;
  }

  /**
   * 业务类型change
   * @param businessType 当前选择type
   */
  businessChange(businessType = this.state.businessType) {
    this.updateFieldGroups({businessType});
    // 重新发起一次change，更新状态。
    setTimeout(() => {
      this.updateFieldGroups({businessType});
    }, 100)
  }

  /**
   * 当change事件时调用，根据状态更新表单
   * @param {any} businessType
   */
  updateFieldGroups({businessType = ''}) {
    // 默认
    let newFieldGroups: any = [...this.judgementField({})];
    let isRequiredNormal = true;
    // 当type为post时新增表单组
    if (businessType.search('POS') !== -1) {
      isRequiredNormal = false;
      newFieldGroups = [...this.judgementField({setFields: posTemplateFields(true)})];
      console.log(posTemplateFields(true));
    }
    this.setState({businessType, isRequiredNormal, fieldGroups: newFieldGroups});
  }

  render() {
    const {params, match, loading, form} = this.props;
    const {fieldGroups} = this.state;
    // 默认值
    let initialValue = (params && params.isUpdate) && {
      ...params,
      enabledRefund: `${params.enabledRefund}`,
      feeRefund: `${params.feeRefund}`,
      holidayEnabled: `${params.holidayEnabled}`,
      openTime: objectPath.get(params, 'businessTime.open') && moment(params.businessTime.open),
      closeTime: objectPath.get(params, 'businessTime.close') && moment(params.businessTime.close)
    };
    return (
      <PersistContainer loading={loading}
                        col={{
                          lg: 12
                        }}
                        form={form}
                        match={match}
                        params={params}
                        initialValue={initialValue}
                        fieldGroups={FieldUtil.adjustRender(fieldGroups)}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const MerchantBusinessPersist = connect(({merchantBusiness, rateTemplate}) => ({
  loading: merchantBusiness.processing,
  page: merchantBusiness.page,
  rateTemplate: rateTemplate.page
}))(ANTDForm.create()(Component));
