/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/14
 */

/**
 * 业务类型
 */
export const BusinessTypeData = require('./businessType.json');

export const firstBusinessType = Object.keys(BusinessTypeData)[0];

/**
 *   "POS_PAY_REFUND": "POS支付-退货",
 "WeChat_REFUND": "微信退款",
 "AliPay_REFUND": "支付宝退款",
 "UNION_REFUND": "银联交易退货",
 "GATE_PAY_REFUND": "网关退款",
 "POS_PAY_CANCEL": "POS支付-撤销",
 "POS_PAY_CANCEL_REVSAL": "POS支付-撤销冲正",
 "WeChat_CANCEL": "微信交易撤销",
 "AliPay_CANCEL": "支付宝交易撤销",
 "UNION_CANCEL": "银联交易撤销",
 "POS_PAY_REVSAL": "POS支付-交易冲正",

 **/
