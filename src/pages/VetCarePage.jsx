import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, Bot, ArrowRight, Phone, AlertTriangle } from 'lucide-react';
import './VetCarePage.css';

const vets = [
  { id: 1, name: 'Dr. Anjali Sharma', spec: 'Veterinarian · 8 Yrs Exp.', rating: 4.8, reviews: 280, available: true, emoji: '👩‍⚕️' },
  { id: 2, name: 'Dr. Rohan Verma', spec: 'Veterinarian · 6 Yrs Exp.', rating: 4.7, reviews: 192, available: true, emoji: '👨‍⚕️' },
  { id: 3, name: 'Dr. Priya Patel', spec: 'Veterinarian · 9 Yrs Exp.', rating: 4.7, reviews: 155, available: false, emoji: '👩‍⚕️' },
];

const resources = [
  { title: 'Care Tips for Dogs', cat: 'Care Tips', emoji: '🐕', color: '#E8F5EE' },
  { title: 'How to Choose Right Food', cat: 'Nutrition', emoji: '🥘', color: '#FFF3E0' },
  { title: 'Signs of Illness in Pets', cat: 'Health', emoji: '🏥', color: '#FFEBEE' },
  { title: 'Importance of Regular Checkups', cat: 'Wellness', emoji: '✅', color: '#E3F2FD' },
];

const quickOptions = ['Upload Image', 'Food Habit', 'Other Symptoms'];

const botResponses = [
  "I understand your concern. Can you tell me more about your pet's symptoms?",
  "Has your pet eaten anything unusual recently?",
  "This could be a sign of a few conditions. I recommend consulting with Dr. Anjali Sharma for a proper diagnosis.",
  "How long has your pet been showing these symptoms?",
  "Please monitor your pet closely. If symptoms worsen, please visit an emergency vet immediately.",
];

