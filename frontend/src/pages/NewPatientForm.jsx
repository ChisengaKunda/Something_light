import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewPatientForm.css';

const NewPatientForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    age: '',
    sex: '',
    chief_complaint: '',
    medical_history: '',
    nihss_score: '',
    vital_signs: {
      blood_pressure: '',
      heart_rate: '',
      respiratory_rate: '',
      oxygen_saturation: '',
    },
    lab_results: {
      cbc: '',
      bmp: '',
      coagulation_studies: '',
    },
    imaging_studies: {
      ct_scan: '',
    },
    remote_neurologist_consultation: {
      diagnosis: '',
      treatment: '',
    },
    outcome: '',
    disposition: '',
  });

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setForm({ ...form, [section]: { ...form[section], [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/patients', form);
      navigate('/');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="new-patient-form">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
          <select name="sex" onChange={handleChange} required>
            <option value="">Select Sex</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <input type="text" name="chief_complaint" placeholder="Chief Complaint" onChange={handleChange} />
          <input type="text" name="medical_history" placeholder="Medical History" onChange={handleChange} />
          <input type="number" name="nihss_score" placeholder="NIHSS Score" onChange={handleChange} />
        </div>

        <h4>Vital Signs</h4>
        <div className="form-grid">
          {['blood_pressure', 'heart_rate', 'respiratory_rate', 'oxygen_saturation'].map((field) => (
            <input key={field} type="text" name={field} placeholder={field.replace('_', ' ')} onChange={(e) => handleChange(e, 'vital_signs')} />
          ))}
        </div>

        <h4>Lab Results</h4>
        <div className="form-grid">
          {['cbc', 'bmp', 'coagulation_studies'].map((field) => (
            <input key={field} type="text" name={field} placeholder={field.replace('_', ' ')} onChange={(e) => handleChange(e, 'lab_results')} />
          ))}
        </div>

        <h4>Imaging</h4>
        <input type="text" name="ct_scan" placeholder="CT Scan" onChange={(e) => handleChange(e, 'imaging_studies')} />

        <h4>Neurologist Consultation</h4>
        <div className="form-grid">
          {['diagnosis', 'treatment'].map((field) => (
            <input key={field} type="text" name={field} placeholder={field} onChange={(e) => handleChange(e, 'remote_neurologist_consultation')} />
          ))}
        </div>

        <h4>Outcome & Disposition</h4>
        <div className="form-grid">
          <input type="text" name="outcome" placeholder="Outcome" onChange={handleChange} />
          <input type="text" name="disposition" placeholder="Disposition" onChange={handleChange} />
        </div>

        <button type="submit">Submit Patient</button>
      </form>
    </div>
  );
};

export default NewPatientForm;