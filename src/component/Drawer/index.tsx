/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/7
 */
import * as React from 'react';
import { DrawerProps } from 'antd/lib/drawer';
import { Drawer as ANTDDrawer } from 'antd';
import { Button, Props as ButtonProps } from '@sitb/wbs/Button';
import { lang } from '../../locale';

export interface Props extends DrawerProps {
  /**
   * 抽屉底部插入的element
   */
  footElement?: any;
  /**
   * 添加次级按钮
   */
  secondButtonProps?: ButtonProps;
  /**
   * 提交按钮
   */
  submitButtonProps?: ButtonProps;
}

export class Drawer extends React.Component<Props> {

  render() {
    const {footElement, secondButtonProps, submitButtonProps, onClose, visible, ...other} = this.props;
    return (
      <ANTDDrawer title={lang.merchantReview.detailed}
                  width={720}
                  placement="right"
                  onClose={onClose}
                  maskClosable={false}
                  visible={visible}
                  style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    padding: 0,
                    paddingBottom: 53
                  }}
                  {...other}
      >
        {this.props.children}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: '10px 16px',
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          background: '#fff',
          borderRadius: '0 0 4px 4px'
        }}
        >
          <Button style={{
            marginRight: 8
          }}
                  onClick={onClose}
          >
            {lang.cancel}
          </Button>
          <div>
            {footElement && footElement}
            {secondButtonProps && (
              <Button {...secondButtonProps}
                      style={{marginLeft: 10, marginRight: 10}}
              />
            )}
            {
              submitButtonProps && (
                <Button type="primary"
                        {...submitButtonProps}
                />
              )
            }
          </div>
        </div>
      </ANTDDrawer>
    )
  }
}
