/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/21
 */
import { lang } from '../../locale';

// 出款任务状态
export const SettleTaskStage = {
  /**
   * 初始化中
   */
  init: 'INIT',
  /**
   *  等待处理
   */
  execute: 'EXECUTE',
  /**
   * 已删除
   */
  delete: 'DELETE'
};

// 出款任务options
export const SettleTaskStageOptions = {
  [SettleTaskStage.init]: lang.init,
  [SettleTaskStage.execute]: lang.execute,
  [SettleTaskStage.delete]: lang.delete
};
