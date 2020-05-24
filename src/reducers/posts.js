import {
  LOADING,
  POST_LOADING,
  CLEAR_POSTS,
  FETCH_POSTS,
  GET_POST,
  DELETE_POST,
  UPDATE_POST,
  CLEAR_POST,
  EMIT_MESSAGE,
  EMIT_ERROR,
  CLEAN_ERROR,

  UPDATE_ANSWERS,
  UPDATE_COMMENTS,
  // FILL_COMMENTS,
  DELETE_COMMENT,
} from '../actions/types'

const defaultState = {
  postsArray: [],
  post: {},
  isLoading: false,
  isPostLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case POST_LOADING:
      return {
        ...state,
        isPostLoading: action.payload
      }
    case CLEAR_POSTS:
      return {
        ...state,
        postsArray: [],
        total: 0
      }
    case FETCH_POSTS:
      return {
        ...state,
        postsArray: action.payload.posts,
        total: action.payload.total,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        postsArray: state.postsArray.filter((post) => post._id !== action.payload),
      };
    case UPDATE_POST:
      return {
        ...state,
        post: action.payload,
        postsArray: [], // Posts - is another page, which will load all posts from server anyway
      };
    case UPDATE_ANSWERS:
      return {
        ...state,
        post: {
          ...state.post,
          answers: [action.payload, ...state.post.answers],
        },
      };
    case UPDATE_COMMENTS:
      // console.log('reducer', action.payload);
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments ? [action.payload, ...state.post.comments] : [action.payload],
        },
      };
    // case FILL_COMMENTS:
    //   return {
    //     ...state,
    //     post: {
    //       ...state.post,
    //       comments: newCommentsArr,
    //     },
    //   };
    case DELETE_COMMENT:
      const newAnswers = state.post.answers ? state.post.answers.filter((item) => item._id !== action.payload) : '';
      const newComments = state.post.comments ? state.post.comments.filter((item) => item._id !== action.payload) : '';

      return {
        ...state,
        post: {
          ...state.post,
          answers: newAnswers,
          comments: newComments,
        },
      };
    case CLEAR_POST:
      return {
        ...state,
        post: {},
      };
    case EMIT_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case EMIT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAN_ERROR:
      delete state.error
      delete state.message

      // console.log('object', Object.entries(state).map( (i, v) => v[i].toString ))
      // .filter( (key, val) => key !== action.error ))

      return { ...state}
      //   Object.entries(state).filter( (val) => val.id !== action.error )
      // };
    default:
      return state;
  }
};