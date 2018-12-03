/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/5
 */
import compose from './composeReducer';
import { profile as types } from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  processing: boolean;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, status} = action;
  switch (type) {
    // 获取审核列表
    case types.startQueryReview: {
      return {
        ...state,
        processing: true
      };
    }
    case types.queryReviewComplete: {
      return {
        ...state,
        page: (status === '0000' && payload instanceof Object) && payload || state.page,
        processing: false
      };
    }
    // 上传机构密钥
    case types.updateAgencyKey: {
      return {
        ...state,
        processing: true
      };
    }
    case types.updateAgencyKeyComplete: {
      return {
        ...state,
        processing: false
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);

