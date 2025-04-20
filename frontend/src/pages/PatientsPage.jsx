import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PatientsPage.css';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [alertsData, setAlertsData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/patients')
      .then(async (res) => {
        const all = res.data;
        setPatients(all);

        const alertPreviews = [];

        for (const patient of all) {
          const alertRes = await axios.get(`http://localhost:8000/patients/${patient.id}/alerts`);
          const filtered = alertRes.data.filter(a => !a.includes('No significant alerts'));
          if (filtered.length > 0) {
            alertPreviews.push({ id: patient.id, name: patient.name, alerts: filtered });
          }
        }

        setAlertsData(alertPreviews);
      })
      .catch((err) => console.error('Failed to fetch data:', err));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-column">
        <h3>🩺 Patient Records</h3>
        {patients.length === 0 ? (
          <p className="no-data">No patients available.</p>
        ) : (
          <div className="patient-list">
            {patients.map((patient) => (
              <div key={patient.id} className="patient-item">
                <Link to={`/patients/${patient.id}`} className="patient-name">{patient.name}</Link>
                <p><strong>Sex:</strong> {patient.sex}</p>
                <p><strong>Diagnosis:</strong> {patient.remote_neurologist_consultation?.diagnosis || 'N/A'}</p>
                <p><strong>Treatment:</strong> {patient.remote_neurologist_consultation?.treatment || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-column alert-preview">
        <h3>🚨 Alerts Preview</h3>
        {alertsData.length === 0 ? (
          <p className="no-data">No active alerts.</p>
        ) : (
          <div className="alert-box">
            {alertsData.map((entry) => (
              <Link to="/alerts" key={entry.id} className="alert-item">
                <p><strong>{entry.name}</strong></p>
                <ul>
                  {entry.alerts.slice(0, 2).map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                  {entry.alerts.length > 2 && <li>...more</li>}
                </ul>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
