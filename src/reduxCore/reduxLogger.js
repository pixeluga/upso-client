// Core
import { applyMiddleware, compose } from 'redux';

// Middleware
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';

// Add Redux Logger
const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        naxtState: () => '#A47104',
        error:     () => '#FF0005',
    },
});

// Add Chrome Devtools
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const __DEV__ = process.env.NODE_ENV === 'development';
const composeEnhancers = __DEV__ && devtools ? devtools : compose;

const middleware = [thunk];

if (__DEV__) {
    middleware.push(logger);
}

export default composeEnhancers(applyMiddleware(...middleware));
