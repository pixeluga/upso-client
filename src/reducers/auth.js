import {
  SET_CURRENT_USER,
} from '../actions/types';

const initialState = {
  appLoaded: false,
  token: null,

  isAuthenticated: false,
  user:   {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length !== 0,
        user:   action.payload,
      };
    default:
      return state;
  }
};
