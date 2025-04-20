import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PatientDetail.css';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [consultation, setConsultation] = useState('');
  const [followUp, setFollowUp] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/patients/${id}`)
      .then(res => setPatient(res.data))
      .catch(err => console.error('Patient fetch error:', err));

    axios.get(`http://localhost:8000/patients/${id}/alerts`)
      .then(res => setAlerts(res.data));

    axios.get(`http://localhost:8000/patients/${id}/consultation`)
      .then(res => setConsultation(res.data));

    axios.get(`http://localhost:8000/patients/${id}/follow-up`)
      .then(res => setFollowUp(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await axios.delete(`http://localhost:8000/patients/${id}`);
      navigate('/');
    }
  };

  const downloadSummary = async () => {
    const res = await axios.get(`http://localhost:8000/patients/${id}/summary`, {
      responseType: 'blob',
    });
    const blob = new Blob([res.data], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patient.name.replace(/\s/g, '_')}_summary.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!patient) return <p>Loading patient data...</p>;

  return (
    <div className="patient-detail">
      <h2>{patient.name}</h2>
      <div className="info-section">
        <p><strong>Sex:</strong> {patient.sex}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>NIHSS Score:</strong> {patient.nihss_score}</p>
        <p><strong>Created At:</strong> {patient.created_at}</p>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate(`/edit/${id}`)} className="edit-btn">Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
        <button onClick={downloadSummary} className="export-btn">Download Summary</button>
      </div>

      <div className="alert-section">
        <h3>Alerts</h3>
        <ul>
          {alerts.map((alert, idx) => <li key={idx}>{alert}</li>)}
        </ul>
      </div>

      <div className="consult-section">
        <h3>Consultation</h3>
        <pre>{consultation}</pre>
      </div>

      <div className="followup-section">
        <h3>Follow-Up</h3>
        <pre>{followUp}</pre>
      </div>
    </div>
  );
};

export default PatientDetail;