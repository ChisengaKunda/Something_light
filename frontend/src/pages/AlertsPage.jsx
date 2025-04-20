import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AlertsPage.css';

const AlertsPage = () => {
  const [patientsWithAlerts, setPatientsWithAlerts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/patients')
      .then(async (res) => {
        const patients = res.data;
        const withAlerts = [];

        for (const patient of patients) {
          const alertRes = await axios.get(`http://localhost:8000/patients/${patient.id}/alerts`);
          if (alertRes.data && alertRes.data[0] !== "No significant alerts detected.") {
            withAlerts.push({ ...patient, alerts: alertRes.data });
          }
        }

        setPatientsWithAlerts(withAlerts);
      })
      .catch((err) => console.error('Error fetching alerts:', err));
  }, []);

  return (
    <div className="alerts-page">
      <h2>Critical Patient Alerts</h2>
      {patientsWithAlerts.length === 0 ? (
        <p className="no-alerts">No patients with active alerts.</p>
      ) : (
        <div className="alerts-list">
          {patientsWithAlerts.map((patient) => (
            <Link
              to={`/patients/${patient.id}`}
              key={patient.id}
              className="alert-card"
            >
              <h3>{patient.name}</h3>
              <p><strong>Sex:</strong> {patient.sex}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <ul>
                {patient.alerts.map((alert, idx) => (
                  <li key={idx}>{alert}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPage;