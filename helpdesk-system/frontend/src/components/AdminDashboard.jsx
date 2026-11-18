import { useState } from 'react';

function AdminDashboard({ tickets, onUpdate, onDelete }) {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = tickets
        .filter(t => filter === 'all' || t.status === filter)
        .filter(t =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.submitted_by.toLowerCase().includes(search.toLowerCase())
        );

    const priorityColor = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
    const statusColor = { open: '#6366f1', in_progress: '#f59e0b', resolved: '#10b981' };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Manage and resolve student support tickets</p>
                </div>
                <div className="admin-stats">
                    <div className="a-stat" style={{ background: '#eef2ff' }}>
                        <span style={{ color: '#6366f1', fontSize: '1.5rem', fontWeight: '700' }}>{tickets.filter(t => t.status === 'open').length}</span>
                        <span style={{ color: '#6366f1', fontSize: '0.75rem' }}>OPEN</span>
                    </div>
                    <div className="a-stat" style={{ background: '#fffbeb' }}>
                        <span style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: '700' }}>{tickets.filter(t => t.status === 'in_progress').length}</span>
                        <span style={{ color: '#f59e0b', fontSize: '0.75rem' }}>IN PROGRESS</span>
                    </div>
                    <div className="a-stat" style={{ background: '#ecfdf5' }}>
                        <span style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: '700' }}>{tickets.filter(t => t.status === 'resolved').length}</span>
                        <span style={{ color: '#10b981', fontSize: '0.75rem' }}>RESOLVED</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <input
                    className="search-input"
                    placeholder="🔍 Search by title or student name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="filter-tabs">
                    {['all', 'open', 'in_progress', 'resolved'].map(f => (
                        <button
                            key={f}
                            className={filter === f ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFilter(f)}
                        >
                            {f === 'all' ? 'All' : f.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ticket Table */}
            <div className="ticket-table">
                {filtered.length === 0 && (
                    <div className="empty">No tickets found.</div>
                )}
                {filtered.map(ticket => (
                    <div key={ticket.id} className="admin-ticket-card">
                        <div className="atc-left">
                            <div className="atc-top">
                                <span className="atc-id">#{ticket.id}</span>
                                <span className="atc-title">{ticket.title}</span>
                                <span className="priority-tag" style={{
                                    background: priorityColor[ticket.priority] + '22',
                                    color: priorityColor[ticket.priority]
                                }}>
                                    {ticket.priority?.toUpperCase()}
                                </span>
                            </div>
                            <div className="atc-meta">
                                <span>👤 {ticket.submitted_by}</span>
                                <span>📂 {ticket.category || 'General'}</span>
                                <span>🕐 {new Date(ticket.created_at).toLocaleDateString()}</span>
                            </div>
                            {ticket.description && (
                                <p className="atc-desc">{ticket.description}</p>
                            )}
                        </div>

                        <div className="atc-right">
                            {/* Status Control */}
                            <div className="control-group">
                                <label>Status</label>
                                <select
                                    value={ticket.status}
                                    onChange={e => onUpdate(ticket.id, { status: e.target.value })}
                                    style={{ borderColor: statusColor[ticket.status] }}
                                >
                                    <option value="open">🔵 Open</option>
                                    <option value="in_progress">🟡 In Progress</option>
                                    <option value="resolved">✅ Resolved</option>
                                </select>
                            </div>

                            {/* Priority Control */}
                            <div className="control-group">
                                <label>Priority</label>
                                <select
                                    value={ticket.priority}
                                    onChange={e => onUpdate(ticket.id, { priority: e.target.value })}
                                    style={{ borderColor: priorityColor[ticket.priority] }}
                                >
                                    <option value="low">🟢 Low</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="high">🔴 High</option>
                                </select>
                            </div>

                            <button className="delete-btn" onClick={() => onDelete(ticket.id)}>
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