import compose from './composeReducer';
import { session as types } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  /**
   * 判断是否跳转到登录
   */
  hasLogin: false,
  agencies: [],

  childrenAgencies: [],
  /**
   * 下拉框选择时从服务端获取的资源信息
   */
  selectResource: []
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export default compose((state = DEFAULT_STATE, action) => {
  const {payload, type, status, success} = action;
  switch (type) {
    // 获取个人机构信息start
    case types.startProfile:
      return {
        ...state,
        hasLogin: false
      };
    // 获取个人机构信息end
    case types.profileComplete: {
      return {
        ...state,
        hasLogin: !success,
        agencies: success && payload || state.agencies
      }
    }
    // 获取下级机构
    case types.getChildrenAgencyComplete: {
      return {
        ...state,
        childrenAgencies: (success && status === '0000' && payload instanceof Object) ? payload : state.childrenAgencies
      };
    }
    // 获取交易平台 资源列表
    case types.getResourcesComplete: {
      return {
        ...state,
        selectResource: success ? payload : []
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
