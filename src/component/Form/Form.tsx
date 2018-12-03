/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/23
 */
import * as React from 'react';
import { autoBind } from '@sitb/wbs/autoBind';
import { Form as WBSForm, Props as WBSFormProps } from '@sitb/wbs/Form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import ObjectUtil from '../../utils/ObjectUtil';
import FieldUtil from '../../utils/FieldUtil';

export interface Props extends WBSFormProps{}

@autoBind
export class Form extends React.Component<Props, any> {
  /**
   * 处理搜索请求
   * @param value 搜索参数
   * @param form 对象
   */
  handleSubmit(value, form: WrappedFormUtils): void {
    console.log('submit value:', value);
    const {onSubmit} = this.props;
    onSubmit && onSubmit(ObjectUtil.filterObject(value), form);
  }

  handleReset(form) {
    this.setState({searchParams: {}});
    const {onReset} = this.props;
    onReset && onReset(form);
  }

  render() {
    const {
      initialValue,
      fieldGroups,
      loading,
      ...props
    } = this.props;
    const resetButton = {
      pop: {
        title: '确认要清空表单数据?',
      },
      onClick: this.handleReset,
      children: '重置'
    };
    const submitButton:any = {
      func: 'form',
      pop: {
        title: '确认要提交表单?',
      },
      onClick: this.handleSubmit,
      children: '提交'
    };
    return (
      <WBSForm {...props}
               fieldGroups={FieldUtil.adjustRender(fieldGroups)}
               initialValue={initialValue}
               onSubmit={this.handleSubmit}
               loading={loading}
               submitButton={submitButton}
               resetButton={resetButton}
      />
    );
  }
}
