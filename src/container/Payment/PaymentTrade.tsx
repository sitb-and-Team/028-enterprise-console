import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';
import objectPath from 'object-path';

import { QueryContainer } from '../../component/QueryContainer';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { paymentTradeColumns } from './columns';
import { tradeSearch } from './fields';
import { lang } from '../../locale';
import { permission } from '../../constants/Permissions';
import { gridInfoUtil } from '../../component/Tool/GridInfoUtil';
import { tradeExpandedRowConfig } from './expandedRow';
import { routerPath } from '../../core/router.config';
import { Col, Form as ANTDForm, InputNumber, message, Row, Slider } from 'antd';
import StringUtil from '../../utils/StringUtil';


@autoBind
class Component extends React.Component<any, any> {
  // 监控模式定时器
  time: any = null;

  constructor(props, content) {
    super(props, content);
    this.state = {
      record: null,
      observedStatus: false,
      observedTime: 5,
      /**
       * 获取交易结果
       */
      getResults: false,
      /**
       * 再次发送交易通知
       */
      sendNotice: false,
      /**
       * 生成结算信息
       */
      createSettlement: false
    };
  }

  componentWillUnmount() {
    // 重置监控秒数
    this.setState({observedTime: 5});
    // 离开页面关闭监控模式
    this.handleObservedSwitch(false)
  }

  /**
   * 保存当前行数据
   * @param record  当前行数据
   */
  onRowSelect(record) {
    this.setState({record});
  }

  /**
   * query
   * @param params
   */
  handleSearch(params = this.props.searchParams) {
    // 判断 交易时间
    let tradeAt = objectPath.get(params, 'tradeAt');
    params.startTime = tradeAt && StringUtil.formatTime('start', tradeAt[0]);
    params.endTime = tradeAt && StringUtil.formatTime('end', tradeAt[1]);
    Reflect.deleteProperty(params, 'tradeAt');
    getActions().paymentTrade.startQuery(params);
    console.log('search -> ', params);
  }

  /**
   * 交易下载
   */
  handleDownLoad() {
    const {searchParams} = this.props;
    // 判断是否有缓存信息
    let startTime = objectPath.get(searchParams, 'startTime');
    let endTime = objectPath.get(searchParams, 'endTime');
    // 默认下载为当天的
    searchParams.startTime = startTime && startTime || StringUtil.formatTime();
    searchParams.endTime = endTime && endTime || StringUtil.formatTime('end');
    getActions().paymentTrade.startDown(searchParams);
  }

  /**
   * 交易操作集合
   */
  handleTradeCollection(action, record) {
    // 判断当前数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    const {id} = record.record;
    switch (action) {
      case 'getResults':
        getActions().paymentTrade.startGetResults(id);
        break;
      case 'sendNotice':
        getActions().paymentTrade.startSendNotice(id);
        break;
      case 'createSettlement':
        getActions().paymentTrade.startCreateSettle(id);
        break;
      default:
    }
    this.onPopSwitch(action, false);
    console.log(`${action} => ${id}`);
  }

  /**
   * 监控模式定时器开关
   * @param observedStatus
   */
  handleObservedSwitch(observedStatus) {
    this.setState({observedStatus});
    const {observedTime} = this.state;
    const newObservedTime = observedTime * 1000;
    if (observedStatus) {
      this.time = setInterval(() => {
        this.handleSearch();
        console.log(newObservedTime);
      }, newObservedTime);
    } else {
      clearTimeout(this.time);
    }
  }

