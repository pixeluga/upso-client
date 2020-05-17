import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactQuillForm from '../ReactQuillForm';

import { createComment } from '../../../actions/posts';

export default ({ parentId = '' }) => {
  const { _id } = useSelector(state => state.posts.post);

  const dispatch = useDispatch();

  const postId = _id;

  const [body, setBody] = useState('');

  const onChangeQuill = (e) => {
    setBody(e);
  }

  const submitForm = (e) => {
    e.preventDefault();
    const comment = parentId ? { parentId, body } : { body };
    dispatch(createComment(postId, comment));
    setBody('');
  };

  return (
    <form className = 'mt-4' onSubmit = { submitForm }>
      <div className = 'form-group'>
        <label>Add your comment</label>
        <ReactQuillForm onChange = { onChangeQuill } body = { body }/>
      </div>

      <button type = 'submit' className = 'btn btn-primary'>Add comment</button>

    </form>
  )
};