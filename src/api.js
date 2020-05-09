import axios from 'axios';

// const API_ROOT = 'https://pxl-upso-back.herokuapp.com/';
const API_ROOT = 'http://localhost:8080';

const responseData = (res) => res.data;

export default {
  register: async (userData) => {
    const res = await axios.post(`${API_ROOT}/api/auth/register`, userData);
    return responseData(res);
  },

  login: async (userData) => {
    const res = await axios.post(`${API_ROOT}/api/auth/login`, userData);
    return responseData(res);
  },

  getPosts: async (params) => {
    const res = await axios.get(`${API_ROOT}/api/posts`, { params });
    return responseData(res);
  },

  getPost: async (id) => {
    const res = await axios.get(`${API_ROOT}/api/posts/${id}`);
    return responseData(res);
  },

  createPost: async (post) => {
    const res = await axios.post(`${API_ROOT}/api/posts`, post);
    return responseData(res);
  },

  removePost: async (id) => {
    const res = await axios.delete(`${API_ROOT}/api/posts/${id}`);
    return responseData(res);
  },

  updatePost: async (post) => {
    const res = await axios.put(`${API_ROOT}/api/posts`, post);
    return responseData(res);
  },
};