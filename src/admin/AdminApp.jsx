import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Pets from './pages/Pets';
import Store from './pages/Store';
import Services from './pages/Services';
import Bookings from './pages/Bookings';
import VetCare from './pages/VetCare';
import Community from './pages/Community';
import AdminSettings from './pages/AdminSettings';

const ALLOWED_ADMIN_EMAIL = 'admin@sruvo.com';

export default function AdminApp() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      navigate('/admin-login');
      return;
    }

    if (session.user.email !== ALLOWED_ADMIN_EMAIL) {
      navigate('/');
      return;
    }

    setAuthorized(true);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--primary)' }}>Loading Admin...</div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="admin-layout">
      <Sidebar onLogout={handleLogout} />
      <div className="admin-main">
        <Topbar />
        <main className="admin-content fade-in">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<Users />} />
            <Route path="pets" element={<Pets />} />
            <Route path="store" element={<Store />} />
            <Route path="services" element={<Services />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="vetcare" element={<VetCare />} />
            <Route path="community" element={<Community />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
