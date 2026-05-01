import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingCart, Star, MapPin } from 'lucide-react';
import './HomePage.css';

const categories = [
  { icon: '🐶', label: 'Adopt a Pet', desc: 'Find your new best friend', color: '#E8F5EE' },
  { icon: '🛒', label: 'Pet Store', desc: 'Top brands & offers', color: '#FFF3E0' },
  { icon: '✂️', label: 'Services', desc: 'Grooming, walking & more', color: '#F3E5F5' },
  { icon: '🩺', label: 'Vet Care', desc: '& vet consultations', color: '#E3F2FD' },
  { icon: '👥', label: 'Community', desc: 'Share, connect & inspire', color: '#FCE4EC' },
];

const featuredPets = [
  { name: 'Golden Retriever', age: '2 Months · Male', price: '₹15,000', img: '🐕', liked: true },
  { name: 'Persian Cat', age: '3 Months · Female', price: '₹12,500', img: '🐈', liked: false },
  { name: 'Beagle Puppy', age: '2 Months · Male', price: '₹10,000', img: '🐶', liked: false },
  { name: 'Beagle Puppy', age: '3 Months · Female', price: '₹10,000', img: '🐾', liked: false },
];

const trendingProducts = [
  { name: 'Royal Canin', sub: 'Dog Food 3kg', price: '₹1,899', oldPrice: '₹3,500', rating: 4.5, img: '🥘', badge: 'Best Seller' },
  { name: 'Pet Bowl', sub: 'Stainless Steel', price: '₹349', oldPrice: null, rating: 4.2, img: '🥣', badge: null },
  { name: 'Rubber Chew Toy', sub: 'For Dogs', price: '₹299', oldPrice: null, rating: 4.3, img: '🦷', badge: null },
  { name: 'Pet Shampoo', sub: '200ml', price: '₹299', oldPrice: '₹450', rating: 4.6, img: '🧴', badge: 'Sale' },
  { name: 'Calcium Treats', sub: 'For Dogs & Cats', price: '₹199', oldPrice: null, rating: 4.4, img: '🦴', badge: null },
];

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className="star" style={{ opacity: i <= Math.floor(rating) ? 1 : 0.3 }}>★</span>
      ))}
      <span style={{ fontSize: 11, color: '#9BA4B0', marginLeft: 3 }}>{rating}</span>
    </div>
  );
}

