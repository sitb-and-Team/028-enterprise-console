/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/15
 */
import compose from './composeReducer';
import { systemOperator as types } from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  processing: boolean;
  searchParams: object;
  selectOperator: object;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {},
  selectOperator: {}
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
      let page = state.page;
      let selectOperator: any = state.selectOperator;
      if (status === '0000' && payload instanceof Object) {
        const {content} = payload;
        page = payload;
        content.forEach(item => selectOperator[item.id] = item.name);
      }
      console.log(selectOperator);
      return {
        ...state,
        page,
        selectOperator,
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

