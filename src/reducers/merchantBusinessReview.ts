/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/9
 */
import compose from './composeReducer';
import { merchantBusinessReview as types } from '../constants/ActionTypes';

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

// 生成审核数据，添加商户信息
function generateReview(payload) {
  const newPayload = payload;
  // 判断id，组合新数据
  newPayload.content.forEach(merchantDatas => {
    newPayload.value.forEach(merchantInfos => {
      if (merchantInfos.id === merchantDatas.merchantId) {
        merchantDatas.after.merchantNo = merchantInfos.merchantNo;
        merchantDatas.after.merchantName = merchantInfos.merchantName;
      }
    })
  });
  return newPayload;
}

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, success} = action;
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
    // 请求待审核
    case types.queryWaitComplete: {
      // 默认值
      let waitPage = state.waitPage;
      if (success && payload instanceof Object) {
        // 遍历添加商户信息
        waitPage = generateReview(payload);
      }
      return {
        ...state,
        waitPage,
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
      let okPage = state.okPage;
      if (success && payload instanceof Object) {
        okPage = generateReview(payload);
      }
      return {
        ...state,
        okPage,
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


