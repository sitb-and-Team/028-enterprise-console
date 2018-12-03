/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/11
 */
import compose from './composeReducer';
import { agencyConfig as types } from '../constants/ActionTypes';

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
          ...
            state.searchParams,
          ...
          type === types.startQuery && payload
        }
      };
    }
    case types.queryComplete: {
      // 默认值
      let content = state.page.content;
      // 请求成功替换成后台数据
      if (status === '0000' && (payload instanceof Object)) {
        content = payload;
      }
      return {
        ...state,
        page: {
          ...state.page,
          content
        },
        processing: false
      };
    }
    // 更新配置
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
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
