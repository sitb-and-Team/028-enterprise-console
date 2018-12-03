/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/18
 */
import { lang } from '../locale';

// moment
export const momentCommon = {
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  TIME_FORMAT: 'HH:mm:ss',
  DATE_FORMAT: 'YYYY-MM-DD',
  // 与后台交互的时间数据新格式
  DATETIME: 'YYYYMMDDHHmmss',
  TIME: 'HHmmss',
  DATE: 'YYYYMMDD'
};

// 状态
export const statusType = {
  "true": lang.open,
  "false": lang.close,
  "NORMAL": lang.normal,
  "DISABLED": lang.disabled,
  "REVIEW": lang.review,
  "INVALID": lang.invalid
};

// 通道商户结算方式
export const channelConfigSettleMethod = {
  "D0_SETTLE": lang.channelConfig.d0_settle,
  "T1_SETTLE": lang.channelConfig.t1_settle,
  "CHILD_SETTLE": lang.channelConfig.child_settle
};

// 资源方法类型
export const resourceMethodData = {
  "GET": '获取资源 / GET',
  "POST": '新增资源 / POST',
  "PUT": '编辑资源 / PUT',
  "DELETE": '删除资源 / DELETE',
  PATCH: '局部更新资源 / PATCH'
};
