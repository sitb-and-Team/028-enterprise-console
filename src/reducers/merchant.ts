import compose from './composeReducer';
import { merchant as types } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {},
  /**
   * 修改状态
   */
  statusVisible: false,
  /**
   * 上传公钥
   */
  publicKeyVisible: false,
};

export default compose((state = DEFAULT_STATE, action) => {
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
    // 开启关闭弹框动作
    case types.openModal: {
      const {key, visible} = payload;
      return {
        ...state,
        [key]: visible
      }
    }
    // 开启loading
    case types.startPersist:
    case types.startStatus:
    case types.startUploadPublicKey: {
      return {
        ...state,
        processing: true
      };
    }
    case types.persistComplete: {
      return {
        ...state,
        processing: false
      };
    }
    // 修改商户状态
    case types.statusComplete: {
      return {
        ...state,
        processing: false,
        statusVisible: !success
      };
    }
    // 上传公钥
    case types.uploadPublicKeyComplete: {
      return {
        ...state,
        processing: false,
        publicKeyVisible: !success,
        publicKeyValue: success && ''
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
