import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import postsActions from '../../actions/posts';

export default ({_id, title, body, user, currentUser }) => {
      
  const dispatch = useDispatch();

  const bodyRef = useRef(null);

  const setPostBody = (body) => {
    bodyRef.current ? bodyRef.current.innerHTML = body : bodyRef.current = '';
  }

  const buttonsRender = user._id === currentUser.id ? <div className = "btn-group" role="group" aria-label="post actions buttons">
                  <Link to = { `/edit/${_id}` }
                    className = 'btn btn-light'>
                    <i className = 'far fa-edit'></i>
                  </Link>
                  <button
                    type = 'button'
                    className = 'btn btn-light'
                    onClick = { 
                      () => {
                        dispatch(postsActions.removePost(_id))
                        dispatch(postsActions.deletePost(_id))
                      }
                    }>
                    <i className = 'fas fa-trash'></i>
                  </button>
                </div> : <></>

  useEffect(() => {
    setPostBody(body);
  }, [body]);
    
  return (  
    <div className = "row justify-content-md-center">
      <div className = "col">
        <h5>
          <Link to = { `/posts/${_id}` }>
            { title }
          </Link>
        </h5>
        <div ref = { bodyRef } ></div>
      </div>

      <div className = "col-md-auto">
        <div className = 'user-info'>{ user.name }</div>
        { buttonsRender }
      </div>
    </div>
)};
