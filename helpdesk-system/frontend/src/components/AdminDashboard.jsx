import { useState } from 'react';

function AdminDashboard({ tickets, onUpdate, onDelete }) {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = tickets
        .filter(t => filter === 'all' || t.status === filter)
        .filter(t =>
            t.title?.toLowerCase().includes(search.toLowerCase()) ||
            t.submitted_by?.toLowerCase().includes(search.toLowerCase()) ||
            t.student_id?.toLowerCase().includes(search.toLowerCase())
        );

    const pc = { low: '#16a34a', medium: '#d97706', high: '#dc2626' };
    const sc = { open: '#7c3aed', in_progress: '#d97706', resolved: '#065f46' };

    return (
        <div className="admin-page">
            <div className="admin-topbar">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>University of Peradeniya — IT Help Desk Management</p>
                </div>
                <div className="admin-kpis">
                    {[
                        { label: 'Total', val: tickets.length, color: '#1e3a5f', bg: '#e8eef7' },
                        { label: 'Open', val: tickets.filter(t => t.status === 'open').length, color: '#7c3aed', bg: '#ede9fe' },
                        { label: 'In Progress', val: tickets.filter(t => t.status === 'in_progress').length, color: '#d97706', bg: '#fef3c7' },
                        { label: 'Resolved', val: tickets.filter(t => t.status === 'resolved').length, color: '#065f46', bg: '#d1fae5' },
                    ].map(k => (
                        <div key={k.label} className="kpi" style={{ background: k.bg }}>
                            <span style={{ color: k.color, fontSize: '1.8rem', fontWeight: 700 }}>{k.val}</span>
                            <span style={{ color: k.color, fontSize: '11px', fontWeight: 600 }}>{k.label.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="admin-filters">
                <input className="admin-search" value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="🔍  Search by title, student name or ID..." />
                <div className="filter-group">
                    {['all', 'open', 'in_progress', 'resolved'].map(f => (
                        <button key={f}
                            className={filter === f ? 'fbtn active' : 'fbtn'}
                            onClick={() => setFilter(f)}>
                            {f === 'all' ? 'All Tickets' : f.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </button>
                    ))}
                </div>
            </div>

            <div className="ticket-list">
                {filtered.length === 0 && (
                    <div className="empty-state">📭 No tickets found.</div>
                )}
                {filtered.map(ticket => (
                    <div key={ticket.id} className="admin-card">
                        <div className="ac-body">
                            <div className="ac-header">
                                <span className="ac-id">#{ticket.id}</span>
                                <span className="ac-title">{ticket.title}</span>
                                <span className="ac-priority"
                                    style={{ background: pc[ticket.priority] + '22', color: pc[ticket.priority] }}>
                                    {ticket.priority?.toUpperCase()}
                                </span>
                            </div>
                            <div className="ac-meta">
                                <span>👤 {ticket.submitted_by}</span>
                                <span>🎓 {ticket.student_id || 'N/A'}</span>
                                <span>📂 {ticket.category || 'General'}</span>
                                <span>🕐 {new Date(ticket.created_at).toLocaleDateString('en-GB')}</span>
                            </div>
                            {ticket.description && (
                                <p className="ac-desc">{ticket.description}</p>
                            )}
                        </div>
                        <div className="ac-controls">
                            <div className="ctrl">
                                <label>Status</label>
                                <select value={ticket.status}
                                    style={{ borderColor: sc[ticket.status] }}
                                    onChange={e => onUpdate(ticket.id, { status: e.target.value })}>
                                    <option value="open">🔵 Open</option>
                                    <option value="in_progress">🟡 In Progress</option>
                                    <option value="resolved">✅ Resolved</option>
                                </select>
                            </div>
                            <div className="ctrl">
                                <label>Priority</label>
                                <select value={ticket.priority}
                                    style={{ borderColor: pc[ticket.priority] }}
                                    onChange={e => onUpdate(ticket.id, { priority: e.target.value })}>
                                    <option value="low">🟢 Low</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="high">🔴 High</option>
                                </select>
                            </div>
                            <button className="del-btn" onClick={() => onDelete(ticket.id)}>
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;