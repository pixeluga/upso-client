import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

// Components
import { Loader, Comments, AddCommentForm, ToogleButton } from '../../components';

import postsActions from '../../actions/posts';

export default ({ comment }) => {
  const dispatch = useDispatch();
  
  const { isLoading } = useSelector(state => state.posts);
  const { _id, comments } = useSelector(state => state.posts.post);
  const authorId = useSelector(state => state.posts.post.user._id);
  const userId = useSelector(state => state.auth.user.id);
  
  const commentBodyRef = useRef(null);

  const setCommentBody = (body) => {
    commentBodyRef.current ? commentBodyRef.current.innerHTML = body : commentBodyRef.current = '';
  };

  useEffect(() => {
    setCommentBody(comment.body);
  }, [comment.body]);
 
  const [_showTreadFlag, _setShowTreadFlag] = useState(true);
  const [commentsView, setComments] = useState('');

  const _showTread = () => {
    if(_showTreadFlag && _id && comment._id) {
      dispatch(postsActions.getCommentsThread(_id, comment._id));
    } else {
      setComments();
    }
    _setShowTreadFlag(!_showTreadFlag);
  }

  const [_addCommentView, setAddCommentView] = useState('');

  const _addComment = (flag) => {
    if (flag) {
      setAddCommentView(<AddCommentForm parentId = { comment._id } />);
    } else {
      setAddCommentView('');
    }
  }
  
  useEffect(() => {
    if (comments) {
      const commentsArray = comments.find(item => item.parentId === comment._id);
      if (!_showTreadFlag && commentsArray && commentsArray.comments) {
        setComments(<Comments parentId = { comment._id } comments = { commentsArray.comments } />);
      } else {
        setComments();
      }
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments, comment._id]);

  return (
    <div className = 'border mb-2 p-3 '>
      { 
        userId === authorId ?
          <div className = 'd-flex justify-content-end'>
            <button
              type = 'button'
              className = 'btn btn-sm btn-light'
              onClick = { 
                () => {
                  alert('edit')
                }
              } >
                <i className = 'fas fa-edit'></i>
            </button>
            <button
              type = 'button'
              className = 'btn btn-sm btn-light ml-2'
              onClick = { 
                () => {
                  let conf = window.confirm('Realy delete?');
                  if (conf){
                    dispatch(postsActions.removeComment(_id, comment._id))
                    dispatch(postsActions.deleteComment(comment._id))
                  }
                }
              } >
                <i className = 'fas fa-trash'></i>
            </button>
          </div> : ''
        }

      <article ref = { commentBodyRef }></article>

      <div className = 'm-4'>
        {/* { 
          // activeId === comment._id &&
          !_showTreadFlag &&
          isLoading && (<Loader title = 'comments'/>)
        } */}

        { commentsView }
      </div>

      <div className = 'd-flex justify-content-end'>
        
        <div className = 'btn-group btn-group-sm' role = 'group' aria-label = 'Comment buttons'>
          <ToogleButton
            classes = 'btn btn-light ml-2'
            initText = 'Add comment'
            toggleText = 'Hide comment form'
            callback = { _addComment }
          />
          
          <ToogleButton
            classes = 'btn btn-light'
            initText = 'Show Tread'
            toggleText = 'Hide Tread'
            callback = { _showTread }
          />
        </div>


      </div>

      { _addCommentView }

    </div>
  )
}