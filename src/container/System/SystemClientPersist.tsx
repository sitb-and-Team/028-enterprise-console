/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/14
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';

import { getActions } from '../../core/store';
import { PersistContainer } from '../../component/PersistContainer';
import FieldUtil from '../../utils/FieldUtil';
import { lang } from '../../locale';
import { Form as ANTDForm } from "antd";


@autoBind
class Component extends React.Component<any, any> {

  constructor(props) {
    super(props);
    getActions().systemRole.startQuery({size: 99999});
  }

  /**
   * submit方法
   * @param {any} values
   * @param {any} form
   * @param {any} isUpdate
   */
  handleSubmit(values, form, isUpdate) {
    getActions().systemClient.startUpdate(values);
    console.log('search =>', values);
  }

  render() {
    const {params, roles, form} = this.props;
    // 默认值
    let initialValue = params && {
      ...params
    };

    // 新增客户端表单
    const clientCreate = [{
      fields: [{
        name: 'roleIds',
        label: lang.role.name,
        type: 'select',
        options: roles,
        mode: 'multiple'
      }, {
        name: 'remark',
        label: lang.remark
      }]
    }];

    return (
      <PersistContainer {...this.props}
                        form={form}
                        params={initialValue}
                        fieldGroups={FieldUtil.adjustRender(clientCreate)}
                        onSubmit={this.handleSubmit}
      />
    )
  }
}

export const SystemClientPersist = connect(({systemClient, systemRole}) => ({
  loading: systemClient.processing,
  roles: systemRole.page.content
}))(ANTDForm.create()(Component));
