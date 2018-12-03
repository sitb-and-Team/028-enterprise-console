/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/31
 */
import compose from './composeReducer';
import { systemRole as types } from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  processing: boolean;
  searchParams: object;
  resourcesObj: object;
  pathObj: object;
  selectRole: object;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {},
  resourcesObj: {},
  pathObj: {
    '0': {}
  },
  selectRole: {}
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
      let selectRole: any = state.selectRole;
      if (status === '0000' && payload instanceof Object) {
        const {content} = payload;
        page = payload;
        content.forEach(item => selectRole[item.id] = item.name);
      }
      console.log(selectRole);
      return {
        ...state,
        page,
        selectRole,
        processing: false
      };
    }
    case types.del:
    case types.startUpdate: {
      return {
        ...state,
        processing: true
      };
    }
    case types.delComplete:
    case types.updateComplete: {
      return {
        ...state,
        processing: false
      }
    }
    // 资源平台切换
    case types.resourcesChange: {
      return {
        ...state,
        resourcesObj: payload
      };
    }
    // 模块切换
    case types.pathChange: {
      let pathObj = {...state.pathObj};
      // 新增加的下标数据，覆盖之前的下标数据
      pathObj = {
        ...state.pathObj,
        [payload.index]: payload.pathObj
      };
      return {
        ...state,
        pathObj
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);

