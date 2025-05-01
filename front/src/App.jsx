// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login        from "./pages/Login";
import DoctorHome   from "./pages/DoctorHome";
import NurseHome    from "./pages/NurseHome";
import PatientHome from "./pages/PatientHome";
import AddPatient from "./pages/AddPatient";
import Patients     from "./pages/Patients";
import Treatment    from "./pages/Treatment";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
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

      {/* …inside <Routes>… */}
      <Route
        path="/add-patient"
        element={
          <ProtectedRoute requireRole="doctor">
            <AddPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/treatment"
        element={
          <ProtectedRoute requireRole="doctor">
            <Treatment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <ProtectedRoute requireRole={["doctor", "nurse"]}>
            <Patients />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
