export const getCleanMediaUrl = (url) => {
  if (!url) return null;
  const str = String(url).trim();
  if (str === '') return null;
  if (str.startsWith('/uploads/')) {
    const apiBase = import.meta.env.VITE_API_URL || '/api';
    const serverHost = apiBase.replace(/\/api\/?$/, '');
    return `${serverHost}${str}`;
  }
  return str;
};
