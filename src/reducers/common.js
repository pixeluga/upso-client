import {
    APP_LOAD,
    LOGOUT,
    LOGIN
} from '../actions/types';

const defaultState = {
    appName: 'UPSO',
    appLoaded: false,
    homepage: '',
    token: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token:       action.token || null,
                appLoaded:   true,
            };
        case LOGIN:
            return {
                ...state,
                token:       action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user,
            };
        case LOGOUT:
            return {
                ...state,
                token:       null,
                currentUser: null,
            };
        default:
            return state;
    }
};