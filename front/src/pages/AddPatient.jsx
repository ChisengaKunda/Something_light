import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api                   from '../api';
import './AddPatient.css';

export default function AddPatient() {
  const [form, setForm] = useState({
    Name: '',
    age: '',
    sex: '',
    chief_complaint: '',
    medical_history: '',
    nihss_score: '',
    blood_pressure: '',
    heart_rate: '',
    respiratory_rate: '',
    oxygen_saturation: '',
    cbc: '',
    bmp: '',
    coagulation: '',
    ct_scan: '',
  });

  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'doctor';

  const handleChange = e => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'number' 
        ? (value === '' ? '' : Number(value)) 
        : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const id         = crypto.randomUUID();
    const created_at = new Date().toISOString();
    const accessCode = Math.random().toString(36).slice(2,6).toUpperCase();

    const payload = {
      id,
      username: form.Name,
      Name: form.Name,
      created_at,
      age: Number(form.age),
      sex: form.sex,
      chief_complaint: form.chief_complaint,
      medical_history: form.medical_history,
      nihss_score: Number(form.nihss_score),
      vital_signs: {
        blood_pressure: form.blood_pressure,
        heart_rate: Number(form.heart_rate),
        respiratory_rate: Number(form.respiratory_rate),
        oxygen_saturation: Number(form.oxygen_saturation),
      },
      lab_results: {
        cbc: form.cbc,
        bmp: form.bmp,
        coagulation_studies: form.coagulation,
      },
      imaging_studies: {
        ct_scan: form.ct_scan,
      },
      remote_neurologist_consultation: {
        diagnosis: '',
        treatment: '',
      },
      outcome: null,
      disposition: null,
      role: 'patient',
    };

    try {
      await api.post('/patients/', payload);
      await api.post('/users/register', null, {
        params: { username: form.Name, password: accessCode, role: 'patient' }
      });
      alert(`Patient created! Share this code with them: ${accessCode}`);
      navigate('/doctor', { replace: true });
    } catch (err) {
      console.error('Add patient error:', err.response?.data || err);
      if (Array.isArray(err.response?.data?.detail)) {
        const msgs = err.response.data.detail.map(
          d => `• ${d.loc.join('.')} – ${d.msg}`
        );
        alert('Validation errors:\n' + msgs.join('\n'));
      } else {
        alert('Error: ' + (err.message || JSON.stringify(err.response?.data)));
      }
    }
  };

  return (
    <div className="add-patient-dashboard">
      <div className="add-patient-container full-width">
        {/* Sidebar */}
        <nav>
          <div className="add-patient-side-navbar">
            <span className="add-patient-menu-title">Main Menu</span>
            <Link to="/doctor"    className="add-patient-active">Dashboard</Link>
            <Link to="/patients">  Patients</Link>
            <Link to="/treatment"> Treatment</Link>
            <div className="add-patient-grow" />

            {/* Back to your dashboard */}
            <Link
              to={`/${role}`}
              className="add-patient-sidebar-btn add-patient-user-btn"
            >
              Back to Profile
            </Link>

            {/* Logout */}
            <button
              onClick={() => navigate('/login')}
              className="add-patient-sidebar-btn add-patient-logout-btn"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main form */}
        <div className="add-patient-main-body">
          <h1>Add New Patient</h1>
          <form className="add-patient-form" onSubmit={handleSubmit}>

            {/* Patient Info */}
            <fieldset className="form-section">
              <legend>Patient Info</legend>
              <label>Name</label>
              <input
                type="text"
                name="Name"
                value={form.Name}
                onChange={handleChange}
                required
              />
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
              />
              <label>Sex</label>
              <select
                name="sex"
                value={form.sex}
                onChange={handleChange}
                required
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label>Chief Complaint</label>
              <input
                type="text"
                name="chief_complaint"
                value={form.chief_complaint}
                onChange={handleChange}
                required
              />
              <label>Medical History</label>
              <textarea
                name="medical_history"
                value={form.medical_history}
                onChange={handleChange}
              />
              <label>NIHSS Score</label>
              <input
                type="number"
                name="nihss_score"
                value={form.nihss_score}
                onChange={handleChange}
                required
              />
            </fieldset>

            {/* Vital Signs */}
            <fieldset className="form-section">
              <legend>Vital Signs</legend>
              <label>Blood Pressure</label>
              <input
                type="text"
                name="blood_pressure"
                value={form.blood_pressure}
                onChange={handleChange}
                required
              />
              <label>Heart Rate</label>
              <input
                type="number"
                name="heart_rate"
                value={form.heart_rate}
                onChange={handleChange}
                required
              />
              <label>Respiratory Rate</label>
              <input
                type="number"
                name="respiratory_rate"
                value={form.respiratory_rate}
                onChange={handleChange}
                required
              />
              <label>Oxygen Saturation</label>
              <input
                type="number"
                name="oxygen_saturation"
                value={form.oxygen_saturation}
                onChange={handleChange}
                required
              />
            </fieldset>

            {/* Lab Results */}
            <fieldset className="form-section">
              <legend>Lab Results</legend>
              <label>CBC</label>
              <input
                type="text"
                name="cbc"
                value={form.cbc}
                onChange={handleChange}
              />
              <label>BMP</label>
              <input
                type="text"
                name="bmp"
                value={form.bmp}
                onChange={handleChange}
              />
              <label>Coagulation Studies</label>
              <input
                type="text"
                name="coagulation"
                value={form.coagulation}
                onChange={handleChange}
              />
            </fieldset>

            {/* Imaging */}
            <fieldset className="form-section">
              <legend>Imaging</legend>
              <label>CT Scan</label>
              <input
                type="text"
                name="ct_scan"
                value={form.ct_scan}
                onChange={handleChange}
              />
            </fieldset>

            <button type="submit">Save Patient</button>
          </form>
        </div>
      </div>
    </div>
  );
}
