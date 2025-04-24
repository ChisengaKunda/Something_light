import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorHome from "./pages/DoctorHome";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorHome />} />
      </Routes>
    </Router>
  );
}

export default App;
