import React, { useState } from 'react';

export default ({ initText, toggleText, callback, classes }) => {

  const [_buttonText, _toggleButtonText] = useState(initText);

  const _toogleAction = () => {
    if(_buttonText === initText) {
      callback(true);
      _toggleButtonText(toggleText);
    } else {
      callback(false);
      _toggleButtonText(initText);
    }
  }

  return (
    <button
      type = 'button'
      className = { classes }
      onClick = { _toogleAction } >
        {_buttonText}
    </button>
  )
}