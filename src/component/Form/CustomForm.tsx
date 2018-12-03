/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/4
 */
import * as React from 'react';
import { message} from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
import { Form } from './Form';
import { Props as WBSFormProps } from '@sitb/wbs/Form';

export interface State {
  customFields: object;
  uuId: number
}

export interface Props extends WBSFormProps{
  /**
   * 编辑状态时，渲染多组表单的默认值
   */
  fieldsValue: Array<object>;
  /**
   * 渲染多组表单的模版
   * @param object 一组表单的默认值，也就是fieldsValue
   * @param index  表单下标
   * @param onAdd  add函数
   * @param onDel  del函数
   * @returns {any}
   */
  fieldTemplate: any;
  /**
   * 表单提交
   * @param value
   */
  onSubmit: (value) => void;
  /**
   * 表单loading
   */
  loading: boolean;
  /**
   * 基础表单默认值
   */
  params: object;
  /**
   * 基础表单
   */
  basicForm: (custom) => Array<any>;
}

@autoBind
export class CustomForm extends React.Component<Props, State> {
  constructor(props, content) {
    super(props, content);
    // 获取路由参数 permissions的长度
    this.state = {
      customFields: props.fieldTemplate({}, 0, this.handleAdd, this.handleDel),
      uuId: props.fieldsValue && props.fieldsValue.length || 0
    };
  }

  componentDidMount() {
    const {customFields} = this.state;
    const {fieldsValue, fieldTemplate} = this.props;
    let newFields: any = customFields;
    if (fieldsValue) {
      newFields = [];
      fieldsValue.forEach((field, index) => {
        newFields.push(...fieldTemplate(field, index, this.handleAdd, this.handleDel));
      });
      this.setState({customFields: newFields})
    }
  }

  /**
   * 新增表单组
   */
  handleAdd() {
    const {fieldTemplate} = this.props;
    // 获取当前最新的资源fields 跟下标
    let customFields: any = this.state.customFields;
    let uuId = this.state.uuId + 1;
    // 重新渲染一组新表单
    let addFields = fieldTemplate({}, uuId, this.handleAdd, this.handleDel);
    // 合并数组 并setState
    customFields = addFields.concat(customFields);
    this.setState({customFields, uuId})
  }

  /**
   * 删除 表单组
   * @param index 当前点击删除表单组的下标
   */
  handleDel(index) {
    if(index === 0) {
      message.warning('默认表单不能删除!');
      return;
    }
    // 获取最新的表单信息
    let customFields: any = this.state.customFields;
    // 过滤掉index相同的表单
    customFields = customFields.filter(values => values.index !== index);
    this.setState({customFields});
  }

  /**
   * submit 提交
   * @param values
   */
  handleSubmit(values) {
    Reflect.deleteProperty(values, 'btn');
    console.log('value =>', values);
    const {onSubmit} = this.props;
    onSubmit && onSubmit(values);
  }

  render() {
    const {loading, params, basicForm, form} = this.props;
    const {customFields} = this.state;
    return (
      <Form loading={loading}
            form={form}
            onSubmit={this.handleSubmit}
            initialValue={params}
            fieldGroups={basicForm(customFields)}
      />
    )
  }
}
