import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate('/admin-sruvo-123');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: 'var(--bg)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: 400, background: 'white', padding: 40, borderRadius: 20, boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🛡️</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: '-0.5px' }}>Admin Access</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Sign in to manage Sruvo platform</p>
        </div>
        
        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 20, borderLeft: '4px solid #EF4444' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Email</label>
            <input
              type="email"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #E5EBE8', background: '#F9FAFB', fontSize: 14, outline: 'none' }}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Password</label>
            <input
              type="password"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #E5EBE8', background: '#F9FAFB', fontSize: 14, outline: 'none' }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: 'var(--primary)', color: 'white', padding: '12px', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: 10 }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
