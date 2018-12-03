/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/5
 */
import * as React from 'react';
import { Icon, Input, Progress } from 'antd';
import { getActions } from '../../core/store';
import { lang } from '../../locale';
import objectPath from 'object-path';
import { autoBind } from '@sitb/wbs/autoBind';
import { CardGrid } from '../../component/Card/CardGrid';

@autoBind
export class Review extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      reviewVisible: this.generateReview(),
      reviewDescribe: ''
    };
  }

  /**
   * 循环生成十组状态
   * @returns {{}}
   */
  generateReview() {
    let reviewVisible = {};
    for (let i = 0; i < 10; i++) {
      reviewVisible[`${i}REJECTED`] = false;
      reviewVisible[`${i}RESOLVE`] = false;
    }
    return reviewVisible
  }

  /**
   * 审核备注change
   * @param e
   */
  handleRemarkChange(e) {
    // 获取当前value
    let reviewDescribe = e.target.value;
    this.setState({reviewDescribe});
  }

  /**
   * 审核submit提交
   * @param key    审核成功还是失败 RESOLVE | REJECTED
   * @param record 当前行数据
   * @param index  下标
   */
  handleSubmit(key, record, index) {
    const {reviewDescribe} = this.state;
    let reviewData: any = {
      merchantReviewId: record.id,
      reviewHistory: {
        user: record.reviewUser,
        result: key,
        describe: reviewDescribe
      }
    };
    // 判断是否请求成功再关闭pop弹框
    this.reviewSwitch(key, false, index);
    getActions().profile.startCheckReview(reviewData);
    console.log('submit =>', reviewData);
  }

  /**
   * 是否认证的pop开关
   * @param index   下标
   * @param target  同意 | 拒绝
   * @param status  开 | 关
   */
  reviewSwitch(target, status?, index?) {
    if (!status) {
      this.setState({reviewDescribe: ''});
    }
    this.setState(prefix => ({
      reviewVisible: {
        ...prefix.reviewVisible,
        [`${index}${target}`]: status
      }
    }))
  }

  renderCardBody(review) {
    // 获取审核流程长度
    let percentLength = objectPath.get(review, 'reviewProcess.chain') && objectPath.get(review, 'reviewProcess.chain').length;
    let newReviewIndex = objectPath.get(review, 'nextReviewUserIndex');
    // 向下取整 = 平均比率 * 下一次审核下标 -1(也就是当前审核下标)
    let proportion = Math.floor(100 / percentLength) * (newReviewIndex - 1);
    let status: any = 'active';
    // 当为-1 修改为成功，并且进度为100%
    if (newReviewIndex === -1) {
      proportion = 100;
      status = 'success';
    }
    return (
      <Progress percent={proportion}
                size="small"
                status={status}
                width={200}
      />
    )
  }

  renderCardTitle(title) {
    const {reviewDescribe} = this.state;
    return (
      <React.Fragment>
        <p>{title}</p>
        <Input placeholder="审核备注"
               prefix={<Icon type="form" theme="outlined"/>}
               value={reviewDescribe}
               onChange={this.handleRemarkChange}
        />
      </React.Fragment>
    );
  }

  render() {
    const {processing, dataSource} = this.props;
    // 审核数据配置
    const cardGridViewConfig: any = (record) => [{
      setCol: {
        lg: 24,
        md: 24,
        xl: 24,
        xs: 24
      },
      setLabelCol: 10,
      setValueCol: 14,
      row: [{
        label: lang.merchant.info,
        value: ['merchantNo', 'merchantName']
      }, {
        label: lang.merchantReview.name,
        value: 'reviewProcess.name'
      }, {
        label: lang.merchantReview.frequency,
        value: 'reviewProcess.chain',
        setValue: (chain) => `${chain.length}`
      }, {
        label: lang.remark,
        value: 'reviewDescribe'
      }]
    }];

    // cardAction配置
    const cardActionConfig: any = (review) => ({
      inputChange: this.handleRemarkChange,
      iconClick: (name, status, index) => this.reviewSwitch(name, status, index),
      onCancel: (name, status, index) => this.reviewSwitch(name, status, index),
      onConfirm: (name, record, index) => this.handleSubmit(name, record, index),
      record: review,
      groups: [{
        pop: true,
        iconType: 'check-circle',
        title: this.renderCardTitle('确认判定审核通过?'),
        name: 'RESOLVE'
      }, {
        pop: true,
        iconType: 'close-circle',
        title: this.renderCardTitle('确认判定审核失败?'),
        name: 'REJECTED'
      }, {
        iconType: 'eye',
        title: '确认判定审核失败?'
      }]
    });
    // 配置props
    const props = {
      dataSource,
      processing,
      cardGridViewConfig,
      cardActionConfig,
      setCardBody: this.renderCardBody,
      visible: this.state.reviewVisible
    };
    return <CardGrid {...props}/>;
  }
}