function NearbyServices() {
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleLocate = () => {
    setLoading(true);
    setError(null);
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
          setError("Failed to fetch location data.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Location access denied or unavailable.");
        setLoading(false);
      }
    );
  };

  const nearbyStores = locationName ? [
    { type: 'Pet Store', name: `${locationName.split(',')[0]} Pet Mart`, address: `12 Main St, ${locationName}`, rating: 4.8 },
    { type: 'Pet Food', name: `Healthy Paws Nutrition`, address: `88 Pine Rd, ${locationName}`, rating: 4.7 },
    { type: 'Grooming', name: `Fluffy Cuts Grooming`, address: `45 Oak Ave, ${locationName}`, rating: 4.6 },
    { type: 'Grooming', name: `${locationName.split(',')[0]} Pet Spa`, address: `22 Elm St, ${locationName}`, rating: 4.9 },
    { type: 'Adoption Center', name: `${locationName.split(',')[0]} Animal Rescue`, address: `99 Shelter Rd, ${locationName}`, rating: 4.9 },
  ] : [];

  return (
    <section className="home-section" style={{ background: '#f8fdfa', padding: '24px', borderRadius: '12px', marginTop: '24px', border: '1px solid #e5f1ea' }}>
      <div className="section-header" style={{ marginBottom: 16 }}>
        <h2>📍 Nearby Pet Services</h2>
      </div>
      
      {!locationName ? (
        <div style={{ textAlign: 'center', padding: '30px 20px' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Allow location access to find real pet stores, grooming centers, and adoption centers near you.</p>
          <button className="btn btn-primary" onClick={handleLocate} disabled={loading}>
            <MapPin size={16} /> {loading ? 'Locating...' : 'Find Services Near Me'}
          </button>
          {error && <p style={{ color: '#EF5350', marginTop: 12, fontSize: 13 }}>{error}</p>}
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: 'var(--text-dark)', fontWeight: 500 }}>Showing results around <strong style={{color: 'var(--primary)'}}>{locationName}</strong></p>
            <button className="btn btn-outline btn-sm" onClick={handleLocate} disabled={loading}>
              <MapPin size={12} /> {loading ? 'Updating...' : 'Update Location'}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {nearbyStores.map((store, i) => (
              <div key={i} className="card card-sm">
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{store.type}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 4 }}>{store.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{store.address}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ color: '#FFC107', fontSize: 14 }}>★</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{store.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="home-page fade-in">
      {/* Hero */}
      <div className="home-hero">
        <div className="hero-text">
          <p className="hero-eyebrow">One Platform.</p>
          <h1 className="hero-title">
            <span className="hero-title-green">Every Pet</span> Need.
          </h1>
          <p className="hero-sub">
            Adopt, Shop, Book Services, Consult Vets & Connect with Pet Lovers.
          </p>
          <div className="hero-ctas">
            <Link to="/pets" className="btn btn-primary btn-lg">
              🐾 Adopt a Pet
            </Link>
            <Link to="/store" className="btn btn-outline btn-lg">
              🛒 Shop Now
            </Link>
            <Link to="/vet" className="btn btn-outline btn-lg">
              🩺 Book a Vet
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/pets-hero.png" alt="Pets" />
          <div className="hero-badge hero-badge-1">
            <span>⭐</span><span>4.8 Rating</span>
          </div>
          <div className="hero-badge hero-badge-2">
            <span>🐶</span><span>50K+ Happy Pets</span>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="home-categories">
        {categories.map((cat, i) => (
          <div key={i} className="category-card" style={{ '--cat-bg': cat.color }}>
            <div className="cat-icon">{cat.icon}</div>
            <div className="cat-label">{cat.label}</div>
            <div className="cat-desc">{cat.desc}</div>
          </div>
        ))}
      </div>

      {/* Featured Pets */}
      <section className="home-section">
        <div className="section-header">
          <h2>Featured Pets</h2>
          <Link to="/pets" className="flex items-center gap-1" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 500 }}>
            View all <ArrowRight size={13} />
          </Link>
        </div>
        <div className="pet-grid">
          {featuredPets.map((pet, i) => (
            <div key={i} className="pet-card card card-sm">
              <div className="pet-card-img">
                <span className="pet-emoji">{pet.img}</span>
                <button className={`pet-like ${pet.liked ? 'liked' : ''}`}>
                  <Heart size={15} fill={pet.liked ? '#EF5350' : 'none'} color={pet.liked ? '#EF5350' : '#9BA4B0'} />
                </button>
              </div>
              <div className="pet-card-info">
                <div className="pet-name">{pet.name}</div>
                <div className="pet-meta">{pet.age}</div>
                <div className="pet-price">{pet.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NearbyServices />

      {/* Trending Products */}
      <section className="home-section">
        <div className="section-header">
          <h2>Trending Products</h2>
          <Link to="/store" className="flex items-center gap-1" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 500 }}>
            View all <ArrowRight size={13} />
          </Link>
        </div>
        <div className="product-grid">
          {trendingProducts.map((p, i) => (
            <div key={i} className="product-card card card-sm">
              {p.badge && <div className="product-badge">{p.badge}</div>}
              <div className="product-img">{p.img}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-sub">{p.sub}</div>
              <StarRating rating={p.rating} />
              <div className="product-price-row">
                <span className="product-price">{p.price}</span>
                {p.oldPrice && <span className="product-old-price">{p.oldPrice}</span>}
              </div>
              <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                <ShoppingCart size={13} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <div className="home-banner">
        <div className="banner-left">
          <div className="banner-badge">🎉 Special Offer</div>
          <h2>Get 20% off on all Pet Services!</h2>
          <p>Book grooming, training or walking sessions today. Limited time offer.</p>
          <Link to="/services" className="btn btn-primary">Book Now <ArrowRight size={14} /></Link>
        </div>
        <div className="banner-right">
          <img src="/pets-hero.png" alt="pets" />
        </div>
      </div>
    </div>
  );
}
