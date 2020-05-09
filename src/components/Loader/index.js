import React from 'react';
import loading from './loading.gif';

export default (props) => (
  <div>
    <img
      alt = ''
      height = '32px'
      src = { loading }
      width = '32px'
    />
    <span>Loading {props.title}...</span>
  </div>
);