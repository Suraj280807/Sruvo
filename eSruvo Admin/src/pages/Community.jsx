import { useState } from 'react';
import { mockPosts } from '../data/mockData';
import { Trash2, CheckCircle, Flag, Search, Heart, MessageSquare } from 'lucide-react';

export default function Community() {
  const [posts, setPosts] = useState(mockPosts);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = posts.filter(p => {
    const ms = p.user.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
    const mf = filter === 'All' || p.status === filter;
    return ms && mf;
  });

  const removePost = (id) => setPosts(p => p.filter(x => x.id !== id));
  const approvePost = (id) => setPosts(p => p.map(x => x.id === id ? { ...x, status: 'Published', reported: false } : x));
  const flagPost = (id) => setPosts(p => p.map(x => x.id === id ? { ...x, status: 'Flagged', reported: true } : x));

  const counts = { All: posts.length, Published: posts.filter(p=>p.status==='Published').length, Flagged: posts.filter(p=>p.status==='Flagged').length };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">💬 Social</div>
          <h1 className="page-header-title">Community Management</h1>
          <p className="page-header-sub">Monitor posts and manage user-generated content</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        {[
          { label: 'Total Posts', value: posts.length, icon: '📝', color: '#E8F5EE' },
          { label: 'Published', value: posts.filter(p=>p.status==='Published').length, icon: '✅', color: '#DCFCE7' },
          { label: 'Flagged', value: posts.filter(p=>p.reported).length, icon: '🚩', color: '#FEE2E2' },
          { label: 'Total Likes', value: posts.reduce((a,p)=>a+p.likes,0), icon: '❤️', color: '#FCE4EC' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
            <div><div style={{ fontSize: 22, fontWeight: 800 }}>{s.value}</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div></div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg)', padding: 4, borderRadius: 'var(--radius-full)' }}>
          {Object.entries(counts).map(([k, c]) => (
            <button key={k} onClick={() => setFilter(k)}
              style={{ padding: '6px 16px', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: 12, transition: 'all 0.2s', background: filter === k ? 'white' : 'transparent', color: filter === k ? 'var(--primary)' : 'var(--text-muted)', boxShadow: filter === k ? 'var(--shadow-sm)' : 'none' }}>
              {k} <span style={{ marginLeft: 4, background: filter === k ? 'var(--primary-light)' : 'var(--border)', color: filter === k ? 'var(--primary)' : 'var(--text-muted)', borderRadius: 10, padding: '1px 6px', fontSize: 10 }}>{c}</span>
            </button>
          ))}
        </div>
        <div className="input-with-icon" style={{ maxWidth: 260 }}>
          <Search size={14} className="input-icon" />
          <input className="input-field" style={{ borderRadius: 'var(--radius-full)' }} placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(p => (
          <div key={p.id} className="card" style={{ border: p.reported ? '1.5px solid #FCA5A5' : '1px solid var(--border)', background: p.reported ? '#FFF5F5' : 'white', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div className="avatar avatar-md" style={{ background: p.reported ? '#FEE2E2' : 'var(--primary-light)', color: p.reported ? 'var(--danger)' : 'var(--primary)', flexShrink: 0 }}>
                {p.user.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700 }}>{p.user}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.time}</span>
                  <span className={`badge ${p.status === 'Published' ? 'badge-green' : 'badge-red'}`} style={{ marginLeft: 'auto' }}>
                    {p.reported && '🚩 '}{p.status}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>{p.content}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                    <Heart size={13} /> {p.likes}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                    <MessageSquare size={13} /> {p.comments}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {p.status === 'Flagged' && (
                  <button className="btn btn-xs" style={{ background: '#DCFCE7', color: '#166534' }} onClick={() => approvePost(p.id)}><CheckCircle size={12} /> Approve</button>
                )}
                {!p.reported && (
                  <button className="btn btn-xs" style={{ background: '#FEF3C7', color: '#92400E' }} onClick={() => flagPost(p.id)}><Flag size={12} /> Flag</button>
                )}
                <button className="btn btn-xs" style={{ background: '#FEE2E2', color: '#991B1B' }} onClick={() => removePost(p.id)}><Trash2 size={12} /> Remove</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="empty-state"><span className="empty-state-icon">💬</span><p>No posts found</p></div>}
      </div>
    </div>
  );
}
