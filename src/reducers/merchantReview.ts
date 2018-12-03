/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/5
 */
import compose from './composeReducer';
import { merchantReview as types } from '../constants/ActionTypes';

export interface StoreState {
  okPage: any;
  waitPage: any;
  waitProcessing: boolean;
  okProcessing: boolean;
  drawerVisible: boolean;
  okSearchParams: object;
  waitSearchParams: object;
}

const DEFAULT_STATE = {
  okPage: {
    content: [],
    size: 10,
    totalElements: 0
  },
  waitPage: {
    content: [],
    size: 10,
    totalElements: 0
  },
  waitProcessing: false,
  okProcessing: false,
  drawerVisible: false,
  okSearchParams: {},
  waitSearchParams: {}
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, status, success} = action;
  switch (type) {
    // 获取审核列表
    case types.startCheckReview: {
      return {
        ...state,
        waitProcessing: true
      };
    }
    // 等待
    case types.startQueryWait: {
      return {
        ...state,
        waitSearchParams: {
          ...state.waitSearchParams,
          ...type === types.startQueryWait && payload
        },
        waitProcessing: true
      };
    }
    case types.queryWaitComplete: {
      return {
        ...state,
        waitPage: (status === '0000' && payload instanceof Object) && payload || state.waitPage,
        waitProcessing: false
      };
    }
    // 成功失败
    case types.startQueryOk: {
      return {
        ...state,
        ...state,
        okSearchParams: {
          ...state.okSearchParams,
          ...type === types.startQueryOk && payload
        },
        okProcessing: true
      };
    }
    case types.queryOkComplete: {
      return {
        ...state,
        okPage: (status === '0000' && payload instanceof Object) && payload || state.okPage,
        okProcessing: false
      };
    }

    // 审核完毕动作
    case types.checkReviewComplete: {
      return {
        ...state,
        drawerVisible: !success,
        waitProcessing: false
      }
    }
    // drawer开关
    case types.drawerSwitch: {
      return {
        ...state,
        drawerVisible: payload
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);

