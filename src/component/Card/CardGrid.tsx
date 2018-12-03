/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/6
 */
import * as React from 'react';
import { Card, Col, Icon, Row, Skeleton } from 'antd';
import CardGridView, { Props as CardGridViewProps } from './CardGridView';
import { PopIcon } from '../Popover/PopIcon';

// 卡片action item
export interface Item {
  pop?: boolean;
  name?: string;
  iconType: string;
  title: any;
}

// 卡片action
export interface CardActionItem {
  inputChange?: () => void;
  /**
   * 触发弹框
   * @param name    组name
   * @param status  状态
   * @param index   下标
   */
  iconClick?: (name, status, index) => void;
  onCancel?: (name, status, index) => void;
  onConfirm?: (name, record, index) => void;
  record: object;
  groups: Array<Item>
}

export interface Props {
  /**
   * 数据源
   */
  dataSource: Array<any>;
  /**
   * loading状态
   */
  processing?: boolean;
  /**
   * 栅格数据配置
   */
  cardGridViewConfig: CardGridViewProps;
  /**
   * 卡片按钮组配置
   * @param record 当前行数据
   * @returns {CardActionItem}
   */
  cardActionConfig: (record) => CardActionItem;
  /**
   * 插入card内容
   */
  setCardBody?: any;
  /**
   * pop存在时，弹框状态控制
   */
  visible?: object
}

export class CardGrid extends React.Component<any> {

  /**
   * 渲染cardAction 卡片最下面的按钮组
   * @param cardItem
   * @param cardIndex
   * @returns {any}
   */
  renderCardActions(cardItem, cardIndex) {
    const {record, groups, iconClick, onConfirm, onCancel} = cardItem;
    const {visible} = this.props;
    // 最终返回的数组
    const actionContent: any = [];
    groups.map((group, index) => {
      const {iconType, title, name, pop} = group;
      // 默认pop确认框
      let content: any = (
        <Icon key={index}
              type={iconType}
              onClick={() => iconClick('onlyIcon')}
              style={{
                paddingLeft: 20,
                paddingRight: 20
              }}
        />
      );
      // pop的情况
      if (pop) {
        content = (
          <PopIcon key={index}
                   iconType={iconType}
                   visible={visible[`${cardIndex}${name}`]}
                   title={title}
                   onConfirm={() => onConfirm(name, record, cardIndex)}
                   onCancel={() => onCancel(name, false, cardIndex)}
                   iconClick={() => iconClick(name, true, cardIndex)}
          />
        )
      }
      actionContent.push(content);
    });
    return actionContent;
  }

  /**
   * 渲染卡片内容
   * @returns {any}
   */
  renderCardContent() {
    const {
      dataSource,
      processing,
      cardGridViewConfig,
      cardActionConfig,
      setCardBody,
      setCol
    } = this.props;
    if (!dataSource || !dataSource.length) {
      return "无数据";
    }
    return dataSource.map((review, index) => (
      <Col key={index}
           style={{marginBottom: 10}}
           xs={12}
           sm={12}
           md={12}
           lg={12}
           xl={8}
           xxl={8}
           {...setCol}
      >
        <Card loading={processing}
              bodyStyle={{
                padding: 12
              }}
              headStyle={{
                padding: 12
              }}
              actions={cardActionConfig && this.renderCardActions(cardActionConfig(review), index)}
        >
          <CardGridView params={review}
                        bodyStyle={{padding: 0}}
                        config={cardGridViewConfig(review)}
          />
          {setCardBody && setCardBody(review)}
        </Card>
      </Col>
    ))
  }

  render() {
    const {processing} = this.props;
    return (
      <React.Fragment>
        {
          processing && (
            <Skeleton avatar
                      paragraph={{rows: 4}}
            />
          ) || (
            <Row type="flex"
                 align="middle"
                 gutter={10}
            >
              {this.renderCardContent()}
            </Row>
          )
        }
      </React.Fragment>
    )
  }
}
