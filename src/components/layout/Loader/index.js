import React from 'react';
import loading from './loading.gif';

export default (props) => (
  <div className = 'd-flex justify-content-center'>
    <img
      alt = ''
      height = '32px'
      src = { loading }
      width = '32px'
    />
    <span>Loading {props.title}...</span>
  </div>
);