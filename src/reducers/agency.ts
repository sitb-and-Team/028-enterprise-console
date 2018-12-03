/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/22
 */
import compose from './composeReducer';
import { agency as types } from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  processing: boolean;
  statusProcessing: boolean;
  searchParams: object;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {},
  statusProcessing: false
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, status, success} = action;
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
    // 开启弹框动作
    case types.openModal: {
      return {
        ...state,
        statusProcessing: payload
      }
    }
    // 编辑
    case types.startStatus:
    case types.startUpdate:{
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
    case types.statusComplete: {
      return {
        ...state,
        processing: false,
        statusProcessing: !success
      }
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
