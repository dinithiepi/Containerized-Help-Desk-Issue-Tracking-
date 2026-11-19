import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentPortal from './components/StudentPortal';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [view, setView] = useState('student');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const fetchTickets = async () => {
    const res = await axios.get('/api/tickets');
    setTickets(res.data);
  };

  useEffect(() => { fetchTickets(); }, []);

  const addTicket = async (ticket) => {
    await axios.post('/api/tickets', ticket);
    fetchTickets();
  };

  const updateTicket = async (id, data) => {
    await axios.patch(`/api/tickets/${id}`, data);
    fetchTickets();
  };

  const deleteTicket = async (id) => {
    await axios.delete(`/api/tickets/${id}`);
    fetchTickets();
  };

  const handleAdminLogin = (username, password) => {
    if (username === 'admin' && password === 'peradeniya2024') {
      setAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setView('student');
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="/uop-logo.png" alt="UoP Logo" className="nav-logo"
            onError={e => e.target.style.display = 'none'} />
          <div className="nav-brand-text">
            <span className="nav-title">University of Peradeniya</span>
            <span className="nav-subtitle">IT Help Desk & Support System</span>
          </div>
        </div>
        <div className="nav-right">
          <button
            className={view === 'student' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setView('student')}
          >
            Student Support
          </button>
          <button
            className={view === 'admin' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setView('admin')}
          >
            Admin
          </button>
          {adminLoggedIn && (
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* CONTENT */}
      {view === 'student' && (
        <StudentPortal tickets={tickets} onSubmit={addTicket} />
      )}
      {view === 'admin' && !adminLoggedIn && (
        <AdminLogin onLogin={handleAdminLogin} error={loginError} />
      )}
      {view === 'admin' && adminLoggedIn && (
        <AdminDashboard
          tickets={tickets}
          onUpdate={updateTicket}
          onDelete={deleteTicket}
        />
      )}
    </div>
  );
}

export default App;