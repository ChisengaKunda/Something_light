import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import './Treatment.css';

export default function Treatment() {
  const [patients, setPatients] = useState([]);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState({ diagnosis: '', treatment: '' });
  const username = localStorage.getItem('username') || 'User';
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    api.get('/patients/')
      .then(res => 
        setPatients(res.data.filter(p => !p.remote_neurologist_consultation?.treatment))
      )
      .catch(err => {
        console.error('Error fetching patients:', err);
        if (err.response?.status === 401) navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleTreat = id => {
    setEditing(id);
    const p = patients.find(x => x.id === id);
    setForm({
      diagnosis: p.remote_neurologist_consultation?.diagnosis || '',
      treatment: p.remote_neurologist_consultation?.treatment || ''
    });
  };

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCancel = () => setEditing(null);

  const handleSubmit = id => {
    const p = patients.find(x => x.id === id);
    const updated = {
      ...p,
      remote_neurologist_consultation: {
        diagnosis: form.diagnosis,
        treatment: form.treatment
      }
    };
    api.put(`/patients/${id}`, updated)
      .then(() => setPatients(prev => prev.filter(x => x.id !== id)))
      .catch(err => { alert('Error saving treatment'); console.error(err); })
      .finally(() => setEditing(null));
  };

  return (
    <div className="patients-dashboard">
      <div className="patients-container">
        {/* Sidebar */}
        <nav>
          <div className="patients-side-navbar">
            <span className="patients-menu-title">Main Menu</span>
            <Link to="/doctor"    className={pathname==='/doctor'    ? 'patients-active' : ''}>Dashboard</Link>
            <Link to="/patients"  className={pathname==='/patients'  ? 'patients-active' : ''}>Patients</Link>
            <Link to="/treatment" className={pathname==='/treatment' ? 'patients-active' : ''}>Treatment</Link>
            <div className="patients-grow"/>
            <span className="patients-sidebar-btn">{username}</span>
            <button onClick={handleLogout} className="patients-sidebar-btn patients-logout-btn">
              Logout
            </button>
          </div>
        </nav>

        {/* Main content */}
        <div className="patients-main-body">
          <h1>Treat Patients</h1>
          <table className="treatment-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date Added</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign:'center', padding:'20px' }}>
                    No patients
                  </td>
                </tr>
              ) : (
                patients.map((p, i) => (
                  <React.Fragment key={p.id}>
                    <tr>
                      <td>{i+1}</td>
                      <td>{new Date(p.created_at).toLocaleDateString()}</td>
                      <td><Link to={`/patients/${p.id}`}>{p.Name}</Link></td>
                      <td>
                        <button onClick={()=>handleTreat(p.id)} className="treat-btn">
                          Treat
                        </button>
                      </td>
                    </tr>
                    {editing===p.id && (
                      <tr>
                        <td colSpan={4}>
                          <div className="treatment-form open">
                            <input
                              name="diagnosis"
                              placeholder="Diagnosis"
                              value={form.diagnosis}
                              onChange={handleChange}
                            />
                            <input
                              name="treatment"
                              placeholder="Treatment"
                              value={form.treatment}
                              onChange={handleChange}
                            />
                            <div className="form-actions">
                              <button onClick={() => handleSubmit(p.id)}>Submit</button>
                              <button onClick={handleCancel}>Cancel</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
