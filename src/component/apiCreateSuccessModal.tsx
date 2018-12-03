import * as React from 'react';
import { Alert, Modal } from 'antd';

const style = {
  padding: 10,
  color: '#78C9CF',
  borderRadius: 2,
  backgroundColor: '#454545'
};

const label = {
  marginTop: 20,
  paddingBottom: 10,
  display: 'block'
};

export default (payload) => {
  Modal.success({
    title: 'API & Key 已经成功创建',
    width: '40%',
    content: (
      <div>
        <div>
          <label style={label}>{'Client Id'}</label>
          <code style={style}>{payload.clientId}</code>
        </div>
        <div>
          <label style={label}>{'Client Secret'}</label>
          <code style={style}>{payload.clientSecret}</code>
        </div>
        <Alert message={'请保存上面的信息！这些信息仅显示一次。\n 如果忘记了Client Secret，您需要重新创建新的API Key'}
               type="warning"
               style={{marginTop: 20}}
        />
      </div>
    )
  })
}
