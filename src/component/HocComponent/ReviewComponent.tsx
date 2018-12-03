/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/21
 */
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { Card, Icon, message, Table, Timeline } from 'antd';
import { QueryContainer } from '../QueryContainer';
import ColumnUtil from '../../utils/ColumnUtil';
import TotalUtil from '../../component/DataGrid/TotalUtil';
import { lang } from '../../locale';
import { Drawer } from '../Drawer';
import { PopInput } from '../Popover/PopInput';
import ReviewUtils from '../../utils/ReviewUtils';
import GridViewUtil from '../../utils/GridViewUtil';

import { momentCommon } from '../../constants/objectKey';
import objectPath from 'object-path';
import { getActions } from '../../core/store';
import { MerchantReviewsOptions } from '../../constants/selectObj/MerchantResult';
import Common from '@sitb/wbs/constants/Common';
import { merchantExplainTitleShow, reviewShow } from '../../container/Merchant/expandedRow';
import CardGridView from '../Card/CardGridView';
import { merchantReviewSearch } from '../../container/Merchant/fields';

@connect(({systemRole, systemOperator}) => ({
  selectRole: systemRole.selectRole,
  selectOperator: systemOperator.selectOperator
}))
@autoBind
export class ReviewComponent extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    const {mappingObjectKey, mappingObjectGather, setValueKey, setValueGather, checkKeyWordList, langObject} = props;
    // set映射配置
    GridViewUtil.setGridViewConfig({
      mappingKey: mappingObjectKey,
      mappingGather: mappingObjectGather,
      valueKey: setValueKey,
      valueGather: setValueGather
    });
    // set检查list
    ReviewUtils.setCheckKeyWordList(checkKeyWordList);
    ReviewUtils.setLabelObject(langObject);
    this.state = {
      waitRecord: null,
      okRecord: null,
      /**
       * 审核备注
       */
      reviewDescribe: '',
      /**
       * 待审核状态
       */
      isWaitDrawerStatus: true,
      /**
       * 同意pop
       */
      RESOLVE: false,
      /**
       * 拒绝pop
       */
      REJECTED: false
    };
  }

  componentWillMount() {
    // query user operator
    getActions().systemRole.startQuery();
    getActions().systemOperator.startQuery();
  }

  /**
   * 审核备注change
   * @param e
   */
  handleSaveRemark(e?) {
    // 获取当前value
    let reviewDescribe = objectPath.get(e, 'target.value') || '';
    this.setState({reviewDescribe});
  }

  /**
   * 清空备注
   */
  resetRemark() {
    this.setState({reviewDescribe: ''});
  }

  /**
   * 等待审核请求
   * @param {any} params
   */
  handleSearchWait(params = this.props.waitSearchParams) {
    const {waitSearchParams} = this.props;
    const merchant = objectPath.get(params, 'merchant');
    // 搜索顺序为，搜索缓存 表单值(包含page信息) 分解的商户对象信息
    this.handleSearch({
      ...waitSearchParams,
      ...params,
      ...merchant,
      status: 'WAIT'
    }, true)
  }

  /**
   * 审核完成、失败
   * @param {any} params
   */
  handleSearchOK(params = this.props.okSearchParams) {
    const {okSearchParams} = this.props;
    const merchantBusiness = objectPath.get(params, 'merchantBusiness');
    this.handleSearch({
      ...okSearchParams,
      ...params,
      ...merchantBusiness,
      status: 'FAILURE,SUCCESS'
    });
    console.log(params, okSearchParams);
  }

  /**
   * query
   * @param params search参数
   * @param isWait
   */
  handleSearch(params, isWait = false) {
    const {startQueryWait, startQueryOk} = this.props;
    let newParams = Object.assign({}, params);
    // 获取缓存时间
    let createStartAt = objectPath.get(newParams, 'createStartAt');
    let createEndAt = objectPath.get(newParams, 'createEndAt');
    // 时间处理
    let createTime = objectPath.get(params, 'createTime');
    newParams.createStartAt = createTime && `${moment(createTime[0]).format(momentCommon.DATE_FORMAT)} 00:00:00` || createStartAt || '';
    newParams.createEndAt = createTime && `${moment(createTime[1]).format(momentCommon.DATE_FORMAT)} 23:59:59` || createEndAt || '';
    // 删除多余参数
    Reflect.deleteProperty(newParams, 'createTime');
    Reflect.deleteProperty(newParams, 'merchant');
    Reflect.deleteProperty(newParams, 'merchantBusiness');
    isWait && startQueryWait(newParams) || startQueryOk(newParams);
    console.log('search:', newParams);
  }

  /**
   * 审核提交
   * @param key     RESOLVE |REJECTED
   */
  handleSubmit(key) {
    const {reviewDescribe, waitRecord} = this.state;
    const {startCheckReview} = this.props;
    // 判断是否有当前行数据
    if (!waitRecord) {
      message.warning(lang.pleaseSelectDateTip);
      return;
    }

    // 判断是否是查看审核详情
    if (key === 'open') {
      this.setState({
        isWaitDrawerStatus: true
      });
      this.drawerSwitch(true);
      return;
    }
    // 校验审核备注
    if (!reviewDescribe) {
      message.warning(lang.formErrorMessage(lang.merchantReview.remark));
      return;
    }
    let reviewData: any = {
      merchantReviewId: waitRecord.id,
      reviewHistory: {
        user: waitRecord.reviewUser,
        result: key,
        describe: reviewDescribe
      }
    };
    startCheckReview(reviewData);
    // 清空备注 关闭pop
    this.popCancel(key, false);
    console.log('submit =>', reviewData);
  }

  /**
   * 抽屉开关
   * @param status
   */
  drawerSwitch(status) {
    const {drawerSwitch} = this.props;
    drawerSwitch(status);
    this.resetRemark();
  };

  /**
   * pop开关
   * @param key
   * @param status
   */
  popSwitch(key, status) {
    this.setState({[key]: status});
  }

  /**
   * pop取消
   * @param key
   * @param status
   */
  popCancel(key, status) {
    // 关闭pop弹框，清空备注信息
    this.popSwitch(key, status);
    this.handleSaveRemark();
  }

  // sameValue(dataB, keyA) {
  //   return dataB.same(keyB => );
  // }
  //
  // filterValue(dataA, dataB) {
  //   dataA.forEach(keyA => {
  //     if (this.sameValue(dataB, keyA)) {
  //
  //     }
  //   })
  // }

  /**
   * 生成内容
   * @param record    当前行数据
   * @param viewHistories
   * @returns {any}
   */
  renderContent(record, viewHistories = false) {
    const {before, after} = record;
    const {selectRole, selectOperator} = this.props;
    // 修改之前、之后数据
    let afterData = ReviewUtils.generateSpreadData({
      filterData: after,
      extendGridView: true
    });
    const beforeData = before && ReviewUtils.generateSpreadData({
      filterData: before,
      extendGridView: true
    }) || [];
    // 删除、新增、改变的表单列表
    const delElement = ReviewUtils.filterData(beforeData, afterData);
    const addElement = ReviewUtils.filterData(afterData, beforeData);
    const changeElement = ReviewUtils.filterData(beforeData, afterData, true);

    // 其他类型的columns
    const fieldColumns = [{
      title: lang.merchantReview.key,
      dataIndex: 'key',
      width: '30%'
    }, {
      title: lang.merchantReview.before,
      dataIndex: 'beforeValue',
      width: '30%'
    }, {
      title: lang.merchantReview.after,
      dataIndex: 'afterValue',
      width: '30%'
    }];
    // 其他类型的data数据
    let dataSource: any = [];
    let finalConfigs: any = [];
    // 默认CardGridView config配置
    let DEFAULT_CONFIG: any = ({
                                 rows = false, title, icon,
                                 params = record,
                                 isTable = false,
                                 isTimeLine = false,
                                 viewHistories = false
                               }) => ({
      config: {
        setCol: {
          lg: 8,
          md: 12,
          xl: 8,
          xs: 24
        },
        setLabelCol: 10,
        setValueCol: 14,
        rows,
      },
      title,
      icon,
      params,
      isTable,
      isTimeLine,
      viewHistories
    });

    // 存放list CardGridView config配置
    let DEFAULT_FINAL: any = [DEFAULT_CONFIG({
      rows: merchantExplainTitleShow({changeTypeDefaultValue: '新增商户'}),
      title: lang.systemProcess.describe,
      icon: {type: 'notification'}
    })];

    // push修改信息表
    finalConfigs = [...DEFAULT_FINAL, DEFAULT_CONFIG({
      title: lang.changeInfo,
      icon: {type: 'exclamation-circle'},
      isTable: true
    })];

    // 判断是否生成新增
    if (before && addElement && addElement.length !== 0) {
      dataSource = ReviewUtils.generateTableDataSource({after: addElement});
    }

    // 判断是否生成删除
    if (delElement && delElement.length !== 0) {
      dataSource = ReviewUtils.generateTableDataSource({before: delElement});
    }

    // 判断三种下标，是否生成编辑表单
    if ((addElement && delElement && changeElement.length === 0) && (addElement.length && delElement.length)) {
      const dataSourceDel = ReviewUtils.generateTableDataSource({
        before: delElement,
        after: addElement
      });
      const dataSourceAdd = ReviewUtils.generateTableDataSource({
        before: addElement,
        after: delElement,
        reverse: true
      });

      dataSource = [...dataSourceDel, ...dataSourceAdd];
    }

    // 判断三种下标，是否生成编辑表单
    if ((addElement && delElement && changeElement) && (addElement.length && delElement.length && changeElement.length)) {
      const dataSourceDel = ReviewUtils.generateTableDataSource({
        before: delElement,
        after: addElement
      });
      const dataSourceAdd = ReviewUtils.generateTableDataSource({
        before: addElement,
        after: delElement,
        reverse: true
      });

      dataSource = [...dataSourceDel, ...dataSourceAdd];

      let obj: any = {};
      dataSource = dataSource.reduce((item, next) => {
        obj[next.key] ? '' : obj[next.key] = true && item.push(next);
        return item;
      }, []);
    }
    // 审核新增
    if (!before) {
      const {beforeConfig} = this.props;
      const showArray: any = [];
      beforeConfig.forEach((item) => {
        showArray.push(DEFAULT_CONFIG({
          rows: item.config,
          title: item.title,
          icon: {type: 'exclamation-circle'},
          params: after
        }));
      });
      finalConfigs = [...DEFAULT_FINAL, ...showArray];
    }

    finalConfigs.push(DEFAULT_CONFIG({
      rows: reviewShow({
        userObject: selectOperator,
        roleObject: selectRole
      }),
      title: '审核进程',
      icon: {type: 'notification'},
      params: record,
      isTimeLine: true
    }));

    if (viewHistories) {
      finalConfigs.push(DEFAULT_CONFIG({
        rows: reviewShow({
          userObject: selectOperator,
          roleObject: selectRole
        }),
        title: '审核历史记录',
        icon: {type: 'notification'},
        params: record,
        viewHistories: true
      }));
    }

    return finalConfigs.map((config, index) => (
      <React.Fragment key={index}>
        <CardGridView params={config.params}
                      config={config.config}
                      title={config.title}
                      icon={config.icon}
        />
        {
          config.isTable && (
            <Table bordered
                   size="small"
                   pagination={false}
                   scroll={{y: 240}}
                   style={{
                     marginLeft: 24,
                     marginRight: 24
                   }}
                   dataSource={dataSource}
                   columns={fieldColumns}
            />
          )
        }
        {
          config.isTimeLine && this.renderTimeProcess(record)
        }
        {
          config.viewHistories && this.renderTimeHistories(record)
        }
      </React.Fragment>
    ));
  }

  renderTimeHistories(record) {
    const {histories} = record;
    const {selectRole, selectOperator} = this.props;
    return (
      <Timeline style={{
        marginLeft: 24,
        marginRight: 24
      }}>
        {
          histories.map((historiesItem, index) => {
            let lineProps = {};
            let content: any = '';
            let roleId = historiesItem.user.roleId && selectRole[historiesItem.user.roleId] || '';
            let userId = historiesItem.user.userId && selectOperator[historiesItem.user.userId] || '';
            if (index === 0) {
              content = (
                <React.Fragment>
                  <p>{`${roleId}-${userId}`}</p>
                  <p>{`更改说明: ${historiesItem.describe}`}</p>
                  <p>{`${moment(historiesItem.reviewAt).format(Common.DATETIME_FORMAT)}`}</p>
                </React.Fragment>
              )
            } else {
              const {result, reviewAt, describe} = historiesItem;
              content = (
                <React.Fragment>
                  <p>{`${roleId}-${userId}-${historiesItem.user.describe}`}</p>
                  <p>{`${MerchantReviewsOptions[result]}`}</p>
                  <p>{`备注: ${describe}`}</p>
                  <p>{`${moment(reviewAt).format(Common.DATETIME_FORMAT)}`}</p>
                </React.Fragment>
              )
            }
            return (
              <Timeline.Item key={index}
                             {...lineProps}
              >
                {content}
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    );
  }

  renderTimeProcess(record) {
    const {reviewProcess: {chain}, nextReviewUserIndex, currentReviewUserIndex} = record;
    const {selectRole, selectOperator} = this.props;
    let timeLineProps = {};
    if (nextReviewUserIndex !== -1) {
      timeLineProps = {
        ...timeLineProps,
        pending: "等待审核..."
      }
    }
    return (
      <Timeline style={{
        marginLeft: 24,
        marginRight: 24
      }}
                {...timeLineProps}
      >
        {
          chain.map((review, index) => {
            let lineProps: any = {
              color: 'blue'
            };

            let reviewRoleId = review.roleId && selectRole[review.roleId] || '';
            let userId = review.userId && selectOperator[review.userId] || '';
            // 根据当前审核下标，判断待审核的链条，否则都为通过的
            if (index >= currentReviewUserIndex) {
              lineProps = {
                ...lineProps,
                color: 'blue',
                dot: (
                  <Icon type="clock-circle-o" style={{fontSize: '16px'}}/>
                )
              }
            } else {
              lineProps = {
                color: 'green'
              }
            }

            return (
              <Timeline.Item key={index}
                             {...lineProps}
              >
                {`${reviewRoleId}-${userId}-${review.describe}`}
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    )
  }

  /**
   * 待审核模块扩展button配置
   * @param record
   */
  buttonGroupsConfig(record) {
    const {permission} = this.props;
    const {reviewDescribe, waitRecord, RESOLVE, REJECTED} = this.state;
    const isRecord = (waitRecord && record) === null;
    return [{
      func: 'check-circle',
      pop: {
        title: (
          <PopInput title={lang.merchantReview.agreeTitle}
                    value={reviewDescribe}
                    onChange={this.handleSaveRemark}
          />),
        visible: RESOLVE,
        placement: "bottom",
        onConfirm: () => this.handleSubmit('RESOLVE'),
        onCancel: () => this.popCancel('RESOLVE', false)
      },
      children: lang.merchantReview.agree,
      disabled: isRecord,
      onClick: () => this.popSwitch('RESOLVE', true),
      permission
    }, {
      func: 'close-circle',
      pop: {
        title: (
          <PopInput title={lang.merchantReview.refuseTitle}
                    value={reviewDescribe}
                    onChange={this.handleSaveRemark}
          />),
        visible: REJECTED,
        onConfirm: () => this.handleSubmit('REJECTED'),
        onCancel: () => this.popCancel('REJECTED', false)
      },
      children: lang.merchantReview.refuse,
      disabled: isRecord,
      onClick: () => this.popSwitch('REJECTED', true),
      permission
    }, {
      func: 'eye',
      tip: {
        title: lang.merchantReview.detailed
      },
      children: lang.merchantReview.detailed,
      disabled: isRecord,
      onClick: () => this.handleSubmit('open'),
      permission
    }]
  }

  /**
   * 点击待审核行数据，同理
   * @param waitRecord
   */
  onRowChangeWait(waitRecord) {
    this.setState({
      waitRecord,
      okRecord: null
    });
  }

  /**
   * 点击审核通过行数据，存储审核通过state，禁用待审核state
   * @param okRecord  审核通过当前行数据
   */
  onRowChangeOk(okRecord) {
    this.setState({
      okRecord,
      waitRecord: null
    });
  }

  /**
   * 审核通过、已处理开关
   */
  viewOkReviewSwitch() {
    this.drawerSwitch(true);
    this.setState({
      isWaitDrawerStatus: false
    });
  }

  /**
   * 审核通过、已处理按钮配置
   * @param record  当前行数据
   */
  okButtonGroupsConfig(record) {
    // disabled 增加两次判断，record为表格生成的当前行数据，okRecord为组件生成的点击事件
    const {okRecord} = this.state;
    return [{
      func: 'eye',
      tip: {
        title: lang.merchantReview.detailed
      },
      children: lang.merchantReview.detailed,
      disabled: (okRecord && record) === null,
      onClick: this.viewOkReviewSwitch,
      permission: {isDefault: true}
    }]
  }

  render() {
    const {okProcessing, waitProcessing, okPage, waitPage, drawerVisible, form, columns} = this.props;
    const {okRecord, waitRecord, reviewDescribe, isWaitDrawerStatus} = this.state;
    // drawer配置
    let drawerProps: any = {
      width: 1100,
      visible: drawerVisible,
      onClose: () => this.drawerSwitch(false)
    };

    if (isWaitDrawerStatus) {
      drawerProps = {
        ...drawerProps,
        submitButtonProps: {
          pop: {
            title: lang.merchantReview.agreeTitle
          },
          onClick: () => this.handleSubmit('RESOLVE'),
          children: lang.merchantReview.agree,
          loading: waitProcessing
        },
        secondButtonProps: {
          pop: {
            title: lang.merchantReview.refuseTitle,
            placement: 'topRight'
          },
          onClick: () => this.handleSubmit('REJECTED'),
          children: lang.merchantReview.refuse
        },
        footElement: (
          <PopInput value={reviewDescribe}
                    onChange={this.handleSaveRemark}
                    style={{
                      width: 300
                    }}
          />
        )
      }
    }

    return (
      <React.Fragment>
        <Card title="待审核">
          <QueryContainer loading={waitProcessing}
                          buttonGroups={record => this.buttonGroupsConfig(record)}
                          title={() => (
                            <TotalUtil total={waitPage.totalElements}
                                       totalAmount={waitPage.totalAmount}
                            />)}
                          page={waitPage}
                          ANTDForm={form}
                          columns={ColumnUtil.adjustRender(columns)}
                          fieldGroups={merchantReviewSearch('merchant')}
                          onSearch={this.handleSearchWait}
                          onRowSelect={this.onRowChangeWait}
          />
        </Card>
        <Drawer {...drawerProps}>
          {
            okRecord && this.renderContent(okRecord, true)
          }
          {
            waitRecord && this.renderContent(waitRecord)
          }
        </Drawer>
        <Card title="已处理、成功的审核">
          <QueryContainer loading={okProcessing}
                          buttonGroups={record => this.okButtonGroupsConfig(record)}
                          title={() => (
                            <TotalUtil total={okPage.totalElements}
                                       totalAmount={okPage.totalAmount}
                            />)}
                          page={okPage}
                          ANTDForm={form}
                          columns={ColumnUtil.adjustRender(columns)}
                          fieldGroups={merchantReviewSearch('merchantBusiness')}
                          onSearch={this.handleSearchOK}
                          onRowSelect={this.onRowChangeOk}
          />
        </Card>
      </React.Fragment>
    );
  }
}
