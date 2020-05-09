import React from 'react';

// Components
import { Posts, Toast } from '../../components';

export default () => {
  return (
    <>
      <Toast />
      <div className="row mt-4">
        <div className="col mx-auto">    
          <Posts />
        </div>
      </div>
    </>
  )  
};