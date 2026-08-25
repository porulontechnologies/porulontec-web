import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('porulon_admin_token') || localStorage.getItem('porulon_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('porulon_admin_token');
      sessionStorage.removeItem('porulon_admin_user');
      localStorage.removeItem('porulon_admin_token');
      localStorage.removeItem('porulon_admin_user');
    }
    return Promise.reject(error);
  }
);

export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const getAdminProfile = () => api.get('/auth/profile');
export const updateAdminProfile = (data) => api.put('/auth/profile', data);

export const getSiteSettings = () => api.get('/settings');
export const updateSiteSettings = (data) => api.put('/settings', data);

export const getSections = () => api.get('/sections/all');
export const getArchivedSections = () => api.get('/sections/trash');
export const createSection = (data) => api.post('/sections', data);
export const updateSection = (id, data) => api.put(`/sections/${id}`, data);
export const deleteSection = (id) => api.delete(`/sections/${id}`);
export const restoreArchivedSection = (id) => api.put(`/sections/restore/${id}`);
export const permanentDeleteSection = (id) => api.delete(`/sections/permanent/${id}`);
export const restoreDefaultSections = (page = 'home') => api.post('/sections/restore-defaults', { page });

export const getServices = () => api.get('/services');
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

export const getTraining = () => api.get('/training');
export const createTraining = (data) => api.post('/training', data);
export const updateTraining = (id, data) => api.put(`/training/${id}`, data);
export const deleteTraining = (id) => api.delete(`/training/${id}`);

export const getBlogs = () => api.get('/blogs/admin/all');
export const createBlog = (data) => api.post('/blogs', data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
export const restoreDefaultBlogs = () => api.post('/blogs/admin/restore-defaults');
export const getMediaFiles = () => api.get('/media');
export const uploadMediaFile = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const deleteMediaFile = (id) => api.delete(`/media/${id}`);

export const getContactMessages = () => api.get('/contact');
export const updateMessageStatus = (id, status) => api.put(`/contact/${id}`, { status });
export const deleteContactMessage = (id) => api.delete(`/contact/${id}`);

export const getMedia = () => api.get('/media');
export const uploadMedia = (formData) => api.post('/media/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const deleteMedia = (id) => api.delete(`/media/${id}`);

export const getHealth = () => api.get('/health');

export default api;
