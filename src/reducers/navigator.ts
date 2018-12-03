import compose from './composeReducer';
import { navigator as types } from '../constants/ActionTypes';

export interface StoreState {
  router: object
}

const DEFAULT_STATE = {
  router: {}
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export default compose((state = DEFAULT_STATE, action): StoreState => {
  switch (action.type) {
    case types.navigate: {
      const router = {...state.router};
      if (typeof action.payload === 'string') {
        router[action.payload] = null;
      } else {
        router[action.payload.routeName] = action.payload.params;
      }
      return {
        router
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
