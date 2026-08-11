export const getCleanMediaUrl = (url) => {
  if (!url) return null;
  const str = String(url).trim();
  if (str === '') return null;
  if (str.startsWith('/uploads/')) {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const serverHost = apiBase.replace(/\/api\/?$/, '');
    return `${serverHost}${str}`;
  }
  return str;
};
