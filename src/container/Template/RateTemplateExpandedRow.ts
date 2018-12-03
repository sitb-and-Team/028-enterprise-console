/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/19
 */
import getObject from 'object-path';
import { GridInfoProps, gridInfoUtil } from '../../component/Tool/GridInfoUtil';
import { lang } from '../../locale';
import GridViewUtil from '../../utils/GridViewUtil';

export default rateTemplate => {

  // 获取值
  const abroadCredit = getObject.get(rateTemplate, 'posFeeRate.abroadCredit.type');
  const abroadDebitType = getObject.get(rateTemplate, 'posFeeRate.abroadDebit.type');
  const creditType = getObject.get(rateTemplate, 'posFeeRate.credit.type');
  const debitType = getObject.get(rateTemplate, 'posFeeRate.debit.type');
  const ownerCreditType = getObject.get(rateTemplate, 'posFeeRate.ownerCredit.type');
  const ownerDebitType = getObject.get(rateTemplate, 'posFeeRate.ownerDebit.type');

  // 渲染配置
  const configs = {
    config: [{
      label: lang.posFeeRate.abroadCredit.value,
      value: 'posFeeRate.abroadCredit.value',
      type: abroadCredit
    }, {
      label: lang.posFeeRate.abroadCredit.min,
      value: 'posFeeRate.abroadCredit.min'
    }, {
      label: lang.posFeeRate.abroadCredit.max,
      value: 'posFeeRate.abroadCredit.max'
    }, {
      label: lang.posFeeRate.abroadDebit.value,
      value: 'posFeeRate.abroadDebit.value',
      type: abroadDebitType
    }, {
      label: lang.posFeeRate.abroadDebit.min,
      value: 'posFeeRate.abroadDebit.min'
    }, {
      label: lang.posFeeRate.abroadDebit.max,
      value: 'posFeeRate.abroadDebit.max'
    }, {
      label: lang.posFeeRate.credit.value,
      value: 'posFeeRate.credit.value',
      type: creditType
    }, {
      label: lang.posFeeRate.credit.min,
      value: 'posFeeRate.credit.min'
    }, {
      label: lang.posFeeRate.credit.max,
      value: 'posFeeRate.credit.max'
    }, {
      label: lang.posFeeRate.debit.value,
      value: 'posFeeRate.debit.value',
      type: debitType
    }, {
      label: lang.posFeeRate.debit.min,
      value: 'posFeeRate.debit.min'
    }, {
      label: lang.posFeeRate.debit.max,
      value: 'posFeeRate.debit.max'
    }, {
      label: lang.posFeeRate.ownerCredit.value,
      value: 'posFeeRate.ownerCredit.value',
      type: ownerCreditType
    }, {
      label: lang.posFeeRate.ownerCredit.min,
      value: 'posFeeRate.ownerCredit.min'
    }, {
      label: lang.posFeeRate.ownerCredit.max,
      value: 'posFeeRate.ownerCredit.max'
    }, {
      label: lang.posFeeRate.ownerDebit.value,
      value: 'posFeeRate.ownerDebit.value',
      type: ownerDebitType
    }, {
      label: lang.posFeeRate.ownerDebit.min,
      value: 'posFeeRate.ownerDebit.min'
    }, {
      label: lang.posFeeRate.ownerDebit.max,
      value: 'posFeeRate.ownerDebit.max'
    }]
  };

  const data: GridInfoProps = {
    setCol: {
      lg: 8,
      md: 24,
      xl: 8
    },
    setLabelCol: 7,
    rows: [...GridViewUtil.generateRows(configs)]
  };
  return gridInfoUtil(data, rateTemplate);
}
