/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/14
 */
import compose from './composeReducer';
import { settlePayment as types } from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  processing: boolean;
  searchParams: object;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {}
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, status} = action;
  switch (type) {
    case types.startQuery: {
      return {
        ...state,
        processing: true,
        searchParams: {
          ...state.searchParams,
          ...type === types.startQuery && payload
        }
      };
    }
    case types.queryComplete: {
      return {
        ...state,
        page: (status === '0000' && payload instanceof Object) && payload || state.page,
        processing: false
      };
    }
    case types.startDown: {
      return {
        ...state,
        processing: true
      };
    }
    case types.downComplete: {
      return {
        ...state,
        processing: false
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);


