import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PatientsPage from './pages/PatientsPage';
import PatientDetail from './pages/PatientDetail';
import AlertsPage from './pages/AlertsPage';
import NewPatientForm from './pages/NewPatientForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PatientsPage />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/new" element={<NewPatientForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;