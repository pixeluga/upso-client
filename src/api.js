import axios from 'axios';

// const API_ROOT = 'https://pxl-upso-back.herokuapp.com/';
const API_ROOT = 'http://localhost:8080';

const responseData = (res) => res.data;

const api = {
    register: async (userData) => {
        const res = await axios
                .post(`${API_ROOT}/api/auth/register`, userData);
        return responseData(res);
    },

    login: async (userData) => {
        const res = await axios
                            .post(`${API_ROOT}/api/auth/login`, userData);
        return responseData(res);
    },

    getPosts: async (params) => {
        const res = await axios
                            .get(`${API_ROOT}/api/posts`, { params });
        console.log('api getPosts: ', res);
        return responseData(res);
    }
}

export default api;
