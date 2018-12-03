import { lang } from '../../locale';
import * as moment from 'moment';
import { AccountTypeOptions } from '../../constants/AccountType';
import { NatureOptions } from '../../constants/selectObj/Nature';
import { SettleTypeOptions } from '../../constants/selectObj/SettleType';
import { IdTypeOptions } from '../../constants/selectObj/IdType';
import Common from '@sitb/wbs/constants/Common';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/27
 */
//基本信息
const basicInfo: any = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  itemTitle: lang.basicInfo,
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.agency.parentAgency,
    value: 'path'
  }, {
    label: lang.merchant.nature,
    value: 'nature',
    mappingObject: NatureOptions
  }, {
    label: lang.agency.code,
    value: ['code', 'name']
  }, {
    label: lang.merchant.businessLicenseString,
    value: 'businessLicense.number'
  }, {
    label: lang.agency.phone,
    value: 'agencyPhone'
  }, {
    label: lang.agency.expiresTime,
    value: 'contractExpires',
    setValue: date => moment(Number(date)).format(Common.DATETIME_FORMAT)
  }, {
    label: lang.address,
    value: ['address.province', 'address.county', 'address.city', 'address.street']
  }
  ]
};

//法人信息
const legalInfo: any = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  itemTitle: lang.agency.legalInfo,
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.legalPerson,
    value: 'legalPerson.name'
  }, {
    label: lang.idType,
    value: 'legalPerson.identities[0].type',
    mappingObject: IdTypeOptions
  }, {
    label: lang.idNo,
    value: 'legalPerson.identities[0].number',
  }, {
    label: lang.legalPersonPhone,
    value: 'legalPerson.phoneNo'
  }, {
    label: lang.legalEmail,
    value: 'legalPerson.email'
  }
  ]
};

//联系人信息
const linkmanInfo: any = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  itemTitle: lang.agency.linkmanInfo,
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.linkman,
    value: 'linkman.name'
  }, {
    label: lang.idType,
    value: 'linkman.identities[0].type',
    mappingObject: IdTypeOptions
  }, {
    label: lang.idNo,
    value: 'linkman.identities[0].number',
  }, {
    label: lang.linkPhone,
    value: 'linkman.phoneNo'
  }, {
    label: lang.linkEmail,
    value: 'linkman.email'
  }
  ]
};

//结算账户信息
const cardInfo: any = {
  setCol: {
    lg: 8,
    md: 12,
    xl: 8,
    xs: 24
  },
  itemTitle: lang.agency.settleAccount,
  setLabelCol: 7,
  setValueCol: 17,
  rows: [{
    label: lang.accountType,
    value: 'settleAccount.accountType',
    mappingObject: AccountTypeOptions
  }, {
    label: lang.agency.settleType,
    value: 'settleAccount.settleType',
    mappingObject: SettleTypeOptions
  }, {
    label: lang.agency.settleBank,
    value: 'settleAccount.bankName'
  }, {
    label: lang.agency.accountName,
    value: 'settleAccount.bankNo'
  }, {
    label: lang.agency.accountNumber,
    value: 'settleAccount.number'
  }, {
    label: lang.agency.bankReservedPhone,
    value: 'settleAccount.bankReservedPhone'
  }
  ]
};


export const infoConfig: any = [
  basicInfo,
  legalInfo,
  linkmanInfo,
  cardInfo
];



