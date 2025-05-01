import React, { useEffect, useState } from 'react';
import { Link, useNavigate }            from 'react-router-dom';
import api                              from '../api';
import './Patients.css';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/patients/')
      .then(res => setPatients(res.data))
      .catch(err => {
        console.error('Failed to load patients:', err);
        if (err.response?.status === 401) navigate('/login');
      });
  }, [navigate]);

  return (
    <div className="patients-dashboard">
      <div className="patients-container">
        {/* Sidebar */}
        <nav>
          <div className="patients-side-navbar">
            <span className="patients-menu-title">Main Menu</span>
            <Link to="/doctor">Dashboard</Link>
            <Link to="/patients" className="patients-active">Patients</Link>
            <Link to="/treatment">Treatment</Link>
            <div className="patients-grow" />
            <button onClick={() => navigate('/login')} className="patients-sidebar-btn">
              Logout
            </button>
          </div>
        </nav>

        {/* Main content */}
        <div className="patients-main-body">
          <h1>All Patients</h1>

          <table className="patients-table">
            <thead>
              <tr>
                <th>Date Added</th>
                <th>Name</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="no-patients">
                    No patients
                  </td>
                </tr>
              ) : (
                patients.map((p, idx) => (
                  <tr key={p.id || idx}>
                    <td>{new Date(p.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/patients/${p.id}`} className="patient-name">
                        {p.Name}
                      </Link>
                    </td>
                    <td>
                      {p.remote_neurologist_consultation?.diagnosis || 'N/A'}
                    </td>
                    <td>
                      {p.remote_neurologist_consultation?.treatment || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
