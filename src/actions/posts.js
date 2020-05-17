import api from '../api';

import { 
  FETCH_POSTS,
  POST_LOADING,
  CLEAR_POSTS,
  ADD_POST,
  GET_POST,
  DELETE_POST,
  UPDATE_POST,
  CLEAR_POST,

  EMIT_ERROR,
  CLEAN_ERROR,
  EMIT_MESSAGE,

  FILL_COMMENTS,
  UPDATE_COMMENTS,
} from '../actions/types'

// Sync
export const setPostLoading = (isLoading) => ({
  type: POST_LOADING,
  payload: isLoading
});

export const clearPosts = () => ({
  type: CLEAR_POSTS
})

export const fillPosts = (data) => ({
  type: FETCH_POSTS, 
  payload: data,
});

export const fillPost = (data) => ({
  type: GET_POST, 
  payload: data,
});

export const addPost = (post) => ({
  type: ADD_POST, 
  payload: post,
});

export const deletePost = (id) => ({
  type: DELETE_POST, 
  payload: id,
});

export const updatePost = (post) => (dispatch) => {
  dispatch({
    type: UPDATE_POST, 
    payload: post,
  });
};

export const clearPost = () => (dispatch) => {
  dispatch({
    type: CLEAR_POST, 
  });
};

export const cleanPosts = () => (dispatch) => {
  dispatch({
    type: CLEAR_POSTS,
  });
};

export const setError = (error) => ({
  type: EMIT_ERROR,
  payload: error,
});

export const cleanError = () => ({
  type: CLEAN_ERROR,
});

export const setMessage = (message) => ({
  type: EMIT_MESSAGE,
  payload: message,
});

export const addComment = (comment) => ({
  type: UPDATE_POST,
  payload: comment,
});

export const fillComments = (data) => ({
  type: FILL_COMMENTS, 
  payload: data,
});

export const updatePostComments = (comment) => (dispatch) => {
  dispatch({
    type: UPDATE_COMMENTS, 
    payload: comment,
  });
};



// Async
export const fetchPosts = (params) => async (dispatch) => {
  dispatch(setPostLoading(true))

  try {
    const data = await api.getPosts(params);

    dispatch(fillPosts(data));
    dispatch(setPostLoading(false));

  } catch (err) {
    dispatch(setError(err));
    dispatch(setPostLoading(false));
    dispatch(clearPosts());
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const data = await api.createPost(post);

    dispatch(addPost(data));
    dispatch(setMessage({message: data.message}));

  } catch (err) {
    dispatch(setError(err));
  }
}

export const getPostById = (id, history) => async (dispatch) => {
  dispatch(setPostLoading(true))

  try {
    const data = await api.getPost(id);

    dispatch(fillPost(data));
    dispatch(setPostLoading(false));

  } catch (err) {
    dispatch(setError(err));

    dispatch(setPostLoading(false));
    history.push('/404');
  }
};

export const removePost = (postId) => async (dispatch) => {
  try {
    const data = await api.removePost(postId);

    dispatch(setMessage({message: data.message}));

  } catch (err) {
    dispatch(setError(err));
  }
}

export const editPost = (post) => async (dispatch) => {
  try {
    const data = await api.updatePost(post);

    updatePost(data);
    dispatch(setMessage({message: data.message}));

  } catch (err) {
    dispatch(setError(err));
  }
}

export const createComment = (postId, comment) => async (dispatch) => {
  try {
    const data = await api.createComment(postId, comment);

    dispatch(updatePostComments(data.comment));

    dispatch(setMessage({message: data.message}));

  } catch (err) {
    dispatch(setError(err));
  }
}

export const getCommentsThread = (id, _id) => async (dispatch) => {
  dispatch(setPostLoading(true))

  try {
    // const data = await api.getPostComments(id, _id);

    // dispatch(fillComments(data));
    dispatch(setPostLoading(false));

  } catch (err) {
    dispatch(setError(err));

    dispatch(setPostLoading(false));
  }
};

export default {
  fetchPosts,
  fillPosts,
  cleanPosts,

  createPost,
  getPostById,
  removePost,
  deletePost,
  editPost,
  updatePost,
  clearPost,

  createComment,
}