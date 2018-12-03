/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/6
 */
import * as React from 'react';
import { Button, Input } from 'antd';
import { lang } from '../../locale';

export interface Props {
  /**
   * 按钮loading
   */
  processing: boolean;
  /**
   * input提示string
   */
  placeholder?: string;
  /**
   * button name
   */
  countDown?: number | string;
  /**
   * input change
   * @param e
   */
  onChange: (e) => void;
  /**
   * 按钮click
   */
  onClick: () => void;
}

export default class InputButton extends React.Component<Props> {
  render() {
    const {processing, placeholder, onChange, onClick, countDown} = this.props;
    return (
      <Input style={{marginBottom: 15}}
             placeholder={placeholder || lang.formErrorMessage(lang.checkValue)}
             size="large"
             onChange={onChange}
             addonAfter={<Button htmlType="submit"
                                 style={{
                                   border: 'none'
                                 }}
                                 disabled={processing}
                                 onClick={onClick}
             >
               {countDown}
             </Button>}
      />
    )
  }

}
