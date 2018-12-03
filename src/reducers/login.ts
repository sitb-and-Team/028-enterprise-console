/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/6
 */
import compose from './composeReducer';
import { login as types } from '../constants/ActionTypes';

export interface StoreState {
  processing: boolean;
  submitProcessing: boolean;
}

const DEFAULT_STATE = {
  processing: true,
  submitProcessing: false
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {type, success} = action;
  switch (type) {
    case types.startSend: {
      return {
        ...state,
        processing: true
      };
    }
    case types.sendComplete: {
      return {
        ...state,
        processing: success
      };
    }
    case types.startBound: {
      return {
        ...state,
        submitProcessing: true
      };
    }
    case types.boundComplete: {
      return {
        ...state,
        submitProcessing: false
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);

