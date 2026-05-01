import { useState } from 'react';
import { Save, Bell, Shield, Globe, Palette, Database, Mail } from 'lucide-react';

const tabs = [
  { key: 'general', label: 'General', icon: Globe },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'appearance', label: 'Appearance', icon: Palette },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    platformName: 'Sruvo',
    tagline: 'Care. Love. Repeat.',
    supportEmail: 'support@sruvo.com',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    maintenanceMode: false,
    newUserAlerts: true,
    bookingAlerts: true,
    reportAlerts: true,
    lowStockAlerts: true,
    twoFactor: false,
    sessionTimeout: '30',
    accentColor: '#1B8B3B',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  const Toggle = ({ value, onToggle }) => (
    <div onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: value ? 'var(--primary)' : '#D1D5DB', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: 9, background: 'white', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">⚙️ Configuration</div>
          <h1 className="page-header-title">Settings</h1>
          <p className="page-header-sub">Configure your admin panel preferences</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            {saved ? '✅ Saved!' : <><Save size={14} /> Save Changes</>}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Settings Tabs */}
        <div className="card card-sm" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 'var(--radius-md)', fontWeight: 500, fontSize: 13, transition: 'all 0.15s', background: activeTab === t.key ? 'var(--primary-light)' : 'transparent', color: activeTab === t.key ? 'var(--primary)' : 'var(--text-secondary)' }}>
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {activeTab === 'general' && <>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Platform Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Platform Name','platformName','text'],['Tagline','tagline','text'],['Support Email','supportEmail','email']].map(([l, k, t]) => (
                  <div key={k} className="input-group">
                    <label className="input-label">{l}</label>
                    <input className="input-field" type={t} value={settings[k]} onChange={e => setSettings(s => ({...s, [k]: e.target.value}))} />
                  </div>
                ))}
                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Currency</label>
                    <select className="input-field" value={settings.currency} onChange={e => setSettings(s => ({...s, currency: e.target.value}))}>
                      <option>INR</option><option>USD</option><option>EUR</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Timezone</label>
                    <select className="input-field" value={settings.timezone} onChange={e => setSettings(s => ({...s, timezone: e.target.value}))}>
                      <option>Asia/Kolkata</option><option>UTC</option><option>America/New_York</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider" />
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 16 }}>System</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Maintenance Mode</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Take the platform offline for maintenance</div>
                </div>
                <Toggle value={settings.maintenanceMode} onToggle={() => toggle('maintenanceMode')} />
              </div>
            </div>
          </>}

          {activeTab === 'notifications' && <>
            <h3 style={{ fontWeight: 700 }}>Notification Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['newUserAlerts', '👤 New User Registration', 'Get notified when a new user joins'],
                ['bookingAlerts', '📅 New Booking', 'Get notified for every new booking'],
                ['reportAlerts', '🚩 Content Reports', 'Get notified when content is reported'],
                ['lowStockAlerts', '📦 Low Stock Alerts', 'Notify when product stock falls below threshold'],
              ].map(([key, title, desc]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
                  </div>
                  <Toggle value={settings[key]} onToggle={() => toggle(key)} />
                </div>
              ))}
            </div>
          </>}

          {activeTab === 'security' && <>
            <h3 style={{ fontWeight: 700 }}>Security Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>🔐 Two-Factor Authentication</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Add an extra layer of security to your account</div>
                </div>
                <Toggle value={settings.twoFactor} onToggle={() => toggle('twoFactor')} />
              </div>
              <div className="input-group">
                <label className="input-label">Session Timeout (minutes)</label>
                <select className="input-field" value={settings.sessionTimeout} onChange={e => setSettings(s => ({...s, sessionTimeout: e.target.value}))}>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="480">8 hours</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Change Password</label>
                <input className="input-field" type="password" placeholder="Current password" style={{ marginBottom: 8 }} />
                <input className="input-field" type="password" placeholder="New password" style={{ marginBottom: 8 }} />
                <input className="input-field" type="password" placeholder="Confirm new password" />
              </div>
            </div>
          </>}

          {activeTab === 'appearance' && <>
            <h3 style={{ fontWeight: 700 }}>Appearance Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="input-group">
                <label className="input-label">Accent Color</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="color" value={settings.accentColor} onChange={e => setSettings(s => ({...s, accentColor: e.target.value}))} style={{ width: 44, height: 36, border: '1.5px solid var(--border)', borderRadius: 8, cursor: 'pointer', padding: 2 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{settings.accentColor}</span>
                </div>
              </div>
              <div>
                <div className="input-label" style={{ marginBottom: 8 }}>Color Presets</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['#1B8B3B','#3B82F6','#8B5CF6','#EF4444','#F59E0B','#14B8A6'].map(c => (
                    <div key={c} onClick={() => setSettings(s => ({...s, accentColor: c}))}
                      style={{ width: 32, height: 32, borderRadius: 8, background: c, cursor: 'pointer', border: settings.accentColor === c ? '3px solid var(--text-primary)' : '3px solid transparent', transition: 'all 0.2s' }} />
                  ))}
                </div>
              </div>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}
