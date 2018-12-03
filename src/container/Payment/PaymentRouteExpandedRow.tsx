/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/8
 */
import * as React from 'react';
import { Col, Row } from 'antd';
import { OperatorTypeOptions } from '../../constants/selectObj/OperatorType';
import {PaymentRouteKeyOptions} from '../../constants/selectObj/PaymentRouteKey';


export default paymentRoute => (
  <Row>
    {
      paymentRoute.conditions.map((condition, index) => {
        return (
          <Col key={index}>
            {`第${index + 1}条: ${PaymentRouteKeyOptions[condition.key]} ${OperatorTypeOptions[condition.operator]} ${condition.value}`}
          </Col>
        )
      }
        )
    }
  </Row>
);
