import axios from 'axios';
import { services as defaultServices } from '../data/services';
import { trainingPrograms as defaultTraining } from '../data/training';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 25000,
});

export const fetchSiteSettings = async () => {
  try {
    const res = await api.get('/settings');
    return res.data;
  } catch (err) {
    return null;
  }
};

export const fetchServices = async () => {
  try {
    const res = await api.get('/services');
    const list = Array.isArray(res.data) ? res.data : (Array.isArray(res.data?.services) ? res.data.services : (Array.isArray(res.data?.data) ? res.data.data : null));
    return list && list.length > 0 ? list : defaultServices;
  } catch (err) {
    return defaultServices;
  }
};

export const fetchServiceBySlug = async (slug) => {
  try {
    const res = await api.get(`/services/${slug}`);
    if (res.data) return res.data;
  } catch (err) {}
  return defaultServices.find((s) => s.slug === slug);
};

export const fetchTraining = async () => {
  try {
    const res = await api.get('/training');
    const list = Array.isArray(res.data) ? res.data : (Array.isArray(res.data?.training) ? res.data.training : (Array.isArray(res.data?.data) ? res.data.data : null));
    return list && list.length > 0 ? list : defaultTraining;
  } catch (err) {
    return defaultTraining;
  }
};

export const fetchTrainingBySlug = async (slug) => {
  try {
    const res = await api.get(`/training/${slug}`);
    if (res.data) return res.data;
  } catch (err) {}
  return defaultTraining.find((t) => t.slug === slug);
};

export const fetchSections = async (page = 'home') => {
  try {
    const res = await api.get(`/sections/public?page=${page}`);
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.sections)) return res.data.sections;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  } catch (err) {
    return [];
  }
};

export const fetchBlogs = async (params = {}) => {
  try {
    const res = await api.get('/blogs', { params });
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.blogs)) return res.data.blogs;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  } catch (err) {
    return [];
  }
};

export const fetchBlogBySlug = async (slug) => {
  try {
    const res = await api.get(`/blogs/article/${slug}`);
    return res.data || null;
  } catch (err) {
    return null;
  }
};

export const submitContactInquiry = async (formData) => {
  try {
    const res = await api.post('/contact', formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default api;
