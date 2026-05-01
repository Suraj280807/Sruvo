import { useState } from 'react';
import { Shield } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'sruvo123') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="card fade-in" style={{ width: 400, maxWidth: '90vw', padding: 32, display: 'flex', flexDirection: 'column', gap: 24, background: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Shield size={28} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>Admin Login</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sign in to access the Sruvo dashboard</p>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '12px', borderRadius: 8, fontSize: 13, textAlign: 'center', fontWeight: 500 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="input-group">
            <label className="input-label">Username</label>
            <input 
              className="input-field" 
              type="text" 
              placeholder="Enter admin username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              className="input-field" 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px', marginTop: 8, fontSize: 14 }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
