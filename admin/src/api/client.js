import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginAdmin = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    if (res.data && res.data.token) {
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify(res.data.user || res.data));
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken') || 'demo-admin-token-123';
  return { Authorization: `Bearer ${token}` };
};


// Services API
export const fetchServices = async () => {
  const res = await api.get('/services');
  return res.data || [];
};

export const createService = async (data) => {
  const res = await api.post('/services', data, { headers: getAuthHeaders() });
  return res.data;
};

export const updateService = async (id, data) => {
  const res = await api.put(`/services/${id}`, data, { headers: getAuthHeaders() });
  return res.data;
};

export const deleteService = async (id) => {
  const res = await api.delete(`/services/${id}`, { headers: getAuthHeaders() });
  return res.data;
};

// Blogs API
export const fetchBlogs = async () => {
  const res = await api.get('/blogs');
  return res.data || [];
};

export const createBlog = async (data) => {
  const res = await api.post('/blogs', data, { headers: getAuthHeaders() });
  return res.data;
};

export const updateBlog = async (id, data) => {
  const res = await api.put(`/blogs/${id}`, data, { headers: getAuthHeaders() });
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`, { headers: getAuthHeaders() });
  return res.data;
};

// Contact Messages API
export const fetchContactMessages = async () => {
  try {
    const res = await api.get('/contact/messages', { headers: getAuthHeaders() });
    return res.data || [];
  } catch (err) {
    return [];
  }
};

export const updateContactStatus = async (id, status) => {
  const res = await api.put(`/contact/messages/${id}`, { status }, { headers: getAuthHeaders() });
  return res.data;
};

export const deleteContactMessage = async (id) => {
  const res = await api.delete(`/contact/messages/${id}`, { headers: getAuthHeaders() });
  return res.data;
};

export default api;