export default function VetCarePage() {
  const [view, setView] = useState('main'); // 'main' | 'chat' | 'clinics'
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hi! I'm your AI Vet Assistant 🐾\nHow can I help you today?", time: '10:32 AM' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [locationName, setLocationName] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
  useEffect(scrollToBottom, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, from: 'bot', text: botResponses[Math.floor(Math.random() * botResponses.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(m => [...m, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleLocateClinics = () => {
    setView('clinics');
    if (locationName) return;
    setLoadingLocation(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=d10891636d9d42b685f32702260105&q=${latitude},${longitude}`);
          const data = await res.json();
          if (data && data.location) {
            const name = data.location.name + (data.location.region ? `, ${data.location.region}` : '');
            setLocationName(name);
          } else {
            setLocationName("Unknown Location");
          }
        } catch (err) {
          setLocationError("Failed to fetch location data.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        setLocationError("Location access denied or unavailable.");
        setLoadingLocation(false);
      }
    );
  };

  if (view === 'chat') {
    return (
      <div className="vetcare-page fade-in">
        <div className="chat-layout">
          {/* Sidebar info */}
          <div className="chat-sidebar">
            <div className="ai-card card">
              <div className="ai-avatar">🤖</div>
              <div className="ai-status"><span className="status-dot" />Online</div>
              <h3>AI Vet Assistant</h3>
              <p>Get instant answers to your pet health queries anytime.</p>
              <div className="ai-features">
                {['24/7 Available', 'Trusted Information', 'Smart & Friendly'].map(f => (
                  <div key={f} className="ai-feature-item"><span>✓</span>{f}</div>
                ))}
              </div>
            </div>
            <div className="popular-topics card">
              <h4>Popular Topics</h4>
              {['Feeding & Nutrition', 'Behavior & Training', 'Skin & Coat Care', 'Vaccination', 'Common Symptoms', 'Emergency Care'].map(t => (
                <button key={t} className="topic-btn" onClick={() => sendMessage(t)}>{t}</button>
              ))}
            </div>
            <div className="card" style={{ textAlign: 'center', background: '#FFEBEE' }}>
              <p style={{ fontSize: 12, color: '#5A6472', marginBottom: 10 }}>Need more help? Connect with a veterinarian for personalized care.</p>
              <button className="btn btn-primary btn-sm w-full" style={{ justifyContent: 'center' }} onClick={() => setView('main')}>Book a Vet Now</button>
            </div>
          </div>

          {/* Chat window */}
          <div className="chat-window card">
            <div className="chat-header">
              <button className="btn-icon" onClick={() => setView('main')}>←</button>
              <div className="chat-header-info">
                <div className="ai-avatar-sm">🤖</div>
                <div>
                  <div className="chat-name">AI Vet Assistant</div>
                  <div className="chat-status"><span className="status-dot" />Online</div>
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-msg ${msg.from}`}>
                  {msg.from === 'bot' && <div className="msg-avatar">🤖</div>}
                  <div className="msg-bubble">
                    <div className="msg-text">{msg.text}</div>
                    <div className="msg-time">{msg.time}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-msg bot">
                  <div className="msg-avatar">🤖</div>
                  <div className="msg-bubble typing-bubble">
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-quick-options">
              {quickOptions.map(o => (
                <button key={o} className="chip" onClick={() => sendMessage(o)}>{o}</button>
              ))}
            </div>

            <form className="chat-input-bar" onSubmit={e => { e.preventDefault(); sendMessage(input); }}>
              <button type="button" className="btn-icon"><Paperclip size={16} /></button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button type="submit" className="btn btn-primary btn-icon chat-send-btn">
                <Send size={15} />
              </button>
            </form>
            <p className="chat-disclaimer">AI Vet Assistant can make mistakes. Please consult a veterinarian for medical emergencies.</p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'clinics') {
    const nearbyClinics = locationName ? [
      { name: `${locationName.split(',')[0]} Pet Care Clinic`, address: `12 Main St, ${locationName}`, phone: '(0) 98765 43210', rating: 4.8 },
      { name: `City Vet Specialists`, address: `45 Oak Ave, ${locationName}`, phone: '(0) 91234 56789', rating: 4.6 },
      { name: `${locationName.split(',')[0]} Animal Hospital`, address: `99 Shelter Rd, ${locationName}`, phone: '(0) 99887 77665', rating: 4.9 },
    ] : [];

    return (
      <div className="vetcare-page fade-in">
        <div className="chat-header card" style={{ marginBottom: 24, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="btn-icon" onClick={() => setView('main')}>←</button>
          <h2 style={{ fontSize: 20, margin: 0 }}>📍 Nearby Pet Clinics</h2>
        </div>

        <div className="card" style={{ padding: 24 }}>
          {!locationName ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🏥</div>
              <h3 style={{ marginBottom: 8 }}>Find Clinics Near You</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>We need your location to find the best pet clinics around you.</p>
              <button className="btn btn-primary" onClick={handleLocateClinics} disabled={loadingLocation}>
                {loadingLocation ? 'Locating...' : 'Allow Location Access'}
              </button>
              {locationError && <p style={{ color: '#EF5350', marginTop: 16 }}>{locationError}</p>}
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Showing top clinics near <strong style={{ color: 'var(--primary)' }}>{locationName}</strong></p>
                <button className="btn btn-outline btn-sm" onClick={() => { setLocationName(null); handleLocateClinics(); }}>Update Location</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {nearbyClinics.map((clinic, i) => (
                  <div key={i} className="card card-sm" style={{ border: '1px solid #e5e7eb', boxShadow: 'none' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{clinic.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>{clinic.address}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#FFC107' }}>★ <span style={{color: 'var(--text-dark)'}}>{clinic.rating}</span></div>
                      <button className="btn btn-outline btn-sm" onClick={() => {
                        navigator.clipboard.writeText(clinic.phone);
                        alert("Phone number copied!");
                      }}><Phone size={12}/> {clinic.phone}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="vetcare-page fade-in">
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Vet Care</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Expert care, whenever you need it</p>
        </div>
      </div>

      {/* Top CTA cards */}
      <div className="vet-cta-cards">
        <div className="vet-cta-card vet-cta-ai" onClick={() => setView('chat')}>
          <div className="cta-icon">🤖</div>
          <h3>AI Vet Assistant</h3>
          <p>Get instant answers to your pet health queries anytime.</p>
          <button className="btn btn-primary btn-sm">Chat Now</button>
        </div>
        <div className="vet-cta-card vet-cta-consult">
          <div className="cta-icon">👩‍⚕️</div>
          <h3>Consult a Vet</h3>
          <p>Book an appointment with trusted veterinarians.</p>
          <button className="btn btn-outline btn-sm">Book Now</button>
        </div>
        <div className="vet-quick-actions">
          {[
            { id: 'clinic', icon: '📍', title: 'Find a Clinic', sub: 'Locate nearby pet clinics in your locality.' },
            { id: 'records', icon: '📋', title: 'Health Records', sub: 'Access your pet\'s complete medical history.' },
            { id: 'vaccine', icon: '🔔', title: 'Vaccination Reminders', sub: 'Never miss important vaccinations.' },
            { id: 'emergency', icon: '🚑', title: 'Emergency Care', sub: '24/7 emergency support for pets.' },
          ].map((a, i) => (
            <div 
              key={i} 
              className="vet-quick-item card card-sm" 
              style={{ cursor: a.id === 'clinic' ? 'pointer' : 'default' }}
              onClick={() => {
                if (a.id === 'clinic') handleLocateClinics();
              }}
            >
              <span style={{ fontSize: 20 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.sub}</div>
              </div>
              <ArrowRight size={14} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Top Vets */}
      <section>
        <div className="section-header">
          <h2>Top Veterinarians</h2>
          <a href="#" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 500 }}>View all</a>
        </div>
        <div className="vets-grid">
          {vets.map(v => (
            <div key={v.id} className="vet-card card">
              <div className="vet-avatar">{v.emoji}</div>
              <div className="vet-name">{v.name}</div>
              <div className="vet-spec">{v.spec}</div>
              <div className="stars-row" style={{ justifyContent: 'center', marginBottom: 6 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: i <= Math.floor(v.rating) ? '#FFC107' : '#E5EBE8', fontSize: 13 }}>★</span>
                ))}
                <span style={{ fontSize: 11, color: '#5A6472', marginLeft: 4 }}>{v.rating} ({v.reviews})</span>
              </div>
              <div className={`vet-availability ${v.available ? 'avail' : 'unavail'}`}>
                {v.available ? '✓ Available Today' : '✗ Unavailable Today'}
              </div>
              <button className={`btn btn-sm ${v.available ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section>
        <div className="section-header">
          <h2>Pet Health Resources</h2>
          <a href="#" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 500 }}>View all</a>
        </div>
        <div className="resources-grid">
          {resources.map((r, i) => (
            <div key={i} className="resource-card card card-sm" style={{ background: r.color, border: 'none' }}>
              <div className="resource-emoji">{r.emoji}</div>
              <div className="badge badge-green" style={{ marginBottom: 8 }}>{r.cat}</div>
              <div className="resource-title">{r.title}</div>
              <button className="text-link" style={{ fontSize: 12, marginTop: 8 }}>Read More →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Banner */}
      <div className="emergency-banner card">
        <AlertTriangle size={24} color="#EF5350" />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>Need immediate help?</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Our emergency support is available 24/7 for your pet's health.</div>
        </div>
        <button 
          onClick={() => {
            navigator.clipboard.writeText("09820122602");
            alert("Number copied to clipboard!");
          }}
          className="btn btn-sm" 
          style={{ background: '#EF5350', color: 'white', marginLeft: 'auto', whiteSpace: 'nowrap', border: 'none', cursor: 'pointer' }}
        >
          <Phone size={13} /> Call (0) 98201 22602
        </button>
      </div>
    </div>
  );
}
