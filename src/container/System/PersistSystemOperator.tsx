/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/15
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { lang } from '../../locale';
import { UserSelect } from '../../component/Tool/UserSelect';
import { RoleSelect } from '../../component/Tool/RoleSelect';
import { Form as ANTDForm } from "antd";

@autoBind
class Component extends React.Component<any, any> {
  /**
   * submit方法
   * @param {any} values
   * @param {any} form
   * @param {any} isUpdate
   */
  handleSubmit(values, form, isUpdate) {
    let newValue = {};
    Object.keys(values).forEach(key => {
      newValue[key] = values[key];
      // 如果为roleIds，值为数组字符串
      if (key === 'roleIds') {
        newValue[key] = [`${values[key]}`];
      }
    });
    getActions().systemOperator.startUpdate(newValue);
    console.log('search =>', newValue);
  }

  render() {
    const {params, form, ...other} = this.props;
    // 新增操作员表单
    const systemOperatorCreate = [{
      fields: [{
        name: 'name',
        label: lang.systemOperator.name
      }, {
        name: 'userId',
        label: lang.systemOperator.userId,
        render: () => <UserSelect/>
      }, {
        name: 'roleIds',
        label: lang.systemOperator.toRoles,
        render: () => <RoleSelect/>
      }, {
        name: 'remark',
        label: lang.remark
      }]
    }];
    // 默认值
    let initialValue = params && {
      ...params
    };
    return (
      <PersistContainer {...other}
                        form={form}
                        params={initialValue}
                        fieldGroups={FieldUtil.adjustRender(systemOperatorCreate)}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const systemOperatorPersist = connect(({systemOperator}) => ({
  loading: systemOperator.processing,
  page: systemOperator.page
}))(ANTDForm.create()(Component));
