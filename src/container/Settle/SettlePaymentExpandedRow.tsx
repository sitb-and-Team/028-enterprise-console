import getObject from 'object-path';
import { GridInfoProps, gridInfoUtil } from '../../component/Tool/GridInfoUtil';
import { lang } from '../../locale';
import GridViewUtil from '../../utils/GridViewUtil';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/8
 */

export default settlePayment => {
  // 获取值
  const normalFeeRateType = getObject.get(settlePayment, 'normalFeeRate.type');
  const serviceFeeRateType = getObject.get(settlePayment, 'serviceFeeRate.type');

  const configs = {
    config: [{
      label: lang.normalFeeRate.value,
      value: 'normalFeeRate.value',
      type: normalFeeRateType
    }, {
      label: lang.normalFeeRate.min,
      value: 'normalFeeRate.min',
    }, {
      label: lang.normalFeeRate.max,
      value: 'normalFeeRate.max',
    }, {
      label: lang.serviceFeeRate.value,
      value: 'serviceFeeRate.value',
      type: serviceFeeRateType
    }, {
      label: lang.serviceFeeRate.min,
      value: 'serviceFeeRate.min'
    }, {
      label: lang.serviceFeeRate.min,
      value: 'serviceFeeRate.max'
    }]
  };
  const data: GridInfoProps = {
    setCol: {
      lg: 8,
      md: 24,
      xl: 8
    },
    setLabelCol: 3,
    rows: [...GridViewUtil.generateRows(configs)]
  };
  return gridInfoUtil(data, settlePayment);
}
