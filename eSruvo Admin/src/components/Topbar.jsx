import { useLocation } from 'react-router-dom';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';

const pageTitles = {
  '/': 'Dashboard',
  '/analytics': 'Analytics',
  '/users': 'Users',
  '/pets': 'Pets',
  '/store': 'Store',
  '/services': 'Services',
  '/bookings': 'Bookings',
  '/vetcare': 'Vet Care',
  '/community': 'Community',
  '/settings': 'Settings',
};

export default function Topbar() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Admin';

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          Sruvo Admin &nbsp;/&nbsp; <span>{title}</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div className="topbar-search">
          <Search size={14} className="topbar-search-icon" />
          <input type="text" placeholder="Search users, pets, bookings..." />
        </div>
      </div>

      <div className="topbar-right">
        <button className="topbar-icon-btn">
          <Bell size={18} />
          <span className="topbar-notif-dot" />
        </button>
        <button className="topbar-icon-btn">
          <Settings size={18} />
        </button>
        <div className="topbar-admin">
          <div className="topbar-admin-avatar">SA</div>
          <span className="topbar-admin-name">Super Admin</span>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>
      </div>
    </header>
  );
}
