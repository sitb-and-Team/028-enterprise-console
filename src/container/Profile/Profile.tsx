/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/3
 */
import * as React from 'react';
import { connect } from 'react-redux';
import {Avatar, Card, Form as ANTDForm, Icon, message, Row} from 'antd';
import { autoBind } from '@sitb/wbs/autoBind';
import { Button } from '@sitb/wbs/Button';
import hasPermission from '@sitb/wbs/utils/hasPermission';

import { activeUser } from '../Application/Header';
import { PopInput } from '../../component/Popover/PopInput';

import { lang } from '../../locale';
import { permission } from '../../constants/Permissions';
import { getActions } from '../../core/store';
import { getAgencyId } from '../../core/SessionServices';
import { filterValue } from '../../component/Tool/GridInfoUtil';


@autoBind
class Component extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      publicKey: ''
    };
  }

  /**
   * 保存机构密钥
   * @param e
   */
  handleKeyChange(e) {
    let publicKey = e.target.value;
    console.log(publicKey);
    this.setState({publicKey});
  }

  /**
   * 上传机构密钥
   */
  handleUpdateKey() {
    const {publicKey} = this.state;
    if (!publicKey) {
      message.warning(lang.formErrorMessage(lang.agency.updateKey));
    }
    let payload = {
      publicKey,
      agencyId: getAgencyId()
    };
    getActions().profile.updateAgencyKey(payload);
    console.log('update key =>', payload);
  }

  render() {
    const {publicKey} = this.state;
    const {processing} = this.props;
    console.log(activeUser);

    // 上传机构密钥按钮配置
    const buttonProps: any = {
      func: 'check-circle',
      pop: {
        title: (
          <PopInput title={lang.agency.updateKey}
                    placeholder={lang.agency.updateKey}
                    value={publicKey}
                    onChange={this.handleKeyChange}
          />
        )
      },
      children: lang.agency.updateKey,
      onClick: this.handleUpdateKey,
      loading: processing,
      permission: permission.merchant.update
    };

    return (
      <Card>
        <Row type="flex"
             align="middle"
             justify="center"
             style={{
               flexDirection: 'column'
             }}
        >
          <Avatar style={{
            marginBottom: 10,
            backgroundColor: '#87d068'
          }}
                  icon="user"
                  size={100}
          />
          <p>{`${activeUser.agency.code}-${activeUser.agency.name}`}</p>
          <p>
            <Icon type="environment"
                  theme="outlined"
            />
            {filterValue({
              value: [
                'address.city',
                'address.county',
                'address.province',
                'address.street'
              ]
            }, activeUser)}</p>
        </Row>
        {
          hasPermission(permission.systemAgency.updatePublicKey) && (
            <Button {...buttonProps}/>
          )
        }
      </Card>
    )
  }
}

export const Profile = connect(({profile}) => ({
  processing: profile.processing
}))(ANTDForm.create()(Component));
