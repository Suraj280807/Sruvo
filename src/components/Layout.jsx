import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import {
  LayoutDashboard, PawPrint, ShoppingBag, Scissors, Stethoscope,
  Users, Heart, MapPin, CreditCard, Settings, LogOut,
  Bell, Search, ShoppingCart, Menu, X, ChevronDown, Trash2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Layout.css';

const navItems = [
  { path: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { path: '/pets', icon: <PawPrint size={18} />, label: 'My Pets' },
  { path: '/store', icon: <ShoppingBag size={18} />, label: 'Store' },
  { path: '/services', icon: <Scissors size={18} />, label: 'Bookings' },
  { path: '/vet', icon: <Stethoscope size={18} />, label: 'Medical History' },
  { path: '/community', icon: <Heart size={18} />, label: 'Wishlist' },
];

const navItems2 = [
  { path: '/addresses', icon: <MapPin size={18} />, label: 'Addresses' },
  { path: '/payments', icon: <CreditCard size={18} />, label: 'Payments' },
  { path: '/settings', icon: <Settings size={18} />, label: 'Settings' },
];

const topNavItems = [
  { path: '/home', label: 'Home' },
  { path: '/pets', label: 'Pets' },
  { path: '/store', label: 'Store' },
  { path: '/services', label: 'Services' },
  { path: '/vet', label: 'Vet Care' },
  { path: '/community', label: 'Community' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { cartItems, removeFromCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlistItems.length;
  const [notifCount] = useState(5);
  const [userName, setUserName] = useState('Loading...');
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // App.jsx will automatically redirect to /login via onAuthStateChange
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-inner">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">🐾</span>
            <span className="sidebar-logo-text">Sruvo</span>
          </div>

          <nav className="sidebar-nav">
            <div className="sidebar-nav-group">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  <span className="sidebar-nav-label">{item.label}</span>
                </NavLink>
              ))}
            </div>
            <div className="sidebar-divider" />
            <div className="sidebar-nav-group">
              {navItems2.map(item => (
                <NavLink 
                  key={item.label} 
                  to={item.path} 
                  className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  <span className="sidebar-nav-label">{item.label}</span>
                </NavLink>
              ))}
              <button className="sidebar-nav-item logout-btn" onClick={handleLogout}>
                <span className="sidebar-nav-icon"><LogOut size={18} /></span>
                <span className="sidebar-nav-label">Logout</span>
              </button>
            </div>
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-pet-card">
              <img src="/pets-hero.png" alt="pet" className="sidebar-pet-img" />
              <div>
                <p className="sidebar-footer-tagline">Care. Love. Repeat.</p>
                <p className="sidebar-footer-sub">Everything your pet needs, all in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="topnav">
          <div className="topnav-left">
            <button className="btn-icon mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="topnav-logo">
              <span>🐾</span><span>Sruvo</span>
            </div>
            <nav className="topnav-links">
              {topNavItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `topnav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="topnav-center">
            <div className="topnav-search">
              <Search size={15} className="search-icon" />
              <input type="text" placeholder="Search for pets, products, services..." />
            </div>
          </div>
          <div className="topnav-right">
            <button className="topnav-icon-btn">
              <Bell size={18} />
              {notifCount > 0 && <span className="topnav-badge">{notifCount}</span>}
            </button>
            <div style={{ position: 'relative' }}>
              <button className="topnav-icon-btn" onClick={() => setWishlistOpen(!wishlistOpen)}>
                <Heart size={18} />
                {wishlistCount > 0 && <span className="topnav-badge">{wishlistCount}</span>}
              </button>
              {wishlistOpen && (
                <div className="cart-dropdown">
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 12 }}>Liked Items</h4>
                  {wishlistItems.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', margin: '20px 0' }}>No liked items</p>
                  ) : (
                    <>
                      <div className="cart-items">
                        {wishlistItems.map(item => (
                          <div key={item.id} className="cart-item">
                            <span className="cart-item-img">{item.img}</span>
                            <div className="cart-item-info">
                              <div className="cart-item-name">{item.name}</div>
                              <div className="cart-item-price">₹{item.price}</div>
                            </div>
                            <button className="btn-icon cart-item-remove" onClick={() => removeFromWishlist(item.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="cart-footer">
                        <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setWishlistOpen(false)}>Close</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button className="topnav-icon-btn" onClick={() => setCartOpen(!cartOpen)}>
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="topnav-badge">{cartCount}</span>}
              </button>
              {cartOpen && (
                <div className="cart-dropdown">
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 12 }}>Your Cart</h4>
                  {cartItems.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', margin: '20px 0' }}>Cart is empty</p>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cartItems.map(item => (
                          <div key={item.id} className="cart-item">
                            <span className="cart-item-img">{item.img}</span>
                            <div className="cart-item-info">
                              <div className="cart-item-name">{item.name}</div>
                              <div className="cart-item-price">₹{item.price} x {item.qty}</div>
                            </div>
                            <button className="btn-icon cart-item-remove" onClick={() => removeFromCart(item.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="cart-footer">
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                          <span>Total:</span>
                          <span>₹{cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toLocaleString()}</span>
                        </div>
                        <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setCartOpen(false)}>Checkout</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="topnav-user" onClick={() => setUserDropdownOpen(!userDropdownOpen)} style={{ position: 'relative', cursor: 'pointer' }}>
              <div className="avatar avatar-md topnav-avatar">{userName.charAt(0).toUpperCase()}</div>
              <div className="topnav-user-info">
                <span className="topnav-user-name">{userName}</span>
                <ChevronDown size={12} />
              </div>
              {userDropdownOpen && (
                <div className="user-dropdown">
                  <button onClick={handleLogout} className="user-dropdown-item">
                    <LogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="page-content fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
