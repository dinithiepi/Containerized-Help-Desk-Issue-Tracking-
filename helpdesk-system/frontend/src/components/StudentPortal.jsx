import { useState } from 'react';

function StudentPortal({ tickets, onSubmit }) {
    const [form, setForm] = useState({
        title: '', description: '', priority: 'medium',
        submitted_by: '', category: 'Wi-Fi / Network'
    });
    const [trackName, setTrackName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const categories = [
        'Wi-Fi / Network', 'Computer / Hardware', 'Software / Apps',
        'Email / Account', 'Printer', 'Other'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.submitted_by) return;
        await onSubmit(form);
        setForm({ title: '', description: '', priority: 'medium', submitted_by: '', category: 'Wi-Fi / Network' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const myTickets = trackName
        ? tickets.filter(t => t.submitted_by.toLowerCase().includes(trackName.toLowerCase()))
        : [];

    const statusInfo = {
        open: { label: 'Open', color: '#6366f1', bg: '#eef2ff', icon: '🔵' },
        in_progress: { label: 'In Progress', color: '#f59e0b', bg: '#fffbeb', icon: '🟡' },
        resolved: { label: 'Resolved', color: '#10b981', bg: '#ecfdf5', icon: '✅' },
    };

    return (
        <div className="portal-container">
            <div className="portal-header">
                <h1>Student Support Portal</h1>
                <p>Report a technical issue and track your ticket status</p>
            </div>

            <div className="portal-grid">
                {/* Submit Form */}
                <div className="card">
                    <h2>📝 Report an Issue</h2>
                    {submitted && (
                        <div className="success-banner">
                            ✅ Ticket submitted! Track it below using your name.
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label>Your Full Name</label>
                        <input
                            placeholder="e.g. Kasun Perera"
                            value={form.submitted_by}
                            onChange={e => setForm({ ...form, submitted_by: e.target.value })}
                            required
                        />
                        <label>Issue Title</label>
                        <input
                            placeholder="e.g. Cannot connect to university Wi-Fi"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            required
                        />
                        <label>Category</label>
                        <select value={form.category}
                            onChange={e => setForm({ ...form, category: e.target.value })}>
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <label>Description</label>
                        <textarea
                            placeholder="Describe your issue in detail — when did it start, what error do you see?"
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                        />
                        <label>Priority</label>
                        <div className="priority-row">
                            {['low', 'medium', 'high'].map(p => (
                                <button
                                    type="button" key={p}
                                    className={`priority-chip ${form.priority === p ? 'selected-' + p : ''}`}
                                    onClick={() => setForm({ ...form, priority: p })}
                                >
                                    {p === 'low' ? '🟢' : p === 'medium' ? '🟡' : '🔴'} {p.charAt(0).toUpperCase() + p.slice(1)}
                                </button>
                            ))}
                        </div>
                        <button type="submit" className="submit-btn">Submit Ticket →</button>
                    </form>
                </div>

                {/* Track Tickets */}
                <div className="card">
                    <h2>🔍 Track Your Tickets</h2>
                    <label>Enter your name to find your tickets</label>
                    <input
                        placeholder="e.g. Kasun Perera"
                        value={trackName}
                        onChange={e => setTrackName(e.target.value)}
                    />
                    {trackName && myTickets.length === 0 && (
                        <p className="no-tickets">No tickets found for "{trackName}"</p>
                    )}
                    {myTickets.map(ticket => {
                        const s = statusInfo[ticket.status] || statusInfo.open;
                        return (
                            <div key={ticket.id} className="track-card" style={{ borderLeft: `4px solid ${s.color}` }}>
                                <div className="track-header">
                                    <span className="track-title">{ticket.title}</span>
                                    <span className="status-badge" style={{ background: s.bg, color: s.color }}>
                                        {s.icon} {s.label}
                                    </span>
                                </div>
                                <div className="track-meta">
                                    <span>📂 {ticket.category || 'General'}</span>
                                    <span>🕐 {new Date(ticket.created_at).toLocaleDateString()}</span>
                                </div>
                                {ticket.description && (
                                    <p className="track-desc">{ticket.description}</p>
                                )}
                            </div>
                        );
                    })}

                    {/* Stats */}
                    <div className="stats-box">
                        <h3>📊 System Overview</h3>
                        <div className="stats-grid">
                            <div className="stat">
                                <span className="stat-num">{tickets.length}</span>
                                <span className="stat-label">Total</span>
                            </div>
                            <div className="stat">
                                <span className="stat-num" style={{ color: '#6366f1' }}>
                                    {tickets.filter(t => t.status === 'open').length}
                                </span>
                                <span className="stat-label">Open</span>
                            </div>
                            <div className="stat">
                                <span className="stat-num" style={{ color: '#f59e0b' }}>
                                    {tickets.filter(t => t.status === 'in_progress').length}
                                </span>
                                <span className="stat-label">In Progress</span>
                            </div>
                            <div className="stat">
                                <span className="stat-num" style={{ color: '#10b981' }}>
                                    {tickets.filter(t => t.status === 'resolved').length}
                                </span>
                                <span className="stat-label">Resolved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentPortal;