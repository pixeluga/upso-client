import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { cleanError } from '../../actions/posts';


export default () => {
  const error = useSelector(state => state.posts.error);
  const message = useSelector(state => state.posts.message);


  const dispatch = useDispatch();

  const [errorView, setErrorView] = useState();

  const [messageView, setMessageView] = useState();


  useEffect(() => {
    if (error) {
      setErrorView(
        <div className = 'mt-4 alert alert-warning alert-dismissible fade show' role='alert'>
          <strong>Mysterious mistake caught!</strong> { error && error.message ? error.message : '' }
          <button type = 'button' className = 'close' onClick = { () => dispatch(cleanError()) }>
            <span>&times;</span>
          </button>
        </div>
      );
    } else if (message) {
      setMessageView(
        <div className = 'mt-4 alert alert-primary alert-dismissible fade show' role='alert'>
          <strong>Greate!</strong> { message && message.message ? message.message : '' }
          <button type = 'button' className = 'close' onClick = { () => dispatch(cleanError()) }>
            <span>&times;</span>
          </button>
        </div>
      );
    }
    else {
      setErrorView();
      setMessageView();
    }    
  }, [dispatch, error, message]);

  useEffect(() => {
    return () => {
      if (error || message) {dispatch(cleanError())};
    }
  }, [dispatch, error, message])

  return (
    <>
    { errorView }
    { messageView }
    </>
)};