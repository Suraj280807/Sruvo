import { useState } from 'react';
import { mockServices } from '../../data/mockData';
import { Plus, Edit, Trash2, Star, Pause, Play } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState(mockServices);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name:'', category:'Grooming', price:'', provider:'', emoji:'✂️' });

  const toggleStatus = (id) => setServices(s => s.map(x => x.id === id ? { ...x, status: x.status === 'Active' ? 'Paused' : 'Active' } : x));

  const save = () => {
    if (!form.name) return;
    setServices(s => [...s, { id: Date.now(), ...form, price: Number(form.price), rating: 4.5, bookings: 0, status: 'Active' }]);
    setForm({ name:'', category:'Grooming', price:'', provider:'', emoji:'✂️' });
    setShowAdd(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">✂️ Services</div>
          <h1 className="page-header-title">Services Management</h1>
          <p className="page-header-sub">{services.length} active service categories</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}><Plus size={14} /> Add Service</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        {[
          { label: 'Total Services', value: services.length, icon: '🛠️', color: '#E8F5EE' },
          { label: 'Active', value: services.filter(s=>s.status==='Active').length, icon: '✅', color: '#DCFCE7' },
          { label: 'Paused', value: services.filter(s=>s.status==='Paused').length, icon: '⏸️', color: '#FEF3C7' },
          { label: 'Total Bookings', value: services.reduce((a,s)=>a+s.bookings,0), icon: '📅', color: '#DBEAFE' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
            <div><div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div></div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {services.map(s => (
          <div key={s.id} className="card" style={{ border: `1.5px solid ${s.status === 'Active' ? 'var(--border)' : '#FEF3C7'}`, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, background: 'var(--bg)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{s.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.category}</div>
                </div>
              </div>
              <span className={`badge ${s.status === 'Active' ? 'badge-green' : 'badge-yellow'}`}>{s.status}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
              {[['Provider', s.provider], ['Price', `₹${s.price}`], ['Bookings', s.bookings]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg)', padding: '8px 10px', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 14 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= Math.floor(s.rating) ? '#FFC107' : 'none'} color={i <= Math.floor(s.rating) ? '#FFC107' : '#E5E7EB'} />)}
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 4 }}>{s.rating}</span>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`btn btn-sm ${s.status === 'Active' ? 'btn-outline' : 'btn-primary'}`} style={{ flex: 1, justifyContent: 'center' }} onClick={() => toggleStatus(s.id)}>
                {s.status === 'Active' ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Activate</>}
              </button>
              <button className="btn btn-ghost btn-icon-only"><Edit size={14} /></button>
              <button className="btn btn-ghost btn-icon-only" style={{ color: 'var(--danger)' }} onClick={() => setServices(sv => sv.filter(x => x.id !== s.id))}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}

        {/* Add Card */}
        <div className="card" style={{ border: '1.5px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', minHeight: 200, transition: 'all 0.2s' }}
          onClick={() => setShowAdd(true)}>
          <div style={{ width: 48, height: 48, background: 'var(--primary-light)', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={22} color="var(--primary)" />
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>Add New Service</div>
        </div>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add New Service</div>
              <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-form">
              {[['Service Name','name','text','e.g. Dog Grooming'],['Provider Name','provider','text','e.g. Paws & Claws']].map(([l, k, t, p]) => (
                <div key={k} className="input-group">
                  <label className="input-label">{l}</label>
                  <input className="input-field" type={t} placeholder={p} value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})} />
                </div>
              ))}
              <div className="grid-2">
                <div className="input-group">
                  <label className="input-label">Category</label>
                  <select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {['Grooming','Walking','Boarding','Training','Sitting','Others'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Price (₹)</label>
                  <input className="input-field" type="number" placeholder="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Emoji</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['✂️','🚶','🏠','🎓','🛋️','🧼'].map(e => (
                    <button key={e} onClick={() => setForm({...form, emoji: e})}
                      style={{ fontSize: 22, padding: 8, borderRadius: 8, background: form.emoji === e ? 'var(--primary-light)' : 'var(--bg)', border: form.emoji === e ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer' }}>{e}</button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={save}>Add Service</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
