import { useState } from 'react';
import { ShoppingCart, Heart, Filter, ChevronDown, Star, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './StorePage.css';

const products = [
  { id: 1, name: 'Royal Canin', sub: 'Adult Dog Food 3kg', price: 1899, oldPrice: 3500, rating: 4.6, reviews: 312, img: '🥘', cat: 'Food', inStock: true },
  { id: 2, name: 'Pedigree', sub: 'Adult Dog Food 3kg', price: 799, oldPrice: null, rating: 4.3, reviews: 186, img: '🦴', cat: 'Food', inStock: true },
  { id: 3, name: 'Cat Litter', sub: 'Clumping 5kg', price: 599, oldPrice: 750, rating: 4.5, reviews: 98, img: '🧺', cat: 'Accessories', inStock: true },
  { id: 4, name: 'Pet Shampoo', sub: 'Gentle Formula 200ml', price: 299, oldPrice: 450, rating: 4.2, reviews: 74, img: '🧴', cat: 'Grooming', inStock: true },
  { id: 5, name: 'Rubber Chew Toy', sub: 'For Dogs', price: 249, oldPrice: null, rating: 4.7, reviews: 201, img: '🦷', cat: 'Toys', inStock: true },
  { id: 6, name: 'Stainless Steel Bowl', sub: 'Pet Bowl', price: 349, oldPrice: null, rating: 4.4, reviews: 133, img: '🥣', cat: 'Accessories', inStock: true },
  { id: 7, name: 'Calcium Treats', sub: 'For Dogs & Cats', price: 199, oldPrice: null, rating: 4.3, reviews: 88, img: '🍬', cat: 'Health', inStock: true },
  { id: 8, name: 'Pet Nail Clipper', sub: 'Stainless Steel', price: 179, oldPrice: 250, rating: 4.1, reviews: 55, img: '✂️', cat: 'Grooming', inStock: true },
];

const categories = ['All Products', 'Food', 'Accessories', 'Grooming', 'Toys', 'Health', 'More'];

const brands = ['Royal Canin', 'Pedigree', 'Whiskas', 'Drools', 'Himalaya'];

function StarRating({ rating, count }) {
  return (
    <div className="stars-row">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.floor(rating) ? '#FFC107' : '#E5EBE8', fontSize: 12 }}>★</span>
      ))}
      <span className="rating-count">({count})</span>
    </div>
  );
}

export default function StorePage() {
  const { cartItems, addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [priceMax, setPriceMax] = useState(5000);
  const [searchQ, setSearchQ] = useState('');

  const filtered = products.filter(p => {
    if (activeCategory !== 'All Products' && p.cat !== activeCategory) return false;
    if (p.price > priceMax) return false;
    if (searchQ && !p.name.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="store-page fade-in">
      {/* Header */}
      <div className="page-title-row">
        <div>
          <h1 className="page-title">Pet Store</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Everything your pet needs, all in one place</p>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="store-promo">
        <div className="promo-content">
          <div className="promo-badge">🎉 Limited Offer</div>
          <h2>Flat 20% OFF</h2>
          <p>On All Premium Pet Foods</p>
          <button className="btn btn-primary btn-sm">Shop Now</button>
        </div>
        <div className="promo-img">🐕</div>
      </div>

      <div className="store-layout">
        {/* Filters sidebar */}
        <aside className="store-filters card">
          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            {categories.map(c => (
              <button
                key={c}
                className={`filter-option ${activeCategory === c ? 'active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="divider" />
          <div className="filter-section">
            <h3 className="filter-title">Price Range</h3>
            <div className="price-range">
              <span>₹0</span>
              <input
                type="range" min={0} max={5000} value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                className="price-slider"
              />
              <span>₹{priceMax.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="divider" />
          <div className="filter-section">
            <h3 className="filter-title">Brands</h3>
            {brands.map(b => (
              <label key={b} className="filter-checkbox">
                <input type="checkbox" defaultChecked={b === 'Royal Canin'} />
                <span>{b}</span>
              </label>
            ))}
          </div>
          <div className="divider" />
          <div className="filter-section">
            <h3 className="filter-title">Rating</h3>
            {[5,4,3,2,1].map(r => (
              <label key={r} className="filter-checkbox">
                <input type="checkbox" />
                <span className="stars-row">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ color: i <= r ? '#FFC107' : '#E5EBE8', fontSize: 13 }}>★</span>
                  ))}
                  <span className="rating-count">& above</span>
                </span>
              </label>
            ))}
          </div>
        </aside>

        {/* Products */}
        <div className="store-main">
          {/* Search & Sort */}
          <div className="store-toolbar">
            <div className="store-search">
              <Search size={14} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
              />
            </div>
            <div className="store-sort">
              <Filter size={14} /> Sort by <ChevronDown size={12} />
            </div>
          </div>

          {/* Best Sellers header */}
          <div className="section-header">
            <h2>Best Sellers</h2>
            <a href="#">View all</a>
          </div>

          <div className="store-products-grid">
            {filtered.map(p => (
              <div key={p.id} className="store-product-card card card-sm">
                <div className="store-product-img">
                  <span>{p.img}</span>
                  <button
                    className={`store-wish-btn ${wishlistItems.some(i => i.id === p.id) ? 'wished' : ''}`}
                    onClick={() => toggleWishlist(p)}
                  >
                    <Heart size={14} fill={wishlistItems.some(i => i.id === p.id) ? '#EF5350' : 'none'} color={wishlistItems.some(i => i.id === p.id) ? '#EF5350' : '#9BA4B0'} />
                  </button>
                </div>
                <div className="store-product-name">{p.name}</div>
                <div className="store-product-sub">{p.sub}</div>
                <StarRating rating={p.rating} count={p.reviews} />
                <div className="store-price-row">
                  <span className="store-price">₹{p.price}</span>
                  {p.oldPrice && <span className="store-old-price">₹{p.oldPrice}</span>}
                </div>
                <button
                  className={`btn btn-sm ${cartItems.some(i => i.id === p.id) ? 'btn-outline' : 'btn-primary'}`}
                  style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                  onClick={() => addToCart(p)}
                >
                  <ShoppingCart size={12} />
                  {cartItems.some(i => i.id === p.id) ? 'Add more' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <span style={{ fontSize: 48 }}>🔍</span>
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
