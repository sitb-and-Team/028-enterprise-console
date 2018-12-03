import compose from './composeReducer';
import { channel as types } from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  processing: boolean;
  searchParams: object;
  /**
   * 通道标识
   */
  channelFlag: object;
  /**
   * 第一个通道标识
   */
  firstChannelFlag: string;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {},
  channelFlag: {
    content: []
  },
  firstChannelFlag: ''
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数 status状态码  success状态
  const {payload, type, status, success} = action;
  switch (type) {
    case types.startQuery: {
      return {
        ...state,
        processing: true,
        searchParams: {
          ...state.searchParams,
          ...type === types.startQuery && payload
        },
        page: {
          content: []
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
    // 请求通道标识
    case types.channelsComplete: {
      return {
        ...state,
        channelFlag: success && payload || state.channelFlag,
        firstChannelFlag: (success && payload.content[0] && payload.content[0].code) || state.firstChannelFlag
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
