import { lang } from '../locale';
import objectPath from 'object-path';
import { IdType, idTypeOptions } from './selectObj/Personal';
import Pattern from '../utils/Pattern';
import { AccountType, AccountTypeOptions } from './AccountType';
import { bank } from '@sitb/wbs/bank';
import { SettleType, SettleTypeOptions } from './selectObj/SettleType';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */


/**
 * 个人信息（联系人 法人共用）
 * @param {string}  prefixString  包裹对象key
 * @param {boolean} idNoRule      是否校验
 * @param {boolean} phoneNoRule   是否校验
 * @param {boolean} personBan     是否校验
 * @param {boolean} idTypeBan     是否禁用
 * @param {boolean} idNoBan       是否禁用
 * @param {boolean} phoneBan      是否禁用
 * @param {boolean} emailBan      是否禁用
 * @param {boolean} onFocus    证件号聚焦事件
 */
export const personal = ({
                           prefixString,
                           idNoRule = true,
                           phoneNoRule = true,
                           personBan = false,
                           idTypeBan = false,
                           idNoBan = false,
                           phoneBan = false,
                           emailBan = false,
                           onFocus = (key) => undefined
                         }) => [{
  name: `${prefixString}.name`,
  label: lang.name,
  disabled: personBan
}, {
  name: `${prefixString}.identities[0].type`,
  label: lang.agency.identitiesType,
  type: 'select',
  options: idTypeOptions,
  decoratorOptions: {
    initialValue: IdType.idCard
  },
  disabled: idTypeBan
}, {
  name: `${prefixString}.identities[0].number`,
  label: lang.agency.identitiesNumber,
  onFocus: () => onFocus(`${prefixString}.identities[0].number`),
  disabled: idNoBan,
  maxLength:20
}, {
  name: `${prefixString}.phoneNo`,
  label: lang.phoneNo,
  rules: phoneNoRule && Pattern.phone,
  onFocus: () => onFocus(`${prefixString}.phoneNo`),
  disabled: phoneBan
}, {
  name: `${prefixString}.email`,
  label: lang.email,
  rules: Pattern.email,
  disabled: emailBan
}];

/**
 * 结算信息表单
 * @param {any} prefixString            字段前缀
 * @param {any} labelPrefixString       label字段前缀
 * @param {any} accountTypeChange       结算账户change
 * @param {any} accountTypeOptions      set结算账户option
 * @param {any} settleTypeBan           结算类型disabled
 * @param {boolean} phoneNoRule         结算号码正则
 * @param {boolean} cardNoRule          结算账户号正则
 * @param {func} onFocus                结算账户聚焦
 * @param accountNumberProps            账户名扩展props
 * @returns
 */
export const settleField = ({
                              prefixString = 'settleAccount',
                              labelPrefixString = 'agency',
                              accountTypeChange,
                              accountTypeOptions = AccountTypeOptions,
                              settleTypeBan = false,
                              phoneNoRule = true,
                              cardNoRule = false,
                              onFocus = (key) => undefined,
                              accountNumberProps = {}
                            }) => [{
  name: `${prefixString}.accountType`,
  label: objectPath.get(lang, `${labelPrefixString}.accountType`),
  type: 'select',
  options: accountTypeOptions,
  onChange: accountTypeChange,
  decoratorOptions: {
    initialValue: AccountType.bank
  }
}, {
  name: `${prefixString}.settleType`,
  label: objectPath.get(lang, `${labelPrefixString}.settleType`),
  disabled: settleTypeBan,
  type: 'select',
  options: SettleTypeOptions,
  decoratorOptions: {
    initialValue: SettleType.private
  }
}, {
  name: `${prefixString}.settleBank`,
  label: objectPath.get(lang, `${labelPrefixString}.settleBank`),
  type: 'select',
  options: Object.keys(bank),
  getLabel: (key) => `${bank[key].openBankCode}-${bank[key].name}`,
  getValue: (key) => key
}, {
  name: `${prefixString}.name`,
  label: objectPath.get(lang, `${labelPrefixString}.accountName`),
}, {
  name: `${prefixString}.number`,
  label: objectPath.get(lang, `${labelPrefixString}.accountNumber`),
  rules: cardNoRule && Pattern.settleCardNo,
  onFocus: () => onFocus(`${prefixString}.number`),
  maxLength:25,
  ...accountNumberProps,
}, {
  name: `${prefixString}.bankReservedPhone`,
  label: objectPath.get(lang, `${labelPrefixString}.bankReservedPhone`),
  rules: phoneNoRule && Pattern.phone,
  onFocus: () => onFocus(`${prefixString}.bankReservedPhone`)
}];
