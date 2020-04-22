import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Components
import {
  Loader,
  Posts
} from '../../components';

// Action Types
import {
  APP_LOAD,
} from '../../actions/types';

const mapStateToProps = (state) => ({
  appLoaded:   state.common.appLoaded,
  appName:     state.common.appName,

  currentUser: state.auth.user,

  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (token) =>
    dispatch({ type: APP_LOAD, token }),
});

const MainPage = (props) => {

  useEffect( () => {
    const token = window.localStorage.getItem('accessToken');

    props.onLoad(token ? token: null);       

  }, [props]);

  if (props.appLoaded) {
    return (
      <div className="row mt-4">
      <div className="col-md-6 mx-auto">          
        <Posts />
      </div>
    </div>
    )
  };

  return (
    <div className="row mt-4">
      <div className="col-md-6 mx-auto">          
        <Loader title = 'data' />
      </div>
    </div>
  )
  
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)