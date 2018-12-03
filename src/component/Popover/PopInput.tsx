/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/7
 */
import * as React from 'react';
import { Icon, Input } from 'antd';
import { lang } from '../../locale';
import { InputProps } from 'antd/lib/input/Input';

export interface Props extends InputProps {
  /**
   * pop title
   */
  title?: string;
  /**
   * value 必须跟onChange绑定
   */
  value: string;
  onChange: (e) => void;
}

export class PopInput extends React.Component<Props> {

  render() {
    const {title, value, onChange, ...props} = this.props;
    return (
      <React.Fragment>
        {
          title && (
            <p>{title}</p>
          )
        }
        <Input placeholder={lang.merchantReview.remark}
               prefix={<Icon type="form" theme="outlined"/>}
               value={value}
               onChange={onChange}
               {...props}
        />
      </React.Fragment>
    )
  }
}
