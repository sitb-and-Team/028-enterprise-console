/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/22
 */
import * as React from 'react';
import { Checkbox as ANTDCheckBox, Col, Row } from 'antd';
import { lang } from '../../locale';

export interface Props {
  /**
   * 多选框value字段
   */
  options: Array<string>;
  /**
   * 无options或空时，展示的string
   */
  setTitle?: string;
  /**
   * 保存多选value
   */
  saveCheckValues?: (checks) => void;
}

export class CheckBox extends React.Component<Props, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      /**
       * 存储当前多选框的数据
       */
      checkedList: [],
      /**
       * 全选状态控制
       */
      indeterminate: true,
      /**
       * 是否选中
       */
      checkAll: false
    };
  }

  /**
   * 选中单条数据
   * @param checkedList
   */
  onChange = (checkedList) => {
    const {options, saveCheckValues} = this.props;
    saveCheckValues && saveCheckValues(checkedList);
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < options.length),
      checkAll: checkedList.length === options.length,
    });
  };

  /**
   * 全选
   * @param e
   */
  onCheckAllChange = (e) => {
    const {options, saveCheckValues} = this.props;
    const checked = e.target.checked;
    const checkedList = checked ? options : [];
    saveCheckValues && saveCheckValues(checkedList);
    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: checked,
    });
  };

  /**
   * 渲染多选框
   * @param config   多选框配置
   * @returns {any}
   */
  renderCheckBox = (config) => {
    return config.map((check, index) => (
      <Col span={24}
           key={index}
      ><ANTDCheckBox value={check}>{check}</ANTDCheckBox></Col>
    ))
  };

  render() {
    const {indeterminate, checkAll, checkedList} = this.state;
    const {options, setTitle} = this.props;
    return (
      <div>
        <div style={{borderBottom: '1px solid #E9E9E9'}}>
          <ANTDCheckBox indeterminate={indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={checkAll}
          >
            {'全选'}
          </ANTDCheckBox>
        </div>
        <br/>
        <ANTDCheckBox.Group value={checkedList}
                            onChange={this.onChange}
        >
          {
            (options && options.length !== 0) && (
              <Row>
                {this.renderCheckBox(options)}
              </Row>
            ) || (
              <p>{setTitle || lang.failedData}</p>
            )
          }
        </ANTDCheckBox.Group>
      </div>
    )
  }
}
