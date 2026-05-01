import { useState } from 'react';
import { mockPets } from '../data/mockData';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

const statusBadge = { Healthy: 'badge-green', 'Under Treatment': 'badge-orange', 'Overdue Checkup': 'badge-red' };

export default function Pets() {
  const [pets, setPets] = useState(mockPets);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name:'', owner:'', breed:'', age:'', gender:'Male', weight:'', emoji:'🐕' });

  const filtered = pets.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.owner.toLowerCase().includes(search.toLowerCase()) ||
    p.breed.toLowerCase().includes(search.toLowerCase())
  );

  const addPet = () => {
    if (!form.name) return;
    setPets(p => [...p, { id: Date.now(), ...form, status: 'Healthy', lastCheckup: 'N/A' }]);
    setForm({ name:'', owner:'', breed:'', age:'', gender:'Male', weight:'', emoji:'🐕' });
    setShowAdd(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">🐾 Pets</div>
          <h1 className="page-header-title">Pets Management</h1>
          <p className="page-header-sub">{pets.length} registered pets on the platform</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}><Plus size={14} /> Add Pet</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        {[
          { label: 'Total Pets', value: pets.length, icon: '🐾', color: '#E8F5EE' },
          { label: 'Healthy', value: pets.filter(p=>p.status==='Healthy').length, icon: '✅', color: '#DCFCE7' },
          { label: 'Under Treatment', value: pets.filter(p=>p.status==='Under Treatment').length, icon: '🏥', color: '#FFEDD5' },
          { label: 'Overdue Checkup', value: pets.filter(p=>p.status==='Overdue Checkup').length, icon: '⚠️', color: '#FEE2E2' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div><div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div></div>
          </div>
        ))}
      </div>

      {/* Pet Cards Grid */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="input-with-icon" style={{ maxWidth: 300 }}>
            <Search size={14} className="input-icon" />
            <input className="input-field" style={{ borderRadius: 'var(--radius-full)' }} placeholder="Search pets, owners..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {filtered.map(p => (
              <div key={p.id} className="card card-sm" style={{ border: '1.5px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => { setSelected(p); setShowModal(true); }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 52, height: 52, background: 'var(--bg)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{p.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.breed}</div>
                    <span className={`badge ${statusBadge[p.status]}`} style={{ marginTop: 4 }}>{p.status}</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {[['Owner', p.owner.split(' ')[0]], ['Age', p.age.split(' ')[0] + 'y'], ['Gender', p.gender[0]]].map(([k, v]) => (
                    <div key={k} style={{ background: 'var(--bg)', padding: '6px 8px', borderRadius: 8, textAlign: 'center' }}>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{k}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Last: {p.lastCheckup}</span>
                  <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                    <button className="btn btn-ghost btn-icon-only btn-sm"><Edit size={13} /></button>
                    <button className="btn btn-ghost btn-icon-only btn-sm" style={{ color: 'var(--danger)' }} onClick={() => setPets(pt => pt.filter(x => x.id !== p.id))}><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <div className="empty-state"><span className="empty-state-icon">🐾</span><p>No pets found</p></div>}
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selected && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Pet Profile</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 64, marginBottom: 8 }}>{selected.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{selected.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{selected.breed}</div>
              <span className={`badge ${statusBadge[selected.status]}`} style={{ marginTop: 8 }}>{selected.status}</span>
            </div>
            <div className="grid-2">
              {[['Owner', selected.owner], ['Age', selected.age], ['Gender', selected.gender], ['Weight', selected.weight], ['Last Checkup', selected.lastCheckup]].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Close</button>
              <button className="btn btn-danger btn-sm" onClick={() => { setPets(p => p.filter(x => x.id !== selected.id)); setShowModal(false); }}>Remove Pet</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Register New Pet</div>
              <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-form">
              {[['Pet Name','name','text','e.g. Bruno'],['Owner Name','owner','text','Owner full name'],['Breed','breed','text','e.g. Golden Retriever'],['Age','age','text','e.g. 2 Years'],['Weight','weight','text','e.g. 28 kg']].map(([label, key, type, ph]) => (
                <div key={key} className="input-group">
                  <label className="input-label">{label}</label>
                  <input className="input-field" type={type} placeholder={ph} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} />
                </div>
              ))}
              <div className="input-group">
                <label className="input-label">Gender</label>
                <select className="input-field" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                  <option>Male</option><option>Female</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Pet Emoji</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['🐕','🐈','🐶','🐱','🦜','🐇'].map(e => (
                    <button key={e} onClick={() => setForm({...form, emoji: e})}
                      style={{ fontSize: 24, padding: 8, borderRadius: 8, background: form.emoji === e ? 'var(--primary-light)' : 'var(--bg)', border: form.emoji === e ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer' }}>{e}</button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={addPet}>Register Pet</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
