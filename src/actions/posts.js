import api from '../api';

import { 
  FETCH_POSTS,
  POST_LOADING,
  CLEAR_POSTS,
} from '../actions/types'

const setPostLoading = (isLoading) => ({
  type: POST_LOADING,
  payload: isLoading
});

const clearPosts = () => ({
  type: CLEAR_POSTS
})

const fillPosts = (data) => ({
  type: FETCH_POSTS, 
  payload: data,
});

const fetchPosts = () => async (dispatch) => {
  dispatch(setPostLoading(true))

  try {
    const data = await api.getPosts();
    console.log('data', data)
    
    dispatch(fillPosts(data));

  } catch (err) {
    console.log('err', err);

    dispatch(setPostLoading(false))
    dispatch(clearPosts())
  }
};


export default {
  fetchPosts,
  fillPosts,
}