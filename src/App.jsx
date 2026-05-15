import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SplashScreen from './pages/SplashScreen';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MyPetsPage from './pages/MyPetsPage';
import StorePage from './pages/StorePage';
import ServicesPage from './pages/ServicesPage';
import VetCarePage from './pages/VetCarePage';
import DashboardPage from './pages/DashboardPage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminApp from './admin/AdminApp';

import { supabase } from './supabaseClient';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onDone={() => setShowSplash(false)} />;
  }

  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
        <Routes>
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-sruvo-123/*" element={<AdminApp />} />
        
        <Route path="/*" element={
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<HomePage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="pets" element={<MyPetsPage />} />
                <Route path="store" element={<StorePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="vet" element={<VetCarePage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Route>
            </Routes>
        } />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
