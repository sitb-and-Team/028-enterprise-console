/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/4
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { Form as ANTDForm, message, Transfer } from 'antd';
import { getActions } from '../../core/store';
import { lang } from '../../locale';
import { SystemPlatformOptions } from '../../constants/selectObj/SystemPlatform';
import { Form } from '../../component/Form/Form';
import { getAgency, getAgencyRules } from '../../core/SessionServices';

@connect(({systemRole, session}) => ({
  loading: systemRole.processing,
  searchParams: systemRole.searchParams,
  page: systemRole.page,
  selectResource: session.selectResource
}))
@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    const {params} = this.props;
    const permissionKeys: any = [];
    let rules: any = [];
    if (params && params.id) {
      // get rules
      rules = params.platform && this.handlePlatformChange(params.platform);
      // 生成列表的key格式
      params.rules.forEach(rule => {
        const {permissions} = rule;
        permissions.forEach(permission => {
          permissionKeys.push(`${permission.resource.id}|${permission.id}`);
        });
      });
    }
    this.state = {
      permissionKeys,
      rules
    };
  }

  componentWillMount() {
    const {params} = this.props;
    // 创建页面刷新回调
    if (!params) {
      getActions().navigator.back();
    }
  }

  /**
   * 资源平台change
   * @param type
   */
  handlePlatformChange(type) {
    const agency = getAgency();
    const platForm = agency && agency.roles[0].platform;
    let rules = [];
    if (type === platForm) {
      rules = getAgencyRules();
    }

    if (this.state) {
      this.setState({
        rules
      });
    }
    return rules;
  }

  /**
   * 把相同resourceId 合并
   * @param id      resourceId
   * @returns {{}}
   */
  filterResourceId(id: any) {
    const {permissionKeys} = this.state;
    const permissions: any = [];
    // 循环遍历，合并出相同的对象
    permissionKeys.forEach((key: string) => {
      const data = key.split('|');
      const resourceId = data[0];
      const permission = data[1];
      if (resourceId === id) {
        permissions.push({
          id: permission
        })
      }
    });
    return {
      [id]: {
        resource: {id},
        permissions
      }
    };
  }

  /**
   * submit
   * @param values
   */
  handleSubmit(values) {
    const {params} = this.props;
    const {permissionKeys} = this.state;
    // 判断资源配置配置list
    if (!permissionKeys.length) {
      message.warning('请配置权限！');
      return;
    }
    // 资源临时变量
    let rulesObject: any = {};
    let rules: any = [];
    permissionKeys.forEach((key: string) => {
      // key的结构 0下标是resourceId 1是permissionId
      const data: any = key.split('|');
      const resourceId: any = data[0];
      // 没有很好的办法去相同元素，只能采取对象的方式
      rulesObject = {
        ...rulesObject,
        ...this.filterResourceId(resourceId)
      };
    });
    // 最后生成我们想要的结果
    Object.keys(rulesObject).forEach(rule => rules.push(rulesObject[rule]));
    const newValue = {
      ...params,
      ...values,
      rules
    };
    console.log('value =>', newValue);
    getActions().systemRole.startUpdate(newValue);
  }

  /**
   * 生成穿梭框data数据
   * @returns {any}
   */
  getDataSource() {
    const {rules} = this.state;
    const dataSource: any = [];
    rules.forEach(({permissions}) => {
      permissions.forEach((permission) => {
        const {resource} = permission;
        dataSource.push({
          key: `${resource.id}|${permission.id}`,
          describe: `${resource.describe} - ${permission.describe}`
        });
      });
    });
    return dataSource;
  }

  /**
   * 穿梭框change方法
   * @param permissionKeys 所选中的keys
   */
  handleChange(permissionKeys) {
    this.setState({permissionKeys});
  }

  render() {
    const {loading, params, form} = this.props;
    const {permissionKeys} = this.state;
    // 新增角色 基本表单
    const roleCreate: any = [{
      title: lang.basicInfo,
      fields: [{
        name: 'platform',
        label: lang.resource.platform,
        type: 'select',
        options: SystemPlatformOptions,
        disabled: params && params.isUpdate,
        onChange: this.handlePlatformChange
      }, {
        name: 'name',
        label: lang.role.name
      }, {
        name: 'describe',
        label: lang.describe
      }]
    }];
    let initialValue = {
      ...params
    };
    return (
      <Form loading={loading}
            onSubmit={this.handleSubmit}
            initialValue={initialValue}
            fieldGroups={roleCreate}
            form={form}
      >
        <Transfer dataSource={this.getDataSource()}
                  titles={['可配置的权限', '已拥有的权限']}
                  showSearch
                  style={{
                    marginTop: 20,
                    marginLeft: 40
                  }}
                  listStyle={{
                    width: 250,
                    height: 300,
                  }}
                  lazy
                  operations={['新增', '删除']}
                  targetKeys={permissionKeys}
                  onChange={this.handleChange}
                  render={(item: any) => `${item.describe}`}
        />
      </Form>
    )
  }
}

export const PersistSystemRole = connect(({systemRole, session}) => ({
  loading: systemRole.processing,
  searchParams: systemRole.searchParams,
  page: systemRole.page,
  selectResource: session.selectResource
}))(ANTDForm.create()(Component));
