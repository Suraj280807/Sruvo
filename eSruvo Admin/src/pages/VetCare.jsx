import { useState } from 'react';
import { mockVets, mockAppointments } from '../data/mockData';
import { Plus, Edit, Trash2, Star, CheckCircle } from 'lucide-react';

export default function VetCare() {
  const [vets, setVets] = useState(mockVets);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [showAdd, setShowAdd] = useState(false);
  const [tab, setTab] = useState('vets');
  const [form, setForm] = useState({ name:'', specialty:'General Veterinarian', exp:'', fee:'', location:'', emoji:'👩‍⚕️' });

  const save = () => {
    if (!form.name) return;
    setVets(v => [...v, { id: Date.now(), ...form, rating: 4.5, consultations: 0, status: 'Available' }]);
    setForm({ name:'', specialty:'General Veterinarian', exp:'', fee:'', location:'', emoji:'👩‍⚕️' });
    setShowAdd(false);
  };

  const updateAppt = (id, status) => setAppointments(a => a.map(x => x.id === id ? { ...x, status } : x));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">🩺 Medical</div>
          <h1 className="page-header-title">Vet Care Management</h1>
          <p className="page-header-sub">Manage veterinarians and appointments</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}><Plus size={14} /> Add Vet</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        {[
          { label: 'Total Vets', value: vets.length, icon: '👨‍⚕️', color: '#E8F5EE' },
          { label: 'Available', value: vets.filter(v=>v.status==='Available').length, icon: '✅', color: '#DCFCE7' },
          { label: 'Total Consultations', value: vets.reduce((a,v)=>a+v.consultations,0), icon: '🩺', color: '#EDE9FE' },
          { label: 'Pending Appointments', value: appointments.filter(a=>a.status==='Pending').length, icon: '⏳', color: '#FEF3C7' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
            <div><div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div></div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--bg)', padding: 4, borderRadius: 'var(--radius-full)', width: 'fit-content' }}>
        {[['vets','👨‍⚕️ Veterinarians'],['appts','📅 Appointments']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            style={{ padding: '8px 20px', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: 13, transition: 'all 0.2s', background: tab === key ? 'white' : 'transparent', color: tab === key ? 'var(--primary)' : 'var(--text-muted)', boxShadow: tab === key ? 'var(--shadow-sm)' : 'none' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'vets' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {vets.map(v => (
            <div key={v.id} className="card" style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 64, height: 64, background: 'var(--primary-light)', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>{v.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v.specialty} · {v.exp}</div>
                  </div>
                  <span className={`badge ${v.status === 'Available' ? 'badge-green' : 'badge-red'}`}>{v.status}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, margin: '8px 0' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= Math.floor(v.rating) ? '#FFC107' : 'none'} color={i <= Math.floor(v.rating) ? '#FFC107' : '#E5E7EB'} />)}
                  <span style={{ fontSize: 12, marginLeft: 4, color: 'var(--text-secondary)' }}>{v.rating} · {v.consultations} consults</span>
                </div>
                <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                  <span>📍 {v.location}</span><span>💰 {v.fee}/consult</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}><Edit size={12} /> Edit</button>
                  <button className="btn btn-ghost btn-icon-only" style={{ color: 'var(--danger)' }} onClick={() => setVets(vs => vs.filter(x => x.id !== v.id))}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'appts' && (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrapper" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table className="admin-table">
              <thead>
                <tr><th>ID</th><th>User / Pet</th><th>Vet</th><th>Date & Time</th><th>Type</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id}>
                    <td><code style={{ fontSize: 11, background: 'var(--bg)', padding: '2px 6px', borderRadius: 4, color: 'var(--primary)' }}>{a.id}</code></td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{a.user}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>🐾 {a.pet}</div>
                    </td>
                    <td style={{ fontSize: 13 }}>{a.vet}</td>
                    <td><div style={{ fontSize: 12 }}>{a.date}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.time}</div></td>
                    <td><span className="badge badge-purple">{a.type}</span></td>
                    <td><span className={`badge ${a.status === 'Confirmed' ? 'badge-green' : a.status === 'Pending' ? 'badge-yellow' : 'badge-blue'}`}>{a.status}</span></td>
                    <td>
                      {a.status === 'Pending' && (
                        <div className="table-actions">
                          <button className="btn btn-xs" style={{ background: '#DCFCE7', color: '#166534' }} onClick={() => updateAppt(a.id, 'Confirmed')}>Confirm</button>
                          <button className="btn btn-xs" style={{ background: '#FEE2E2', color: '#991B1B' }} onClick={() => updateAppt(a.id, 'Cancelled')}>Cancel</button>
                        </div>
                      )}
                      {a.status === 'Confirmed' && (
                        <button className="btn btn-xs" style={{ background: '#DBEAFE', color: '#1E40AF' }} onClick={() => updateAppt(a.id, 'Completed')}>Mark Done</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Vet Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add New Veterinarian</div>
              <button className="modal-close" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-form">
              {[['Full Name','name','text','Dr. Full Name'],['Experience','exp','text','e.g. 5 Years'],['Consultation Fee','fee','text','e.g. ₹500'],['Location','location','text','City']].map(([l, k, t, p]) => (
                <div key={k} className="input-group">
                  <label className="input-label">{l}</label>
                  <input className="input-field" type={t} placeholder={p} value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})} />
                </div>
              ))}
              <div className="input-group">
                <label className="input-label">Specialty</label>
                <select className="input-field" value={form.specialty} onChange={e => setForm({...form, specialty: e.target.value})}>
                  {['General Veterinarian','Canine Specialist','Feline Specialist','Exotic Animals','Avian Specialist'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Emoji</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['👩‍⚕️','👨‍⚕️','🩺'].map(e => (
                    <button key={e} onClick={() => setForm({...form, emoji: e})}
                      style={{ fontSize: 24, padding: 8, borderRadius: 8, background: form.emoji === e ? 'var(--primary-light)' : 'var(--bg)', border: form.emoji === e ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer' }}>{e}</button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={save}>Add Veterinarian</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
