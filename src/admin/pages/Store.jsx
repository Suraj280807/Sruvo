import { useState } from 'react';
import { mockProducts } from '../../data/mockData';
import { Search, Plus, Edit, Trash2, Star } from 'lucide-react';

const categories = ['All', 'Food', 'Grooming', 'Toys', 'Accessories', 'Health'];
const stockBadge = (s, stock) => stock === 0 ? 'badge-red' : s === 'Low Stock' ? 'badge-yellow' : 'badge-green';

export default function Store() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:'', category:'Food', price:'', stock:'', emoji:'📦' });

  const filtered = products.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase());
    const mc = cat === 'All' || p.category === cat;
    return ms && mc;
  });

  const save = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      setProducts(p => p.map(x => x.id === editing ? { ...x, ...form, price: Number(form.price), stock: Number(form.stock) } : x));
      setEditing(null);
    } else {
      setProducts(p => [...p, { id: Date.now(), ...form, price: Number(form.price), stock: Number(form.stock), sales: 0, rating: 4.5, status: 'Active' }]);
    }
    setForm({ name:'', category:'Food', price:'', stock:'', emoji:'📦' });
    setShowAdd(false);
  };

  const startEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, emoji: p.emoji });
    setEditing(p.id);
    setShowAdd(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">🛒 Products</div>
          <h1 className="page-header-title">Store Management</h1>
          <p className="page-header-sub">{products.length} products · {products.filter(p=>p.stock===0).length} out of stock</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary btn-sm" onClick={() => { setEditing(null); setForm({ name:'', category:'Food', price:'', stock:'', emoji:'📦' }); setShowAdd(true); }}><Plus size={14} /> Add Product</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        {[
          { label: 'Total Products', value: products.length, icon: '📦', color: '#E8F5EE' },
          { label: 'Active', value: products.filter(p=>p.status==='Active').length, icon: '✅', color: '#DCFCE7' },
          { label: 'Out of Stock', value: products.filter(p=>p.stock===0).length, icon: '❌', color: '#FEE2E2' },
          { label: 'Total Sales', value: products.reduce((a,p)=>a+p.sales,0), icon: '💳', color: '#EDE9FE' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div><div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div></div>
          </div>
        ))}
      </div>

      {/* Filters & Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="filter-bar" style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-light)', flexWrap: 'wrap', gap: 8 }}>
          <div className="input-with-icon" style={{ maxWidth: 260 }}>
            <Search size={14} className="input-icon" />
            <input className="input-field" style={{ borderRadius: 'var(--radius-full)' }} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {categories.map(c => (
              <button key={c} className={`btn btn-sm ${cat === c ? 'btn-primary' : 'btn-outline'}`} style={{ borderRadius: 'var(--radius-full)' }} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
          <table className="admin-table">
            <thead>
              <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Sales</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, background: 'var(--bg)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{p.emoji}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                        {p.oldPrice && <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{p.oldPrice}</div>}
                      </div>
                    </div>
                  </td>
                  <td><span className="tag tag-green">{p.category}</span></td>
                  <td style={{ fontWeight: 700 }}>₹{p.price}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{p.stock}</span>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className={`progress-fill ${p.stock === 0 ? 'danger' : p.stock < 30 ? 'warning' : ''}`} style={{ width: `${Math.min(100, p.stock / 2)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td>{p.sales}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={12} fill="#FFC107" color="#FFC107" />
                      <span style={{ fontWeight: 600, fontSize: 12 }}>{p.rating}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${p.stock === 0 ? 'badge-red' : p.status === 'Low Stock' ? 'badge-yellow' : 'badge-green'}`}>{p.stock === 0 ? 'Out of Stock' : p.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-icon-only" onClick={() => startEdit(p)}><Edit size={14} /></button>
                      <button className="btn btn-ghost btn-icon-only" style={{ color: 'var(--danger)' }} onClick={() => setProducts(pr => pr.filter(x => x.id !== p.id))}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="empty-state"><span className="empty-state-icon">📦</span><p>No products found</p></div>}
      </div>

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editing ? 'Edit Product' : 'Add New Product'}</div>
              <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-form">
              <div className="input-group">
                <label className="input-label">Product Name</label>
                <input className="input-field" placeholder="Product name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="grid-2">
                <div className="input-group">
                  <label className="input-label">Category</label>
                  <select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {['Food','Grooming','Toys','Accessories','Health'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Price (₹)</label>
                  <input className="input-field" type="number" placeholder="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Stock Quantity</label>
                  <input className="input-field" type="number" placeholder="0" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Emoji / Icon</label>
                  <input className="input-field" placeholder="e.g. 🥘" value={form.emoji} onChange={e => setForm({...form, emoji: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={save}>{editing ? 'Save Changes' : 'Add Product'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
