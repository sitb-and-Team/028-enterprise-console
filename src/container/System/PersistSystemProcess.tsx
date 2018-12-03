/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/15
 */
import * as React from 'react';
import { connect } from 'react-redux';
import objectPath from 'object-path';
import { Button, Form as ANTDForm, Icon, Popconfirm } from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
import { systemProcessCreate } from './fields';
import { lang } from '../../locale';
import { CustomForm } from '../../component/Form/CustomForm';
import { getActions } from '../../core/store';
import { RoleSelect } from '../../component/Tool/RoleSelect';
import { OperatorSelect } from '../../component/Tool/OperatorSelect';


@autoBind
class Component extends React.Component<any, any> {

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
      name: `chain[${index}].roleId`,
      label: lang.systemProcess.roleId,
      index,
      rules: [{
        required: false
      }],
      render: () => <RoleSelect/>
    }, {
      name: `chain[${index}].userId`,
      label: lang.systemProcess.userId,
      rules: [{
        required: false
      }],
      index,
      render: () => <OperatorSelect/>
    }, {
      label: lang.systemProcess.describe,
      index,
      name: `chain[${index}].describe`
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
   * submit
   * @param values 表单值
   */
  handleSubmit(values) {
    const {params} = this.props;
    const newValue = {
      ...params,
      ...values,
      chain: values.chain && values.chain.filter(value => value)
    };
    getActions().systemProcess.startUpdate(newValue);
    console.log('value =>', values, newValue);
  }

  render() {
    const {loading, params, form} = this.props;
    const permissionsUUid = objectPath.get(params, 'chain');
    return (
      <CustomForm loading={loading}
                  onSubmit={this.handleSubmit}
                  params={params}
                  form={form}
                  basicForm={systemProcessCreate}
                  fieldTemplate={this.fields}
                  fieldsValue={permissionsUUid}
      />
    )
  }
}

export const SystemProcessPersist = connect(({systemProcess}) => ({
  loading: systemProcess.processing,
  searchParams: systemProcess.searchParams,
  page: systemProcess.page
}))(ANTDForm.create()(Component));
