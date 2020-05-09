import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Components
import { EditPostForm, Toast } from '../../components';

export default ({ match, history }) => {
  const auth = useSelector(state => state.auth);
      
  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push('/login');
    };
  }, [auth, history]);

  return (
    <>
      <Toast />
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          <EditPostForm
            history = { history }
            match = { match } />
        </div>
      </div>
    </>
  )   
};
