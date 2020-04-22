import {
  POST_LOADING,
  CLEAR_POSTS,
  FETCH_POSTS,
} from '../actions/types'

const defaultState = {
  posts: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case POST_LOADING:
          return {
            ...state,
            isLoading: action.payload
          }
        case CLEAR_POSTS:
          return {
            ...state,
            posts: [],
            totalCount: 0
          }
        case FETCH_POSTS:
            return {
              ...state,
              ...action.payload,
            };
        default:
            return state;
    }
};