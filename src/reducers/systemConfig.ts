/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/15
 */
import compose from './composeReducer';
import { systemConfig as types } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  configs: [],
  processing: false,
  searchParams: {}
};

export default compose((state = DEFAULT_STATE, action) => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, success} = action;
  switch (type) {
    case types.queryComplete: {
      return {
        ...state,
        configs: success ? payload : state.configs,
        processing: false
      };
    }
    case types.query:
    case types.create: {
      return {
        ...state,
        processing: true
      };
    }
    case types.createComplete: {
      return {
        ...state,
        processing: false
      }
    }
    default:
      return state;
  }
}, DEFAULT_STATE);

