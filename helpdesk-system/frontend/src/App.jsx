import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentPortal from './components/StudentPortal';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

const API = 'http://localhost:5000/api/tickets';

function App() {
  const [tickets, setTickets] = useState([]);
  const [view, setView] = useState('student'); // 'student' or 'admin'

  const fetchTickets = async () => {
    const res = await axios.get(API);
    setTickets(res.data);
  };

  useEffect(() => { fetchTickets(); }, []);

  const addTicket = async (ticket) => {
    await axios.post(API, ticket);
    fetchTickets();
  };

  const updateTicket = async (id, data) => {
    await axios.patch(`${API}/${id}`, data);
    fetchTickets();
  };

  const deleteTicket = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTickets();
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-icon">🎓</span>
          <span>UniHelp Desk</span>
        </div>
        <div className="nav-tabs">
          <button
            className={view === 'student' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setView('student')}
          >
            👨‍🎓 Student Portal
          </button>
          <button
            className={view === 'admin' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setView('admin')}
          >
            🛠️ Admin Dashboard
          </button>
        </div>
      </nav>

      {view === 'student' ? (
        <StudentPortal
          tickets={tickets}
          onSubmit={addTicket}
        />
      ) : (
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