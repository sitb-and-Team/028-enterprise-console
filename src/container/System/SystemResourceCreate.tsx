/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/31
 */
import * as React from 'react';
import { connect } from 'react-redux';
import objectPath from 'object-path';
import {Button, Form as ANTDForm, Icon, Popconfirm} from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import { resourceCreate } from './fields';
import { lang } from '../../locale';
import { resourceMethodData } from '../../constants/objectKey';
import { CustomForm } from '../../component/Form/CustomForm';


@autoBind
class Component extends React.Component<any> {
  fields(permissions: any = {}, index, onAdd, onDel) {
    return [{
      name: `permissions[${index}].uri`,
      label: lang.resource.uri,
      index
    }, {
      name: `permissions[${index}].method`,
      label: lang.resource.method,
      index,
      type: 'select',
      options: resourceMethodData,
      decoratorOptions: {
        initialValue: permissions.method
      }
    }, {
      name: `permissions[${index}].describe`,
      label: lang.describe,
      index,
      decoratorOptions: {
        initialValue: permissions.describe
      }
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

  handleSubmit(values) {
    const {params} = this.props;
    const newValue = {
      ...params,
      ...values,
      permissions: values.permissions && values.permissions.filter(value => value)
    };
    getActions().systemResource.startUpdate(newValue);
    console.log('value =>', values, newValue);
  }

  render() {
    const {loading, params, form} = this.props;
    const permissionsUUid = objectPath.get(params, 'permissions');
    return (
      <CustomForm loading={loading}
                  onSubmit={this.handleSubmit}
                  params={params}
                  form={form}
                  basicForm={resourceCreate}
                  fieldTemplate={this.fields}
                  fieldsValue={permissionsUUid && permissionsUUid}
      />
    )
  }
}

export const SystemResourceCreate = connect(({systemResource}) => ({
  loading: systemResource.processing,
  searchParams: systemResource.searchParams,
  page: systemResource.page
}))(ANTDForm.create()(Component));
