// Core
import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import posts from './posts';


export default combineReducers({
    auth,
    posts,
});
