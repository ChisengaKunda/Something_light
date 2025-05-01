import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import './PatientDetails.css';

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/patients/${id}`)
       .then(res => setPatient(res.data))
       .catch(err => {
         console.error('Error fetching patient:', err);
         if (err.response?.status === 401) navigate('/login');
       });
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!patient) {
    return (
      <div className="patient-details-main-body">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="patient-details-dashboard">
      <div className="patient-details-container">

        {/* Sidebar */}
        <nav>
          <div className="patient-details-side-navbar">
            <span className="patient-details-menu-title">Main Menu</span>
            <Link to="/doctor">Dashboard</Link>
            <Link to="/patients" className="patient-details-active">Patients</Link>
            <Link to="/treatment">Treatment</Link>
            <div className="patient-details-grow" />
            <button
              onClick={handleLogout}
              className="patient-details-sidebar-btn patient-details-logout-btn"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="patient-details-main-body">
          <h1>Patient Details</h1>

          <section className="details-section">
            <h2>Patient Info</h2>
            <p><strong>Name:</strong> {patient.Name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Sex:</strong> {patient.sex}</p>
            <p><strong>Chief Complaint:</strong> {patient.chief_complaint}</p>
            <p><strong>Medical History:</strong> {patient.medical_history}</p>
            <p><strong>NIHSS Score:</strong> {patient.nihss_score}</p>
          </section>

          <section className="details-section">
            <h2>Vital Signs</h2>
            <p><strong>Blood Pressure:</strong> {patient.vital_signs.blood_pressure}</p>
            <p><strong>Heart Rate:</strong> {patient.vital_signs.heart_rate}</p>
            <p><strong>Respiratory Rate:</strong> {patient.vital_signs.respiratory_rate}</p>
            <p><strong>Oxygen Saturation:</strong> {patient.vital_signs.oxygen_saturation}</p>
          </section>

          <section className="details-section">
            <h2>Lab Results</h2>
            <p><strong>CBC:</strong> {patient.lab_results.cbc}</p>
            <p><strong>BMP:</strong> {patient.lab_results.bmp}</p>
            <p><strong>Coagulation Studies:</strong> {patient.lab_results.coagulation_studies}</p>
          </section>

          <section className="details-section">
            <h2>Imaging</h2>
            <p><strong>CT Scan:</strong> {patient.imaging_studies.ct_scan}</p>
          </section>

          <section className="details-section">
            <h2>Consultation</h2>
            <p><strong>Diagnosis:</strong> {patient.remote_neurologist_consultation.diagnosis}</p>
            <p><strong>Treatment:</strong> {patient.remote_neurologist_consultation.treatment}</p>
          </section>

          {patient.outcome && (
            <section className="details-section">
              <h2>Outcome</h2>
              <p>{patient.outcome}</p>
            </section>
          )}
          {patient.disposition && (
            <section className="details-section">
              <h2>Disposition</h2>
              <p>{patient.disposition}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
