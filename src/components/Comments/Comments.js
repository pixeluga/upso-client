import React from 'react';

// Components
import { Comment } from '../../components';

export default ({ comments = [] }) => {

  const commentsMap = comments.map((item) => (
    <Comment key = { item._id } comment = { item } />)
  );

  return (
    <div className = 'list-group list-group-flush'>
      { commentsMap }
    </div>
  )
};