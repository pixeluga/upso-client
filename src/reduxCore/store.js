import { createStore } from 'redux'

// Middleware
import enhancedStore from './reduxLogger';

import rootReducer from '../reducers'

export default createStore(rootReducer, {}, enhancedStore)