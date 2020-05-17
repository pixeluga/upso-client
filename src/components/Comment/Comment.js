import React, { useState } from 'react';

// Components
import Comments from '../Comments'

export default ({comment}) => {
  const [comments, setComments] = useState('');
  const [showTreadButtonTxt, toggleButtonTxt] = useState('Show Tread');

  const _showTread = () => {
    if(showTreadButtonTxt === 'Show Tread') {
      setComments(<Comments _parent = {comment._id} />);
      toggleButtonTxt('Hide Tread');
    } else {
      setComments();
      toggleButtonTxt('Show Tread');
    }
  }

  return (
    <div className = 'm-2'>
      <article>{ comment.body }</article>

      <div>
        { comments }
      </div>

      <button
        onClick = { _showTread }
      >
        { showTreadButtonTxt }</button>
    </div>
  )
}