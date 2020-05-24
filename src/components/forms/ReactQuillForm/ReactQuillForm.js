import React, { useState, useEffect } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default ({onChange, body = ''}) => {
  const [_body, setBody] = useState(body);

  const _onChangeBody = (e) => {
    setBody(e);
    onChange(e);
  }

// Cleaning up the _body in ReactQuill
  useEffect(() => {
    if (!body) {
      setBody();
    }
  }, [body])

  return (
    <ReactQuill
      placeholder = 'Your text'
      modules = {{
        toolbar: [
          ['bold', 'italic', 'underline', 'strike', 'code'],
          ['link', 'image'],
          ['clean']
        ]
      }}
      value = { _body }
      onChange = { _onChangeBody }
    />
)};