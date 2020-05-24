import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactQuillForm from '../ReactQuillForm';

import { createAnswerOrComment } from '../../../actions/posts';

export default ({ parentId = '' }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector(state => state.posts.post);

  const [body, setBody] = useState('');

  const onChangeQuill = (e) => {
    setBody(e);
  }

  const submitForm = (e) => {
    e.preventDefault();

    if (!body || body === '<p><br></p>') {
      // Need to insert something NORMAL like Toast with ERROR
      alert('Body must be not empty!');
    } else {
      const flag = parentId ? true : false;
      const comment = parentId ? { parentId, body } : { body };
      dispatch(createAnswerOrComment(flag, _id, comment));
      setBody('');
    }
  };

  return (
    <form className = 'my-4' onSubmit = { submitForm }>
      <div className = 'form-group'>
        <label>Add your comment</label>
        <ReactQuillForm onChange = { onChangeQuill } body = { body }/>
      </div>

      <button type = 'submit' className = 'btn btn-primary'>Add comment</button>

    </form>
  )
};