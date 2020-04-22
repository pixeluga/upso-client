// Core
import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import common from './common';
import posts from './posts';


export default combineReducers({
    auth,
    common,
    posts,
});
