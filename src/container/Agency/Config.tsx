/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */
import * as React from 'react';
import { connect } from 'react-redux';
import {Card, Form as ANTDForm, message} from 'antd';
import { Form } from '../../component/Form/Form';
import { autoBind } from '@sitb/wbs/autoBind';

import FieldUtil from '../../utils/FieldUtil';
import { agencyConfigFields } from './fields';
import { getActions } from '../../core/store';
import { lang } from '../../locale';
import { AgencySelect } from '../../component/Tool/AgencySelect';
import hasPermission from '@sitb/wbs/utils/hasPermission';
import { permission } from '../../constants/Permissions';

export interface State {
  agencyId: string;
}


@autoBind
class Component extends React.Component<any, State> {
  constructor(props, content) {
    super(props, content);
    this.state = {
      /**
       * 机构id
       */
      agencyId: ''
    };
  }

  componentWillMount() {
    // 获取机构信息
    getActions().agency.startQuery();
  }

  handleAgencyId(agencyId) {
    this.handleSearch(agencyId);
    this.setState({agencyId});
    console.log('save channelFlag=>', agencyId);
  }

  /**
   * 搜索
   * @param {any} agencyId
   */
  handleSearch(agencyId) {
    getActions().agencyConfig.startQuery({agencyId});
  }

  /**
   * 表单提交事件
   * @param value
   */
  handleSubmit(value) {
    // 判断是否有修改权限
    if (!hasPermission(permission.agencyConfig.create)) {
      message.warning(lang.notRule);
      return;
    }
    const {agencyId} = this.state;
    if (agencyId === '') {
      message.warning(lang.formErrorMessage(lang.agency.id));
      return;
    }
    const newParams = Object.assign(value, {agencyId});
    console.log('submit', newParams, agencyId);
    getActions().agencyConfig.startUpdate(newParams);
  };

  render() {
    const {processing, page: {content}, form} = this.props;
    let newContent: any = content;
    // 优化填值
    if (processing) {
      newContent = [];
    } else if (!content.length) {
      newContent = content;
    }
    return (
      <React.Fragment>
        <Card>
          {`${lang.agency.id}: `}
          <AgencySelect style={{width: 200}}
                        onChange={this.handleAgencyId}
                        value={this.state.agencyId}
          />
        </Card>
        <Form loading={processing}
              form={form}
              onSubmit={this.handleSubmit}
              initialValue={newContent}
              fieldGroups={FieldUtil.adjustRender(agencyConfigFields)}
        />
      </React.Fragment>
    );
  }
}

export const AgencyConfig = connect(({agencyConfig}) => ({
  page: agencyConfig.page,
  processing: agencyConfig.processing,
  searchParams: agencyConfig.searchParams
}))(ANTDForm.create()(Component));
