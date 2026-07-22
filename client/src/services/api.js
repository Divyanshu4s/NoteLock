import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('notelock_user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const verifyOTP = (data) => api.post('/auth/verify-otp', data);
export const forgotPassword = (data) => api.post('/auth/forgot-password', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);
export const updateProfile = (data) => api.put('/auth/profile', data);

// Password Services
export const getPasswords = () => api.get('/passwords');
export const addPassword = (data) => api.post('/passwords', data);
export const updatePassword = (id, data) => api.put(`/passwords/${id}`, data);
export const deletePassword = (id) => api.delete(`/passwords/${id}`);

// Notes Services
export const getNotes = () => api.get('/notes');
export const addNote = (data) => api.post('/notes', data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);
export const deleteNote = (id) => api.delete(`/notes/${id}`);

export default api;
