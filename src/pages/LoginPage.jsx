import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Star, Shield, Users } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', remember: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  const handleOAuthLogin = async (provider) => {
    try {
      setIsLoading(true);
      setError('');
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (authError) throw authError;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      if (tab === 'login') {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (authError) throw authError;
        if (data.user) onLogin();
      } else {
        if (!form.name) {
          throw new Error('Please enter your full name.');
        }
        const { data, error: authError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { full_name: form.name }
          }
        });
        if (authError) throw authError;
        if (data.user) onLogin();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: <Shield size={18} />, title: 'Expert Vet Care', desc: 'Book appointments & get consultations with trusted vets.' },
    { icon: <Star size={18} />, title: 'Premium Pet Services', desc: 'Grooming, training, walking and more - all in one place.' },
    { icon: <Users size={18} />, title: 'Community & Support', desc: 'Join a community of pet lovers and share the joy.' },
  ];

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-left-inner">
          <div className="login-brand">
            <span className="login-brand-icon">🐾</span>
            <span className="login-brand-name">Sruvo</span>
          </div>
          <div className="login-hero-text">
            <h1>
              <span className="text-dark">Care.</span>{' '}
              <span className="text-green">Love.</span>{' '}
              <span className="text-dark">Repeat.</span>
            </h1>
            <p>Everything your pet needs, all in one place.</p>
          </div>
          <div className="login-features">
            {features.map((f, i) => (
              <div key={i} className="login-feature-item">
                <div className="login-feature-icon">{f.icon}</div>
                <div>
                  <div className="login-feature-title">{f.title}</div>
                  <div className="login-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="login-hero-image">
            <img src="/pets-hero.png" alt="Pets" />
          </div>
          <div className="login-stats">
            <div className="login-stat"><span className="stat-val">50K+</span><span className="stat-label">Happy Pet Parents</span></div>
            <div className="login-stat"><span className="stat-val">✓</span><span className="stat-label">Trusted by Vets</span></div>
            <div className="login-stat"><span className="stat-val">4.8★</span><span className="stat-label">App Rating</span></div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-top-bar">
            <div className="login-brand-sm">
              <span>🐾</span><span>Sruvo</span>
            </div>
            <span className="login-top-link">
              {tab === 'login' ? 'New here?' : 'Have an account?'}{' '}
              <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')} className="text-link">
                {tab === 'login' ? 'Create Account' : 'Sign In'}
              </button>
            </span>
          </div>

          <div className="login-form-header">
            <h2>
              {tab === 'login' ? (
                <>Welcome Back <span>👋</span></>
              ) : (
                <>Create Account <span>🐾</span></>
              )}
            </h2>
            <p>{tab === 'login' ? 'Login to continue to your account' : 'Join thousands of happy pet parents'}</p>
          </div>

          {error && <div style={{ color: '#EF4444', background: '#FEE2E2', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            {tab === 'register' && (
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <span className="input-icon">👤</span>
                  <input 
                    className="input-field" 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
            )}
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={15} className="input-icon" />
                <input
                  className="input-field"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="input-group">
              <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
                <label style={{ marginBottom: 0 }}>Password</label>
                {tab === 'login' && <button type="button" className="text-link text-sm">Forgot password?</button>}
              </div>
              <div className="input-with-icon">
                <Lock size={15} className="input-icon" />
                <input
                  className="input-field"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" className="input-icon-right" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {tab === 'login' && (
              <label className="remember-me">
                <input type="checkbox" checked={form.remember} onChange={e => setForm({ ...form, remember: e.target.checked })} />
                <span>Remember me</span>
              </label>
            )}
            <button type="submit" className="btn btn-primary btn-lg w-full login-btn" disabled={isLoading}>
              {isLoading ? (
                <><span className="mini-spinner" /> {tab === 'login' ? 'Signing in...' : 'Creating account...'}</>
              ) : (
                <>{tab === 'login' ? 'Login' : 'Create Account'} <ArrowRight size={16} /></>
              )}
            </button>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <div className="social-btns">
              <button type="button" className="social-btn" onClick={() => handleOAuthLogin('google')} disabled={isLoading}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={18} />
                Continue with Google
              </button>
              <button type="button" className="social-btn" onClick={() => handleOAuthLogin('apple')} disabled={isLoading}>
                <span style={{ fontSize: 18 }}>🍎</span>
                Continue with Apple
              </button>
            </div>

            <p className="login-footer-text">
              {tab === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button type="button" className="text-link" onClick={() => setTab(tab === 'login' ? 'register' : 'login')}>
                {tab === 'login' ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </form>

          <p className="copyright">© 2025 Sruvo. All rights reserved. &nbsp;·&nbsp; Privacy Policy &nbsp;·&nbsp; Terms of Service</p>
        </div>
      </div>
    </div>
  );
}
