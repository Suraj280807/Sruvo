import { useState } from 'react';
import { Star, ArrowRight, ChevronRight } from 'lucide-react';
import './ServicesPage.css';

const serviceTypes = [
  { icon: '✂️', label: 'Grooming', color: '#E3F2FD' },
  { icon: '🥩', label: 'Food', color: '#FFF3E0' },
  { icon: '🚶', label: 'Walking', color: '#E8F5EE' },
  { icon: '🏠', label: 'Boarding', color: '#FFF3E0' },
  { icon: '🎓', label: 'Training', color: '#F3E5F5' },
  { icon: '🛋️', label: 'Sitting', color: '#FCE4EC' },
  { icon: '📦', label: 'Others', color: '#F5F5F5' },
];

const providers = [
  {
    id: 1,
    name: 'Paws & Claws Grooming',
    type: 'Grooming',
    rating: 4.8,
    reviews: 320,
    price: '₹499',
    emoji: '✂️',
    available: true,
    color: '#E3F2FD',
  },
  {
    id: 2,
    name: 'Happy Tails Walking',
    type: 'Dog Walking',
    rating: 4.7,
    reviews: 183,
    price: '₹199',
    emoji: '🚶',
    available: true,
    color: '#E8F5EE',
  },
  {
    id: 3,
    name: 'Pet Stay Inn',
    type: 'Boarding',
    rating: 4.6,
    reviews: 97,
    price: '₹599',
    emoji: '🏠',
    available: false,
    color: '#FFF3E0',
  },
  {
    id: 4,
    name: 'PawFect Training',
    type: 'Training',
    rating: 4.9,
    reviews: 156,
    price: '₹799',
    emoji: '🎓',
    available: true,
    color: '#F3E5F5',
  },
  {
    id: 5,
    name: 'Sparkle Pet Grooming',
    type: 'Grooming',
    rating: 4.9,
    reviews: 210,
    price: '₹599',
    emoji: '✂️',
    available: true,
    color: '#E3F2FD',
  },
  {
    id: 6,
    name: 'Gourmet Pet Foods',
    type: 'Food',
    rating: 4.8,
    reviews: 145,
    price: 'Varied',
    emoji: '🥩',
    available: true,
    color: '#FFF3E0',
  },
];

const howItWorks = [
  { step: 1, icon: '🔍', title: 'Choose Service', desc: 'Select the service you need' },
  { step: 2, icon: '📅', title: 'Pick Date & Time', desc: 'Choose your preferred time' },
  { step: 3, icon: '✅', title: 'Confirm Booking', desc: 'Sit back and relax, we\'ll take care!' },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('Grooming');
  const [bookingModal, setBookingModal] = useState(null);

  const filteredProviders = activeService
    ? providers.filter(p => p.type.includes(activeService) || activeService === 'Others')
    : providers;

  const displayProviders = activeService === 'Others' ? providers : filteredProviders.length > 0 ? filteredProviders : providers;

  return (
    <div className="services-page fade-in">
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Our Services</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Explore top services for your pet</p>
        </div>
      </div>

      {/* Service Type Pills */}
      <div className="service-types">
        {serviceTypes.map(s => (
          <button
            key={s.label}
            className={`service-type-btn ${activeService === s.label ? 'active' : ''}`}
            style={{ '--svc-color': s.color }}
            onClick={() => setActiveService(s.label)}
          >
            <span className="svc-icon">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Service Providers */}
      <section>
        <div className="section-header">
          <h2>Top Service Providers</h2>
          <a href="#" className="flex items-center gap-1" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 500 }}>
            View all <ArrowRight size={12} />
          </a>
        </div>

        <div className="providers-list">
          {displayProviders.map(p => (
            <div key={p.id} className="provider-card card">
              <div className="provider-emoji" style={{ background: p.color }}>
                {p.emoji}
              </div>
              <div className="provider-info">
                <div className="provider-name">{p.name}</div>
                <div className="provider-type">{p.type}</div>
                <div className="provider-meta">
                  <div className="stars-row">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} style={{ color: i <= Math.floor(p.rating) ? '#FFC107' : '#E5EBE8', fontSize: 13 }}>★</span>
                    ))}
                    <span style={{ fontSize: 12, color: '#5A6472', marginLeft: 4 }}>{p.rating} ({p.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="provider-right">
                <div className="provider-price">{p.price} <span>onwards</span></div>
                <button
                  className={`btn btn-sm ${p.available ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => p.available && setBookingModal(p)}
                  disabled={!p.available}
                >
                  {p.available ? 'Book Now' : 'Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works card">
        <h2 className="card-section-title" style={{ marginBottom: 20 }}>How It Works</h2>
        <div className="hiw-steps">
          {howItWorks.map((s, i) => (
            <div key={i} className="hiw-step">
              <div className="hiw-step-num">{s.step}</div>
              <div className="hiw-step-icon">{s.icon}</div>
              <div className="hiw-step-title">{s.title}</div>
              <div className="hiw-step-desc">{s.desc}</div>
              {i < howItWorks.length - 1 && <div className="hiw-arrow"><ChevronRight size={18} color="var(--text-muted)" /></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="modal-overlay" onClick={() => setBookingModal(null)}>
          <div className="booking-modal card" onClick={e => e.stopPropagation()}>
            <h2>Book {bookingModal.name}</h2>
            <div className="booking-form">
              <div className="input-group">
                <label>Pet Name</label>
                <select className="input-field">
                  <option>Bruno (Golden Retriever)</option>
                  <option>Luna (Persian Cat)</option>
                </select>
              </div>
              <div className="input-group">
                <label>Date</label>
                <input type="date" className="input-field" />
              </div>
              <div className="input-group">
                <label>Time</label>
                <select className="input-field">
                  <option>9:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              <div className="input-group">
                <label>Notes (optional)</label>
                <textarea className="input-field" rows={3} placeholder="Any special instructions..." />
              </div>
              <div className="booking-modal-footer">
                <button className="btn btn-ghost" onClick={() => setBookingModal(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setBookingModal(null)}>Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
