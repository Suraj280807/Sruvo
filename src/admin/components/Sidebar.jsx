import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, PawPrint, ShoppingBag, Scissors,
  Calendar, Stethoscope, MessageSquare, Settings, ChevronRight,
  Bell, Search, LogOut, TrendingUp
} from 'lucide-react';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { path: '', icon: LayoutDashboard, label: 'Dashboard', badge: null },
      { path: 'analytics', icon: TrendingUp, label: 'Analytics', badge: null },
    ]
  },
  {
    label: 'Management',
    items: [
      { path: 'users', icon: Users, label: 'Users', badge: '7', badgeType: null },
      { path: 'pets', icon: PawPrint, label: 'Pets', badge: null },
      { path: 'store', icon: ShoppingBag, label: 'Store', badge: '2', badgeType: 'warning' },
      { path: 'services', icon: Scissors, label: 'Services', badge: null },
      { path: 'bookings', icon: Calendar, label: 'Bookings', badge: '5', badgeType: 'danger' },
    ]
  },
  {
    label: 'Medical & Social',
    items: [
      { path: 'vetcare', icon: Stethoscope, label: 'Vet Care', badge: null },
      { path: 'community', icon: MessageSquare, label: 'Community', badge: '1', badgeType: 'danger' },
    ]
  },
  {
    label: 'System',
    items: [
      { path: 'settings', icon: Settings, label: 'Settings', badge: null },
    ]
  }
];

export default function Sidebar({ onLogout }) {
  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">🐾</span>
        <div>
          <div className="sidebar-logo-name">Sruvo</div>
        </div>
        <span className="sidebar-logo-tag">Admin</span>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {navGroups.map(group => (
          <div key={group.label} className="sidebar-section">
            <div className="sidebar-section-label">{group.label}</div>
            {group.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <item.icon size={16} className="sidebar-nav-icon" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`sidebar-badge ${item.badgeType || ''}`}>{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-admin-profile" onClick={onLogout}>
          <div className="sidebar-admin-avatar">SA</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div className="sidebar-admin-name">Super Admin</div>
            <div className="sidebar-admin-role">admin@sruvo.com</div>
          </div>
          <LogOut size={14} color="var(--text-muted)" />
        </div>
      </div>
    </aside>
  );
}
