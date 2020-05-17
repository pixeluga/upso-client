import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default ({onChange, body = ''}) => {
  const [_body, setBody] = useState(body);

  const _onChangeBody = (e) => {
    setBody(e);
    onChange(e);
  }

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