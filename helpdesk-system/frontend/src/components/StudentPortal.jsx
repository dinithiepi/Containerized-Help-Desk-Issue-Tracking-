import { useState } from 'react';

function StudentPortal({ tickets, onSubmit }) {
    const [form, setForm] = useState({
        title: '', description: '', priority: 'medium',
        submitted_by: '', student_id: '', category: 'Wi-Fi / Network'
    });
    const [trackId, setTrackId] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('submit');

    const categories = [
        'Wi-Fi / Network', 'Computer / Hardware', 'Software / Apps',
        'Email / Account Access', 'Printer', 'Projector / AV',
        'University Portal', 'Other'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(form);
        setForm({
            title: '', description: '', priority: 'medium',
            submitted_by: '', student_id: '', category: 'Wi-Fi / Network'
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    const myTickets = trackId
        ? tickets.filter(t =>
            t.student_id?.toLowerCase().includes(trackId.toLowerCase()) ||
            t.submitted_by?.toLowerCase().includes(trackId.toLowerCase()))
        : [];

    const statusInfo = {
        open: { label: 'Open', color: '#7c3aed', bg: '#ede9fe', icon: '🔵' },
        in_progress: { label: 'In Progress', color: '#b45309', bg: '#fef3c7', icon: '🟡' },
        resolved: { label: 'Resolved', color: '#065f46', bg: '#d1fae5', icon: '✅' },
    };

    return (
        <div className="student-page">
            {/* HERO */}
            <div className="hero">
                <div className="hero-overlay" />
                <div className="hero-content">
                    <h1>IT Support & Help Desk</h1>
                    <p>University of Peradeniya — Excellence Through Learning</p>
                </div>
            </div>

            {/* TABS */}
            <div className="student-tabs">
                <button className={activeTab === 'submit' ? 'stab active' : 'stab'}
                    onClick={() => setActiveTab('submit')}>
                    Submit a Ticket
                </button>
                <button className={activeTab === 'track' ? 'stab active' : 'stab'}
                    onClick={() => setActiveTab('track')}>
                    Track My Tickets
                </button>
            </div>

            <div className="student-content">
                {/* SUBMIT TAB */}
                {activeTab === 'submit' && (
                    <div className="form-card">
                        <h2>Report a Technical Issue</h2>
                        <p className="form-desc">
                            Fill in the form below and our IT team will respond as soon as possible.
                        </p>
                        {submitted && (
                            <div className="success-banner">
                                ✅ Your ticket has been submitted successfully! Use your Student ID or Name to track it.
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input placeholder="e.g. Kasun Perera"
                                        value={form.submitted_by}
                                        onChange={e => setForm({ ...form, submitted_by: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Student ID *</label>
                                    <input placeholder="e.g. E/19/150"
                                        value={form.student_id}
                                        onChange={e => setForm({ ...form, student_id: e.target.value })} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Issue Title *</label>
                                <input placeholder="e.g. Cannot connect to university Wi-Fi in Engineering Faculty"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select value={form.category}
                                        onChange={e => setForm({ ...form, category: e.target.value })}>
                                        {categories.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Priority</label>
                                    <select value={form.priority}
                                        onChange={e => setForm({ ...form, priority: e.target.value })}>
                                        <option value="low">🟢 Low — Minor issue</option>
                                        <option value="medium">🟡 Medium — Affecting work</option>
                                        <option value="high">🔴 High — Urgent</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Describe the issue in detail — location, error messages, when it started..."
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })} />
                            </div>
                            <button type="submit" className="submit-btn">
                                Submit Ticket →
                            </button>
                        </form>
                    </div>
                )}

                {/* TRACK TAB */}
                {activeTab === 'track' && (
                    <div className="form-card">
                        <h2>Track Your Tickets</h2>
                        <p className="form-desc">Enter your Student ID or name to view your ticket status.</p>
                        <div className="form-group">
                            <label>Student ID or Name</label>
                            <input placeholder="e.g. E/19/150 or Kasun Perera"
                                value={trackId} onChange={e => setTrackId(e.target.value)} />
                        </div>

                        {trackId && myTickets.length === 0 && (
                            <div className="no-results">
                                No tickets found for "<strong>{trackId}</strong>"
                            </div>
                        )}

                        {myTickets.map(ticket => {
                            const s = statusInfo[ticket.status] || statusInfo.open;
                            return (
                                <div key={ticket.id} className="track-card"
                                    style={{ borderLeft: `4px solid ${s.color}` }}>
                                    <div className="track-top">
                                        <div>
                                            <span className="track-id">#{ticket.id}</span>
                                            <span className="track-title">{ticket.title}</span>
                                        </div>
                                        <span className="status-pill"
                                            style={{ background: s.bg, color: s.color }}>
                                            {s.icon} {s.label}
                                        </span>
                                    </div>
                                    <div className="track-meta">
                                        <span> {ticket.category}</span>
                                        <span> {new Date(ticket.created_at).toLocaleDateString('en-GB')}</span>
                                        <span style={{
                                            color: ticket.priority === 'high' ? '#dc2626' :
                                                ticket.priority === 'medium' ? '#d97706' : '#16a34a', fontWeight: 600
                                        }}>
                                            ● {ticket.priority?.toUpperCase()}
                                        </span>
                                    </div>
                                    {ticket.description && (
                                        <p className="track-desc">{ticket.description}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentPortal;