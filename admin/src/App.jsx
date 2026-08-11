import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SectionsManager from './pages/SectionsManager.jsx';
import ServicesManager from './pages/ServicesManager.jsx';
import TrainingManager from './pages/TrainingManager.jsx';
import SettingsManager from './pages/SettingsManager.jsx';
import ContactManager from './pages/ContactManager.jsx';
import MediaManager from './pages/MediaManager.jsx';
import BlogsManager from './pages/BlogsManager.jsx';

function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center text-slate-300 text-sm font-medium">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Admin Portal...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#0a0d14] text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sections" element={<SectionsManager />} />
          <Route path="/services" element={<ServicesManager />} />
          <Route path="/training" element={<TrainingManager />} />
          <Route path="/blogs" element={<BlogsManager />} />
          <Route path="/settings" element={<SettingsManager />} />
          <Route path="/messages" element={<ContactManager />} />
          <Route path="/media" element={<MediaManager />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
