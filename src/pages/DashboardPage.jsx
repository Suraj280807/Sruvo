import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Calendar, Heart, PawPrint } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './DashboardPage.css';

const stats = [
  { label: 'My Pets', value: 3, icon: '🐾', color: '#E8F5EE', textColor: '#1B8B3B', link: '/pets' },
  { label: 'Orders', value: 12, icon: '📦', color: '#E3F2FD', textColor: '#1565C0', link: '/store' },
  { label: 'Bookings', value: 5, icon: '📅', color: '#FFF3E0', textColor: '#E65100', link: '/services' },
  { label: 'Wishlist', value: 8, icon: '❤️', color: '#FCE4EC', textColor: '#C62828', link: '#' },
];

const recentOrders = [
  { name: 'Royal Canin Dog Food 3kg', date: '18 May 2025', price: '₹1,899', emoji: '🥘', status: 'Delivered' },
  { name: 'Pet Shampoo 200ml', date: '16 May 2025', price: '₹299', emoji: '🧴', status: 'Delivered' },
  { name: 'Rubber Chew Toy', date: '14 May 2025', price: '₹349', emoji: '🦷', status: 'Delivered' },
  { name: 'Stainless Steel Bowl', date: '12 May 2025', price: '₹249', emoji: '🥣', status: 'Delivered' },
];

const bookings = [
  { service: 'Grooming with Paws & Claws', date: '18 May 2025 · 11:00 AM', status: 'Confirmed', emoji: '✂️' },
  { service: 'Consultation with Dr. Anjali Sharma', date: '22 May 2025 · 04:00 PM', status: 'Confirmed', emoji: '👩‍⚕️' },
];

const features = [
  { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹499' },
  { icon: '🩺', title: 'Veterinarian Support', desc: '24/7 expert support' },
  { icon: '⭐', title: 'Loyalty Points', desc: 'Earns points on every order' },
  { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free returns' },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState('Suraj Patil');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
        setUserName(name);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="dashboard-page fade-in">
      {/* Welcome */}
      <div className="dash-header">
        <div>
          <p className="dash-welcome">Welcome back,</p>
          <h1 className="dash-user">{userName} <span>👋</span></h1>
        </div>
        <div className="dash-header-right">
          <div className="dash-pet-widget">
            <div className="dash-pet-info">
              <div className="dash-pet-avatar">🐕</div>
              <div>
                <div className="dash-pet-name">Bruno</div>
                <div className="dash-pet-breed">Golden Retriever · 2 Yrs</div>
              </div>
            </div>
            <div className="dash-pet-next">
              <div className="dash-pet-next-item"><span>💉</span><div><div style={{ fontSize: 11, fontWeight: 600 }}>Next Vaccination</div><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>25 May 2025</div></div></div>
              <div className="dash-pet-next-item"><span>🩺</span><div><div style={{ fontSize: 11, fontWeight: 600 }}>Last Checkup</div><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>10 May 2025</div></div></div>
              <div className="dash-pet-next-item"><span>🔔</span><div><div style={{ fontSize: 11, fontWeight: 600 }}>Reminders</div><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>3 Upcoming</div></div></div>
            </div>
            <Link to="/pets" className="btn btn-primary btn-sm">View Profile</Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="dash-stats">
        {stats.map((s, i) => (
          <Link key={i} to={s.link} className="dash-stat-card" style={{ '--stat-bg': s.color, '--stat-text': s.textColor }}>
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-value">{s.value}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-link">View all {s.label.toLowerCase()} →</div>
          </Link>
        ))}
      </div>

      {/* Orders + Bookings */}
      <div className="dash-grid-2">
        <div className="card">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/store" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 500 }}>View all</Link>
          </div>
          <div className="order-list">
            {recentOrders.map((o, i) => (
              <div key={i} className="order-item">
                <div className="order-emoji">{o.emoji}</div>
                <div className="order-info">
                  <div className="order-name">{o.name}</div>
                  <div className="order-date">Delivered · {o.date}</div>
                </div>
                <div className="order-price">{o.price}</div>
              </div>
            ))}
          </div>
          <Link to="/store" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
            View all orders <ArrowRight size={12} />
          </Link>
        </div>

        <div className="card">
          <div className="section-header">
            <h2>Upcoming Bookings</h2>
            <Link to="/services" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 500 }}>View all</Link>
          </div>
          <div className="booking-list">
            {bookings.map((b, i) => (
              <div key={i} className="booking-item">
                <div className="booking-emoji">{b.emoji}</div>
                <div className="booking-info">
                  <div className="booking-name">{b.service}</div>
                  <div className="booking-date">{b.date}</div>
                </div>
                <span className="badge badge-green">{b.status}</span>
              </div>
            ))}
          </div>
          <Link to="/services" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
            View all bookings <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Feature chips */}
      <div className="dash-features">
        {features.map((f, i) => (
          <div key={i} className="dash-feature-item card card-sm">
            <div className="dash-feature-icon">{f.icon}</div>
            <div>
              <div className="dash-feature-title">{f.title}</div>
              <div className="dash-feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
