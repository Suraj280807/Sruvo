import { recentActivity, revenueData, categoryData, mockBookings } from '../../data/mockData';
import { Users, PawPrint, Calendar, TrendingUp, ShoppingBag, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const stats = [
  { label: 'Total Users', value: '12,847', trend: '+12.5%', up: true, icon: '👥', color: '#E8F5EE', iconBg: '#1B8B3B', sub: 'vs last month' },
  { label: 'Active Pets', value: '8,392', trend: '+8.2%', up: true, icon: '🐾', color: '#DBEAFE', iconBg: '#3B82F6', sub: 'registered pets' },
  { label: 'Bookings Today', value: '186', trend: '+24%', up: true, icon: '📅', color: '#FEF3C7', iconBg: '#F59E0B', sub: '14 pending review' },
  { label: 'Revenue (May)', value: '₹89K', trend: '+18.3%', up: true, icon: '💰', color: '#EDE9FE', iconBg: '#8B5CF6', sub: 'vs ₹74K last month' },
  { label: 'Products Active', value: '248', trend: '-2', up: false, icon: '📦', color: '#FFEDD5', iconBg: '#EF4444', sub: '8 out of stock' },
  { label: 'Avg. Rating', value: '4.7★', trend: '+0.2', up: true, icon: '⭐', color: '#FCE4EC', iconBg: '#EC4899', sub: 'across all services' },
];

const todayBookings = mockBookings.slice(0, 5);

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">🐾 Welcome back</div>
          <h1 className="page-header-title">Admin Dashboard</h1>
          <p className="page-header-sub">Here's what's happening with Sruvo today</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">📊 Export Report</button>
          <button className="btn btn-primary btn-sm">+ Quick Add</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ '--stat-color': s.color, background: `linear-gradient(135deg, white 60%, ${s.color})` }}>
            <div className="stat-card-top">
              <div className="stat-icon" style={{ background: s.color }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
              </div>
              <div className={`stat-trend ${s.up ? 'up' : 'down'}`}>
                {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {s.trend}
              </div>
            </div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Revenue Chart */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">Revenue Overview</div>
            <select className="filter-select">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B8B3B" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#1B8B3B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#1B8B3B" strokeWidth={2.5} fill="url(#revGrad)" dot={{ fill: '#1B8B3B', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">Revenue by Category</div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {categoryData.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.name}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        {/* Recent Bookings */}
        <div className="card" style={{ padding: 0 }}>
          <div className="section-header" style={{ padding: '16px 20px 0' }}>
            <div className="section-title">Recent Bookings</div>
            <span className="section-link">View all</span>
          </div>
          <div className="table-wrapper" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th><th>User</th><th>Service</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todayBookings.map(b => (
                  <tr key={b.id}>
                    <td><span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{b.id}</span></td>
                    <td><div style={{ fontWeight: 600 }}>{b.user}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.pet}</div></td>
                    <td>{b.service}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.date}</td>
                    <td>
                      <span className={`badge ${b.status === 'Confirmed' ? 'badge-green' : b.status === 'Pending' ? 'badge-yellow' : b.status === 'Completed' ? 'badge-blue' : 'badge-red'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">Recent Activity</div>
            <span className="section-link">View all</span>
          </div>
          <div className="timeline">
            {recentActivity.map(a => (
              <div key={a.id} className="timeline-item">
                <div className="timeline-dot" style={{ background: a.color, fontSize: 14 }}>{a.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-title">{a.title}</div>
                  <div className="timeline-sub">{a.sub}</div>
                </div>
                <div className="timeline-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Bar Chart */}
      <div className="card">
        <div className="section-header">
          <div className="section-title">Orders Trend</div>
          <select className="filter-select"><option>Last 6 months</option></select>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={revenueData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 12 }} />
            <Bar dataKey="orders" fill="#1B8B3B" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
