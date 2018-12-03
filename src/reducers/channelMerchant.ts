/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * data: 2018/7/31
 */
import compose from './composeReducer';
import { channelMerchant as types } from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  processing: boolean;
  searchParams: object;
  /**
   * 存放一对多商户select
   */
  oneToManyMerchantSelect: object;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {},
  oneToManyMerchantSelect: {}
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, success, oneToManyMerchantSelect} = action;
  switch (type) {
    case types.startQuery: {
      return {
        ...state,
        processing: true,
        searchParams: {
          ...state.searchParams,
          ...type === types.startQuery && payload
        },
        /**
         * 初始化
         */
        oneToManyMerchantSelect: {},
        page: {
          content: [],
          size: 10,
          totalElements: 0
        }
      };
    }
    case types.queryComplete: {
      // oneToManyMerchantSelect 跟数据payload 同级
      return {
        ...state,
        page: (success && (payload instanceof Object)) && payload || state.page,
        oneToManyMerchantSelect: (success && (payload instanceof Object)) && oneToManyMerchantSelect || state.oneToManyMerchantSelect,
        processing: false
      };
    }
    case types.startUpdate: {
      return {
        ...state,
        processing: true
      };
    }
    case types.updateComplete: {
      return {
        ...state,
        processing: false
      }
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
