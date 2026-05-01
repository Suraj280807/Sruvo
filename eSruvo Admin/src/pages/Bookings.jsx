import { useState } from 'react';
import { mockBookings } from '../data/mockData';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

const statusStyles = {
  Pending: 'badge-yellow',
  Confirmed: 'badge-green',
  Completed: 'badge-blue',
  Cancelled: 'badge-red',
};

const providers = ['Paws & Claws', 'Happy Tails', 'Pet Stay Inn', 'PawFect Training', 'Kitty Care'];

export default function Bookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = bookings.filter(b => {
    const ms = b.user.toLowerCase().includes(search.toLowerCase()) || b.service.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === 'All' || b.status === statusFilter;
    return ms && mf;
  });

  const updateStatus = (id, status) => setBookings(b => b.map(x => x.id === id ? { ...x, status } : x));
  const assignProvider = (id, provider) => setBookings(b => b.map(x => x.id === id ? { ...x, provider } : x));

  const counts = { All: bookings.length, Pending: bookings.filter(b=>b.status==='Pending').length, Confirmed: bookings.filter(b=>b.status==='Confirmed').length, Completed: bookings.filter(b=>b.status==='Completed').length, Cancelled: bookings.filter(b=>b.status==='Cancelled').length };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">📅 Bookings</div>
          <h1 className="page-header-title">Bookings Management</h1>
          <p className="page-header-sub">Manage all service bookings and appointments</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">📥 Export</button>
        </div>
      </div>

      {/* Status cards */}
      <div className="grid-5">
        {Object.entries(counts).map(([s, c]) => (
          <div key={s} className="card card-sm" style={{ cursor: 'pointer', border: statusFilter === s ? '1.5px solid var(--primary)' : '1px solid var(--border)', background: statusFilter === s ? 'var(--primary-light)' : 'white', transition: 'all 0.2s' }}
            onClick={() => setStatusFilter(s)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: statusFilter === s ? 'var(--primary)' : 'var(--text-primary)' }}>{c}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s}</div>
              </div>
              <span style={{ fontSize: 20 }}>{s === 'Pending' ? '⏳' : s === 'Confirmed' ? '✅' : s === 'Completed' ? '🏁' : s === 'Cancelled' ? '❌' : '📅'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="filter-bar" style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="input-with-icon" style={{ maxWidth: 300 }}>
            <Search size={14} className="input-icon" />
            <input className="input-field" style={{ borderRadius: 'var(--radius-full)' }} placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All</option><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
          </select>
        </div>

        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
          <table className="admin-table">
            <thead>
              <tr><th>Booking ID</th><th>User / Pet</th><th>Service</th><th>Provider</th><th>Date & Time</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td><code style={{ fontSize: 11, background: 'var(--bg)', padding: '2px 6px', borderRadius: 4, color: 'var(--primary)' }}>{b.id}</code></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.user}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>🐾 {b.pet}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>{b.service}</td>
                  <td>
                    <select className="filter-select" style={{ fontSize: 11, padding: '4px 8px' }} value={b.provider} onChange={e => assignProvider(b.id, e.target.value)}>
                      {providers.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </td>
                  <td>
                    <div style={{ fontSize: 12 }}>{b.date}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.time}</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>{b.amount}</td>
                  <td><span className={`badge ${statusStyles[b.status]}`}>{b.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-icon-only" onClick={() => { setSelected(b); setShowModal(true); }}><Eye size={14} /></button>
                      {b.status === 'Pending' && <>
                        <button className="btn btn-xs" style={{ background: '#DCFCE7', color: '#166534' }} onClick={() => updateStatus(b.id, 'Confirmed')}><CheckCircle size={12} /></button>
                        <button className="btn btn-xs" style={{ background: '#FEE2E2', color: '#991B1B' }} onClick={() => updateStatus(b.id, 'Cancelled')}><XCircle size={12} /></button>
                      </>}
                      {b.status === 'Confirmed' && (
                        <button className="btn btn-xs" style={{ background: '#DBEAFE', color: '#1E40AF' }} onClick={() => updateStatus(b.id, 'Completed')}>Done</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="empty-state"><span className="empty-state-icon">📅</span><p>No bookings found</p></div>}
      </div>

      {/* Detail Modal */}
      {showModal && selected && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Booking Details — {selected.id}</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: 16, background: 'var(--bg)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${statusStyles[selected.status]}`} style={{ fontSize: 13, padding: '4px 14px' }}>{selected.status}</span>
                <span style={{ fontWeight: 800, fontSize: 18 }}>{selected.amount}</span>
              </div>
              <div className="grid-2">
                {[['User', selected.user], ['Pet', selected.pet], ['Service', selected.service], ['Provider', selected.provider], ['Date', selected.date], ['Time', selected.time]].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Close</button>
                {selected.status === 'Pending' && <button className="btn btn-primary btn-sm" onClick={() => { updateStatus(selected.id, 'Confirmed'); setShowModal(false); }}>Confirm Booking</button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
