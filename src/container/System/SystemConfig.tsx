import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from '../../component/Form/Form';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import hasPermission from '@sitb/wbs/utils/hasPermission';
import { permission } from '../../constants/Permissions';
import { lang } from '../../locale';
import { Form as ANTDForm, message } from 'antd';
import { systemConfigCreate } from './fields';


@autoBind
class Component extends React.Component<any> {

  componentWillMount() {
    // 获取机构信息
    getActions().systemRole.startQuery({size: 99999});
    getActions().systemConfig.query();
  }

  handleSubmit(configs) {
    // 判断是否有修改权限
    if (!hasPermission(permission.systemConfig.create)) {
      message.warning(lang.notRule);
      return;
    }
    const newConfigs = Object.keys(configs).map(id => ({id, value: configs[id].value}));
    console.log(newConfigs);
    getActions().systemConfig.create(newConfigs);
  }

  render() {
    const {processing, roles, configs, form} = this.props;
    const initialValue = {};
    configs.forEach(({id, value}) => initialValue[`${id}`] = {value});
    return (
      <Form loading={processing}
            form={form}
            onSubmit={this.handleSubmit}
            initialValue={initialValue}
            fieldGroups={systemConfigCreate({roles})}
      />
    );
  }
}

export const SystemConfig = connect(({systemConfig, systemRole}) => ({
  processing: systemConfig.processing,
  roles: systemRole.page.content,
  configs: systemConfig.configs
}))(ANTDForm.create()(Component));