  /**
   * 查看结算信息
   */
  handleViewSettle(record) {
    // 判断当前数据
    if (!record) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }
    const {id} = record.record;
    // 更改为直接query,再进行路由跳转
    getActions().settlePayment.startQuery({paymentRecordId: id, page: 0});
    getActions().navigator.navigate({
      routeName: routerPath.settlePayment,
      params: id
    });
    console.log('go to settle =>', id);
  }

  /**
   * 取消pop
   * @param key
   * @param status
   */
  onPopSwitch(key, status) {
    this.setState({[key]: status});
  }

  /**
   * 按钮配置
   */
  buttonGroupsConfig(record) {
    const {observedTime, observedStatus, getResults, sendNotice, createSettlement} = this.state;
    // 根据交易状态 判断是否生成结算信息
    const createSettlementStatus = objectPath.get(record, 'record.status') !== 'SUCCESS';

    // 监控模式控件块
    const actionGroupAfter = (
      <Row style={{
        marginTop: 5,
        width: 230
      }}>
        <Col span={16}>
          <Slider min={5}
                  max={20}
                  step={5}
                  disabled={observedStatus}
                  onChange={this.changeObservedTime}
                  value={typeof observedTime === 'number' ? observedTime : 0}
          />
        </Col>
        <InputNumber min={5}
                     max={20}
                     step={5}
                     disabled={observedStatus}
                     style={{
                       marginLeft: 16,
                       width: 60
                     }}
                     value={observedTime}
                     formatter={value => `${value}秒`}
                     onChange={this.changeObservedTime}
        />
      </Row>
    );
    return [[{
      func: 'edit',
      pop: {
        title: lang.payment.getResults,
        visible: getResults,
        onConfirm: () => this.handleTradeCollection('getResults', record),
        onCancel: () => this.onPopSwitch('getResults', false)
      },
      children: lang.payment.getResults,
      onClick: () => this.onPopSwitch('getResults', true),
      disabled: record == null,
      permission: permission.paymentTrade.getResult
    }, {
      func: 'edit',
      pop: {
        title: lang.payment.sendTradeInfoAgain,
        visible: sendNotice,
        onConfirm: () => this.handleTradeCollection('sendNotice', record),
        onCancel: () => this.onPopSwitch('sendNotice', false)
      },
      children: lang.payment.sendTradeInfoAgain,
      onClick: () => this.onPopSwitch('sendNotice', true),
      disabled: record == null,
      permission: permission.paymentTrade.sendNotice
    }, {
      func: 'edit',
      pop: {
        title: lang.payment.payment,
        visible: createSettlement,
        onConfirm: () => this.handleTradeCollection('createSettlement', record),
        onCancel: () => this.onPopSwitch('createSettlement', false)
      },
      children: lang.payment.payment,
      onClick: () => this.onPopSwitch('createSettlement', true),
      disabled: createSettlementStatus,
      permission: permission.paymentTrade.createSettle
    }, {
      func: 'eye-o',
      tip: {
        title: lang.payment.viewSettle
      },
      children: lang.payment.viewSettle,
      onClick: () => this.handleViewSettle(record),
      disabled: createSettlementStatus,
      permission: {isDefault: true}
    }], [{
      func: observedStatus && 'loading' || 'eye-o',
      pop: {
        title: (
          <React.Fragment>
            {lang.payment.startObserved}
            {actionGroupAfter}
          </React.Fragment>
        )
      },
      disabled: observedStatus,
      children: lang.payment.startObserved,
      onClick: () => this.handleObservedSwitch(true),
      permission: {isDefault: true}
    }, {
      func: 'stop',
      tip: {
        title: lang.payment.closeObserver
      },
      children: lang.payment.closeObserver,
      onClick: () => this.handleObservedSwitch(false),
      disabled: !observedStatus,
      permission: {isDefault: true}
    }, {
      func: 'download',
      tip: {
        title: lang.tradeDown
      },
      children: lang.tradeDown,
      onClick: this.handleDownLoad,
      permission: permission.paymentTrade.download
    }]]
  }

  /**
   * 修改监控模式
   * @param observedTime
   */
  changeObservedTime(observedTime) {
    this.setState({observedTime});
    this.handleObservedSwitch(false);
  }

  render() {
    const {processing, page, searchParams, form} = this.props;
    return (
      <QueryContainer columns={paymentTradeColumns}
                      loading={processing}
                      ANTDForm={form}
                      fieldGroups={tradeSearch}
                      buttonGroups={record => this.buttonGroupsConfig(record)}
                      expandedRowRender={data => gridInfoUtil(tradeExpandedRowConfig, data)}
                      title={() => (
                        <TotalUtil total={page.totalElements}
                                   totalAmount={page.totalAmount}
                        />)}
                      page={page}
                      searchParams={searchParams}
                      onRowSelect={this.onRowSelect}
                      onSearch={this.handleSearch}
      />
    );
  }
}

export const PaymentTrade = connect(({paymentTrade}) => ({
  processing: paymentTrade.processing,
  searchParams: paymentTrade.searchParams,
  page: paymentTrade.page
}))(ANTDForm.create()(Component));
