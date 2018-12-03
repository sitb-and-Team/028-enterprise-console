/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/30
 */
import Pattern from '@sitb/wbs/utils/Pattern';
import { lang } from '../locale';

export default {
  /**
   * 营业执照
   */
  businessLicense: [{
    required: true,
    pattern: Pattern.businessLicense,
    message: lang.formErrorMessage(lang.businessLicense)
  }],
  /**
   * 手机号码
   */
  phone: [{
    required: true,
    pattern: Pattern.mobilePhone,
    message: lang.formErrorMessage(lang.phoneNo)
  }],
  /**
   * 邮箱
   */
  email: [{
    required: true,
    pattern: Pattern.email,
    message: lang.formErrorMessage(lang.email)
  }],
  /**
   * 身份证
   */
  idNo: [{
    required: true,
    pattern: Pattern.idCard,
    message: lang.formErrorMessage(lang.idCard)
  }],
  /**
   * 银行卡号
   */
  settleCardNo: [{
    required: true,
    pattern: Pattern.settleCardNo,
    message: lang.formErrorMessage(lang.settleCardNo)
  }]
}
