/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */
/**
 * 通道、业务状态
 */
import { lang } from '../../locale/index';

export const StatusType = {
  true: 'true',
  false: 'false'
};

// 状态select options
export const StatusTypeOptions = {
  [StatusType.true]: lang.open,
  [StatusType.false]: lang.close
};

// 字段为yes not options
export const StatusYesAndNoOptions = {
  [StatusType.true]: lang.yes,
  [StatusType.false]: lang.no
};
