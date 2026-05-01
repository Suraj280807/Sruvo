import { revenueData, categoryData } from '../../data/mockData';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const weeklyData = [
  { day: 'Mon', users: 42, bookings: 28, orders: 56 },
  { day: 'Tue', users: 58, bookings: 34, orders: 72 },
  { day: 'Wed', users: 51, bookings: 29, orders: 61 },
  { day: 'Thu', users: 67, bookings: 45, orders: 84 },
  { day: 'Fri', users: 89, bookings: 62, orders: 98 },
  { day: 'Sat', users: 74, bookings: 58, orders: 87 },
  { day: 'Sun', users: 63, bookings: 41, orders: 76 },
];

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-header-eyebrow">📊 Insights</div>
          <h1 className="page-header-title">Analytics</h1>
          <p className="page-header-sub">Platform performance metrics and trends</p>
        </div>
        <div className="page-header-actions">
          <select className="filter-select"><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select>
          <button className="btn btn-primary btn-sm">📥 Export</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid-4">
        {[
          { label: 'Total Revenue', value: '₹4,81,000', change: '+22%', color: '#1B8B3B' },
          { label: 'New Users', value: '3,214', change: '+14%', color: '#3B82F6' },
          { label: 'Total Bookings', value: '1,847', change: '+31%', color: '#F59E0B' },
          { label: 'Conversion Rate', value: '6.8%', change: '+1.2%', color: '#8B5CF6' },
        ].map((k, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: k.color, letterSpacing: -1 }}>{k.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{k.label}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#22C55E', marginTop: 6 }}>↑ {k.change} vs last period</div>
          </div>
        ))}
      </div>

      {/* Revenue vs Orders */}
      <div className="card">
        <div className="section-header">
          <div className="section-title">Revenue & Orders (Monthly)</div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1B8B3B" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#1B8B3B" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 12 }} />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke="#1B8B3B" strokeWidth={2.5} fill="url(#g1)" dot={{ fill: '#1B8B3B', r: 4 }} />
            <Area yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#3B82F6" strokeWidth={2} fill="url(#g2)" dot={{ fill: '#3B82F6', r: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid-2">
        {/* Weekly Activity */}
        <div className="card">
          <div className="section-header"><div className="section-title">Weekly Activity</div></div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="users" name="Users" stroke="#1B8B3B" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="bookings" name="Bookings" stroke="#F59E0B" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="orders" name="Orders" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="card">
          <div className="section-header"><div className="section-title">Revenue Breakdown</div></div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, 'Share']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
            {categoryData.map((c, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '8px', background: 'var(--bg)', borderRadius: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: c.color, margin: '0 auto 4px' }} />
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.name}</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{c.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
