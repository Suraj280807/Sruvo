import { useState, useEffect } from 'react';
import { User, Bell, Shield, Moon, Sun, Smartphone, CreditCard, HelpCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './SettingsPage.css';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
    promotions: false
  });
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark-theme'));

  const toggleDarkMode = (isDark) => {
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Sun size={18} /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={18} /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={18} /> }
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(() => localStorage.getItem('user_phone') || '');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || '';
        setName(fullName);
      }
    };
    fetchUser();
  }, []);

  const handleSaveAccount = () => {
    localStorage.setItem('user_phone', phone);
    setSaveStatus('Saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="settings-page fade-in">
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Settings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Manage your account preferences and settings</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar card">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content card">
          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Details</h2>
              <div className="settings-form">
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" className="input-field" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" className="input-field" value={email} disabled style={{ backgroundColor: 'var(--border-light)', cursor: 'not-allowed', color: 'var(--text-muted)' }} />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="tel" className="input-field" placeholder="Add your mobile number" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                  <button className="btn btn-primary" onClick={handleSaveAccount}>Save Changes</button>
                  {saveStatus && <span className="fade-in" style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: '600' }}>{saveStatus}</span>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <div className="settings-toggles">
                <div className="toggle-row">
                  <div>
                    <div style={{ fontWeight: 600 }}>Push Notifications</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Get alerts on your device for updates</div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.push} onChange={() => setNotifications({...notifications, push: !notifications.push})} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="toggle-row">
                  <div>
                    <div style={{ fontWeight: 600 }}>Email Newsletter</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Receive weekly pet care tips</div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="toggle-row">
                  <div>
                    <div style={{ fontWeight: 600 }}>SMS Alerts</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Get SMS for vet appointment reminders</div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.sms} onChange={() => setNotifications({...notifications, sms: !notifications.sms})} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="toggle-row">
                  <div>
                    <div style={{ fontWeight: 600 }}>Promotional Offers</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Receive discounts and special offers</div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.promotions} onChange={() => setNotifications({...notifications, promotions: !notifications.promotions})} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Theme Preferences</h2>
              <div className="theme-options">
                <div className={`theme-card ${!darkMode ? 'active' : ''}`} onClick={() => toggleDarkMode(false)}>
                  <Sun size={32} color="#FFA000" />
                  <div style={{ marginTop: 12, fontWeight: 600 }}>Light Mode</div>
                </div>
                <div className={`theme-card ${darkMode ? 'active' : ''}`} onClick={() => toggleDarkMode(true)}>
                  <Moon size={32} color="#5C6BC0" />
                  <div style={{ marginTop: 12, fontWeight: 600 }}>Dark Mode</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy & Security</h2>
              <div className="security-options">
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span>Change Password</span> <span style={{ color: 'var(--text-muted)' }}>→</span>
                </button>
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span>Two-Factor Authentication</span> <span style={{ color: 'var(--text-muted)' }}>→</span>
                </button>
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'space-between', borderColor: '#EF5350', color: '#EF5350' }}>
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="settings-section">
              <h2>Help & Support</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Need help with Sruvo? Contact our support team.</p>
              <div className="help-options" style={{ display: 'grid', gap: 16 }}>
                <div className="card card-sm" style={{ border: '1px solid #e5e7eb', boxShadow: 'none' }}>
                  <h4 style={{ marginBottom: 4 }}>FAQs</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Find answers to common questions</p>
                  <button className="btn btn-primary btn-sm">View FAQs</button>
                </div>
                <div className="card card-sm" style={{ border: '1px solid #e5e7eb', boxShadow: 'none' }}>
                  <h4 style={{ marginBottom: 4 }}>Contact Us</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Write to us at support@sruvo.com</p>
                  <button className="btn btn-outline btn-sm">Email Support</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
