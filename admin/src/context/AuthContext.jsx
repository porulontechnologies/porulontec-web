import { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, getAdminProfile } from '../api/adminApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Purge old persistent localStorage tokens so opening the app link always forces /login
    localStorage.removeItem('porulon_admin_token');
    localStorage.removeItem('porulon_admin_user');

    const token = sessionStorage.getItem('porulon_admin_token');

    if (token && token !== 'demo_token') {
      getAdminProfile()
        .then((res) => {
          setUser(res.data);
          sessionStorage.setItem('porulon_admin_user', JSON.stringify(res.data));
        })
        .catch(() => {
          sessionStorage.removeItem('porulon_admin_token');
          sessionStorage.removeItem('porulon_admin_user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      sessionStorage.removeItem('porulon_admin_token');
      sessionStorage.removeItem('porulon_admin_user');
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginAdmin({ email, password });
      sessionStorage.setItem('porulon_admin_token', res.data.token);
      sessionStorage.setItem('porulon_admin_user', JSON.stringify(res.data));
      setUser(res.data);
      return res.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        throw new Error(err.response.data?.message || 'Invalid email or password');
      }

      // Fallback demo admin login if backend server is offline or unreachable
      if (email === 'admin@porulon.com' && (password === 'admin123' || password === 'admin')) {
        const fallbackUser = { name: 'Super Admin', email: 'admin@porulon.com', role: 'admin', token: 'demo_token' };
        sessionStorage.setItem('porulon_admin_token', 'demo_token');
        sessionStorage.setItem('porulon_admin_user', JSON.stringify(fallbackUser));
        setUser(fallbackUser);
        return fallbackUser;
      }
      throw new Error(err.response?.data?.message || err.message || 'Login failed. Please check credentials or backend server status.');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('porulon_admin_token');
    sessionStorage.removeItem('porulon_admin_user');
    localStorage.removeItem('porulon_admin_token');
    localStorage.removeItem('porulon_admin_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
