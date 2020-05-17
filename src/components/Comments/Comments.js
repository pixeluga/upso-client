import React from 'react';
import { useSelector } from 'react-redux';

// Components
import Comment from '../Comment';

export default ({ _parentId = '' }) => {
  const { comments } = useSelector(state => state.posts.post);

  const commentsArr = comments ? comments : [];

  const commentsMap = commentsArr.map((item) => (
    <Comment key = { item._id } comment = { item } />)
  );

  return (
    <div className = 'list-group list-group-flush'>
      { commentsMap }
    </div>
  )
};