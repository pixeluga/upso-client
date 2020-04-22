import { APP_LOAD } from '../actions/types'

export default (dispatch) => ({
    appLoad: (token) =>
        dispatch({ type: APP_LOAD, token }),
});