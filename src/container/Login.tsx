/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(yyao@shangfudata.com)
 * data: 2018/6/6
 */
import '../styles/login.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Icon, Input, Layout, message, Row } from 'antd';
import { getActions } from '../core/store';
import { getAccessToken, getAgencies, getAgencyId } from '../core/SessionServices';
import { switchAgencySelect } from '../constants/renderAgencySelect';
import { autoBind } from '@sitb/wbs/autoBind';
import { errorMsg, lang } from '../locale';
import InputButton from '../component/Input/InputButton';
import URL from '../constants/URL';

const {Header, Content, Footer} = Layout;

@connect(({session, login}) => ({
  agencies: session.agencies,
  processing: login.processing,
  submitProcessing: login.submitProcessing
}))
@autoBind
export default class Login extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      /**
       * 机构代码
       */
      agencyCode: '',
      /**
       * 验证码
       */
      identifyCode: '',
      /**
       * 倒计时
       */
      countDown: 60,

      isBind: false
    };
  }

  componentWillMount() {
    const {href, origin} = location as any;
    // 退出时url会包含logout，清除掉logout
    if (href.search('logout') !== -1) {
      location.href = origin;
    }
  }

  switchBind() {
    this.setState({isBind: !this.state.isBind});
  }

  /**
   * 存储机构id
   * @param value
   */
  handleChangeAgencyId(value) {
    getActions().session.startAgencyId(value);
  }

  /**
   * 机构代码change
   * @param e
   */
  saveAgencyCode(e) {
    const agencyCode = e.target.value;
    this.setState({agencyCode});
  }

  /**
   * 验证码change
   * @param e
   */
  saveIdentifyCode(e) {
    const identifyCode = e.target.value;
    this.setState({identifyCode});
  }

  /**
   * 获取验证码
   */
  handleSend() {
    const {agencyCode} = this.state;
    if (agencyCode === '') {
      message.warn(lang.formErrorMessage(lang.agencyCode));
      return;
    }
    getActions().login.startSend(agencyCode);
    // 倒计时
    let time = setInterval(() => {
      const {processing} = this.props;
      // processing永远都为true，只有发送验证码失败才为false
      if (!processing || this.state.countDown === 0) {
        // 解除定时器，重置倒计时
        clearInterval(time);
        this.setState({
          countDown: 60
        });
      } else {
        this.setState({
          countDown: this.state.countDown - 1
        });
      }
    }, 1000);
  }

  /**
   * 绑定
   */
  handleSubmit() {
    const {identifyCode, agencyCode} = this.state;
    // 判断表单是否为空
    if (!identifyCode || !agencyCode) {
      message.warn('表单不能为空!');
      return;
    }
    let boundData = {
      checkValue: identifyCode,
      code: agencyCode
    };
    getActions().login.startBound(boundData);
  }

  render() {
    const {agencies, submitProcessing} = this.props;
    const {countDown, isBind} = this.state;
    // 默认props配置
    let agencySelectProps: any = {
      options: agencies,
      onChange: this.handleChangeAgencyId,
      value: getAgencyId()
    };
    // 绑定agency
    if (getAgencies().length === 0) {
      agencySelectProps = {
        options: [],
        placeholder: errorMsg.notAgenciesTip
      };
    }

    let content: any = null;
    // 判断是否有授权
    if (getAccessToken()) {
      content = (
        <Row type="flex"
             align="middle"
             justify="space-between"
        >
          <Col style={{flex: 1}}>
            <Button key="back"
                    onClick={this.switchBind}
            >{isBind ? '返回' : '绑定机构'}</Button>
          </Col>
          <Col>
            {`请选您要${isBind && '绑定' || '管理'}的机构`}
          </Col>
          {isBind ? (
            <Row type="flex"
                 justify="center"
                 gutter={16}
            >
              <Col>
                <Input className="col_input"
                       placeholder={lang.formErrorMessage(lang.agencyCode)}
                       prefix={<Icon type="bank" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       size="large"
                       minLength={4}
                       onChange={this.saveAgencyCode}
                />
                <InputButton processing={countDown !== 60}
                             onChange={this.saveIdentifyCode}
                             onClick={this.handleSend}
                             countDown={countDown !== 60 && countDown || lang.getCheckValue}
                />
                <Button block
                        type="primary"
                        htmlType="submit"
                        size="large"
                        disabled={submitProcessing}
                        loading={submitProcessing}
                        onClick={this.handleSubmit}
                >
                  {lang.submit}
                </Button>
              </Col>
            </Row>
          ) : switchAgencySelect(agencySelectProps)}
        </Row>
      );
    } else {
      content = (
        <Row className="textAlign">
          <a className="content-loginButton"
             href={`${URL.session}/auth-server?redirectUri=${encodeURIComponent(location.href)}&appUri=${URL.session}/access-token`}>{'立即登录'}</a>
        </Row>
      );
    }

    return (
      <Layout className="login">
        <Header className="login-header login-header_mode">
          <Row align="middle"
               type="flex"
               justify="space-around"
          >
            <Col className="header-title header-title_mode">{'收单运营服务平台'}</Col>
            <Col className="header-phone">{'平台热线: xxxxxxxxxxxx'}</Col>
          </Row>
        </Header>
        <Content className="login-content login-content_mode">
          <Col xs={15}
               sm={6}
               md={6}
               lg={6}
               xl={4}
          >
            {content}
          </Col>
        </Content>
        <Footer className="login-footer login-footer_mode">
          <p>{'© 2018'}</p>
        </Footer>
      </Layout>
    );
  }
};
