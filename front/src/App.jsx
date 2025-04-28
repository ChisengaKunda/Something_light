import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login       from './pages/Login';
import DoctorHome  from './pages/DoctorHome';
import NurseHome   from './pages/NurseHome';
import PatientHome from './pages/PatientHome';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Doctor-only */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute requireRole="doctor">
              <DoctorHome />
            </ProtectedRoute>
          }
        />

        {/* Nurse-only */}
        <Route
          path="/nurse"
          element={
            <ProtectedRoute requireRole="nurse">
              <NurseHome />
            </ProtectedRoute>
          }
        />

        {/* Patient-only */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute requireRole="patient">
              <PatientHome />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
