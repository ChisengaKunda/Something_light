import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorHome.css";

const DoctorHome = () => {
  const [patients, setPatients]     = useState([]);
  const [followUps, setFollowUps]   = useState([]);
  const username                     = localStorage.getItem("username") ?? "User";
  const navigate                     = useNavigate();

  // Fetch data on mount
  useEffect(() => {
    const token   = localStorage.getItem("token");
    const headers = { Authorization: `Basic ${token}` };

    Promise.all([
      axios.get("http://localhost:8000/patients",   { headers }),
      axios.get("http://localhost:8000/follow-up", { headers }),
    ])
      .then(([patientsRes, followUpsRes]) => {
        setPatients(patientsRes.data);
        setFollowUps(followUpsRes.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="doctor-dashboard">
      <div className="doctor-container">

        {/* Sidebar */}
        <nav>
          <div className="doctor-side-navbar">
            <span className="doctor-menu-title">Main Menu</span>

            <Link to="/doctor"    className="doctor-active">Dashboard</Link>
            <Link to="/patients">Patients</Link>
            <Link to="/treatment">Treatment</Link>

            {/* pushes user/logout to bottom */}
            <div className="doctor-grow" />

            {/* static user display (hoverable only) */}
            <span className="doctor-sidebar-btn doctor-user-btn">
              {username}
            </span>

            {/* logout */}
            <button
              onClick={handleLogout}
              className="doctor-sidebar-btn doctor-logout-btn"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="doctor-main-body">
          {/* Promo Banner */}
          <div className="doctor-promo-card">
            <h1>Welcome to The Stroker</h1>
            <span>
              Manage and monitor stroke patients efficiently. Your all-in-one
              stroke unit dashboard.
            </span>
          </div>

          {/* Recent Untreated Patients */}
          <div className="doctor-recent-patients">
            <h4>Recent Patients (Not Treated)</h4>
            <ul>
              {patients
                .filter((p) => !p.treatment)
                .slice(0, 4)
                .map((p, idx) => (
                  <li key={p.id || idx}>
                    <span className="date">
                      {new Date(p.date_added).toLocaleDateString()}
                    </span>
                    <span className="name">
                      <Link to={`/patients/${p.id}`}>{p.Name}</Link>
                    </span>
                    <span className="status">Not treated</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Patients & Follow-Up Panels */}
          <div className="doctor-history-lists">

            {/* Patients Table */}
            <div className="doctor-list1">
              <div className="doctor-row">
                <h4>Patients</h4>
                <Link to="/patients">See all</Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date Added</th>
                    <th>Name</th>
                    <th>Treatment</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, idx) => (
                    <tr key={p.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{new Date(p.date_added).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/patients/${p.id}`}>{p.Name}</Link>
                      </td>
                      <td>{p.treatment || "Not treated"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add Patient Button */}
              <div className="doctor-add-patient-btn">
                <Link to="/add-patient" className="doctor-add-patient-link">
                  Add Patient
                </Link>
              </div>
            </div>

            {/* Follow-Up Table */}
            <div className="doctor-list2">
              <div className="doctor-row">
                <h4>Follow-Up</h4>
                <Link to="/treatment">See all</Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient Name</th>
                    <th>Follow-Up</th>
                  </tr>
                </thead>
                <tbody>
                  {followUps.map((f, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{f.patient_name}</td>
                      <td>{f.follow_up}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;