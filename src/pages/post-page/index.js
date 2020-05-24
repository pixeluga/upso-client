import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import {
  Loader,
  AddCommentForm,
  Comments,
  Toast,
} from '../../components/'

// Actions
import {
  getPostById,
  clearPost
} from '../../actions/posts';

export default ({ match, history }) => {
  const dispatch = useDispatch();
  const bodyRef = useRef(null);
  const posts = useSelector(state => state.posts);
      
  const setPostBody = (body) => {
    bodyRef.current ? bodyRef.current.innerHTML = body : bodyRef.current = '';
  }

  useEffect(() => {
    if (match.params.id) {
      dispatch(getPostById(match.params.id, history));
    }
  }, [dispatch, history, match.params.id]);

  useEffect(() => {
    setPostBody(posts.post.body);
  }, [posts.post.body]);

  useEffect(() => {
    return () => {
      dispatch(clearPost());
    }
  }, [dispatch])

  return !posts.isPostLoading && posts.post !== '' ? (
    <>
      <Toast />

      <div className = 'card mt-4'>
        <div className = 'card-title p-3 border-bottom'>
          <h5>{posts.post.title}</h5>
        </div>

        <div className = 'card-body'>
          <div ref = { bodyRef } ></div>
        </div>

        <div className = 'card-footer d-flex justify-content-end'>
            <Link to = { `/edit/${posts.post._id}` }
              className = 'btn btn-sm btn-light'>
              <i className = 'far fa-edit'></i> Edit post
            </Link>
            <button
              type = 'button'
              className = 'btn btn-sm btn-danger ml-2'>
              <i className = 'fas fa-trash'></i> Delete post
            </button>
        </div>
      </div>

      <AddCommentForm />

      <h3>31 Answers</h3>

      <Comments parentId = 'post' comments = { posts.post.answers } />
    </>
):  <Loader title = 'post' />
};