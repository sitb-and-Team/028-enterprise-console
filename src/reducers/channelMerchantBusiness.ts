/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/31
 */
import compose from './composeReducer';
import { channelMerchantBusiness as types } from '../constants/ActionTypes';

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
        page: {
          content: (status === '0000' && Array.isArray(payload)) && payload || []
        },
        processing: false
      };
    }
    case types.startUpdate:
    case types.startStatus: {
      return {
        ...state,
        processing: true
      };
    }
    case types.updateComplete:
    case types.statusComplete: {
      return {
        ...state,
        processing: false
      }
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
