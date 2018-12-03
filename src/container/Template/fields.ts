import { lang } from '../../locale';
import { rateGroup } from '../../constants/FieldsBusiness';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/16
 */

// 费率模版search
export const rateTemplateSearch = [{
  fields: [{
    name: 'name',
    label: lang.rateTemplate.name
  }]
}];

// 分离出pos的fields
export const posTemplateFields: any = (isRequired) => [{
  title: lang.rateTemplate.posCostInfo,
  fields: [
    ...rateGroup({
      isRequired,
      prefixString: 'posFeeRate.debit'
    }),
    ...rateGroup({
      isRequired,
      prefixString: 'posFeeRate.ownerDebit'
    }),
    ...rateGroup({
      isRequired,
      prefixString: 'posFeeRate.credit'
    }),
    ...rateGroup({
      isRequired,
      prefixString: 'posFeeRate.ownerCredit'
    }),
    ...rateGroup({
      isRequired,
      prefixString: 'posFeeRate.abroadDebit'
    }),
    ...rateGroup({
      isRequired,
      prefixString: 'posFeeRate.abroadCredit'
    })
  ]
}];

// 费率模版fields
export const rateTemplateFields = [{
  title: lang.basicInfo,
  fields: [{
    name: 'name',
    label: lang.rateTemplate.name
  }]
}, {
  title: lang.rateTemplate.costInfo,
  fields: [
    ...rateGroup({
      isRequired: false,
      prefixString: 'normalFeeRate'
    }),
    ...rateGroup({
      prefixString: 'serviceFeeRate'
    })
  ]
}, ...posTemplateFields(false)[0]];
