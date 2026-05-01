import { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import { Search, Plus, Edit, Trash2, Eye, MoreVertical, Filter } from 'lucide-react';

const statusColor = { Active: 'badge-green', Inactive: 'badge-gray', Suspended: 'badge-red' };

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', city: '' });

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || u.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id) => {
    setUsers(u => u.map(user => user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user));
  };

  const deleteUser = (id) => {
    setUsers(u => u.filter(user => user.id !== id));
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers(u => [...u, { id: Date.now(), ...newUser, pets: 0, joined: 'Today', status: 'Active', avatar: newUser.name.split(' ').map(n=>n[0]).join('').toUpperCase(), spent: '₹0' }]);
    setNewUser({ name: '', email: '', phone: '', city: '' });
    setShowAddModal(false);
  };

  const avatarColors = ['#1B8B3B','#3B82F6','#8B5CF6','#F59E0B','#EF4444','#EC4899','#14B8A6'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">👥 People</div>
          <h1 className="page-header-title">Users Management</h1>
          <p className="page-header-sub">{users.length} registered users on the platform</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">📥 Export</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}><Plus size={14} /> Add User</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        {[
          { label: 'Total Users', value: users.length, icon: '👥', color: '#E8F5EE' },
          { label: 'Active', value: users.filter(u=>u.status==='Active').length, icon: '✅', color: '#DCFCE7' },
          { label: 'Inactive', value: users.filter(u=>u.status==='Inactive').length, icon: '⏸️', color: '#FEF3C7' },
          { label: 'Suspended', value: users.filter(u=>u.status==='Suspended').length, icon: '🚫', color: '#FEE2E2' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div><div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div></div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="filter-bar" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="input-with-icon" style={{ flex: 1, maxWidth: 300 }}>
            <Search size={14} className="input-icon" />
            <input className="input-field" style={{ borderRadius: 'var(--radius-full)' }} placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option>All</option><option>Active</option><option>Inactive</option><option>Suspended</option>
          </select>
        </div>
        <div className="table-wrapper" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
          <table className="admin-table">
            <thead>
              <tr><th><input type="checkbox" className="checkbox" /></th><th>User</th><th>Email</th><th>City</th><th>Pets</th><th>Joined</th><th>Spent</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id}>
                  <td><input type="checkbox" className="checkbox" /></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar avatar-sm" style={{ background: avatarColors[i % avatarColors.length], color: 'white' }}>{u.avatar}</div>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{u.email}</td>
                  <td style={{ fontSize: 12 }}>{u.city}</td>
                  <td><span className="badge badge-green">{u.pets} pets</span></td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.joined}</td>
                  <td style={{ fontWeight: 600 }}>{u.spent}</td>
                  <td><span className={`badge ${statusColor[u.status]}`}><span className={`status-dot ${u.status === 'Active' ? 'dot-green' : u.status === 'Suspended' ? 'dot-red' : 'dot-gray'}`} />{u.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-icon-only" title="View" onClick={() => { setSelectedUser(u); setShowModal(true); }}><Eye size={14} /></button>
                      <button className="btn btn-ghost btn-icon-only" title={u.status === 'Active' ? 'Deactivate' : 'Activate'} onClick={() => toggleStatus(u.id)}><Edit size={14} /></button>
                      <button className="btn btn-ghost btn-icon-only" style={{ color: 'var(--danger)' }} title="Delete" onClick={() => deleteUser(u.id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="empty-state"><span className="empty-state-icon">👤</span><p>No users found</p></div>}
      </div>

      {/* View Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">User Profile</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: 'var(--bg)', borderRadius: 12 }}>
                <div className="avatar avatar-xl" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-mid))', color: 'white', fontSize: 22 }}>{selectedUser.avatar}</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{selectedUser.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{selectedUser.email}</div>
                  <span className={`badge ${statusColor[selectedUser.status]}`} style={{ marginTop: 6 }}>{selectedUser.status}</span>
                </div>
              </div>
              <div className="grid-2">
                {[['Phone', selectedUser.phone], ['City', selectedUser.city], ['Pets', selectedUser.pets], ['Total Spent', selectedUser.spent], ['Joined', selectedUser.joined]].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{k}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Close</button>
                <button className="btn btn-danger btn-sm" onClick={() => { toggleStatus(selectedUser.id); setShowModal(false); }}>
                  {selectedUser.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add New User</div>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div className="modal-form">
              {[['Full Name', 'name', 'text', 'Enter full name'], ['Email', 'email', 'email', 'user@email.com'], ['Phone', 'phone', 'tel', '+91 XXXXXXXXXX'], ['City', 'city', 'text', 'City name']].map(([label, key, type, ph]) => (
                <div key={key} className="input-group">
                  <label className="input-label">{label}</label>
                  <input className="input-field" type={type} placeholder={ph} value={newUser[key]} onChange={e => setNewUser({...newUser, [key]: e.target.value})} />
                </div>
              ))}
              <div className="modal-footer">
                <button className="btn btn-outline btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={addUser}>Add User</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
