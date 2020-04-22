import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import api from '../api';

// Sync
export const setCurrentUser = (user) => ({
  type:    SET_CURRENT_USER,
  payload: user,
});

// Async
export const register = (userData, history) => async () => {
  try {
    await api.register(userData);

    history.push('/login');
  } catch (e) {
    console.log(`😱 Axios request REGISTER failed: ${e}`);
  }  
};

export const login = (userData, history) => async (dispatch) => {
  try {
    const { token } = await api.login(userData);

    localStorage.setItem('accessToken', token)
    setAuthToken(token)

    const decoded = jwtDecode(token);
    dispatch(setCurrentUser(decoded));
    
    history.push('/');
  } catch (e) {
    console.log(`😱 Axios request LOGIN failed: ${e}`);
  }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('accessToken');
    setAuthToken(false);

    dispatch(setCurrentUser({}));
};
