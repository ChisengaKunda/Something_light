// src/pages/NurseHome.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import "./NurseHome.css";

export default function NurseHome() {
  const [patients, setPatients]     = useState([]);
  const [followUps, setFollowUps]   = useState([]);
  const username                     = localStorage.getItem("username") ?? "User";
  const navigate                     = useNavigate();
  const { pathname }                 = useLocation();

  useEffect(() => {
    const token   = localStorage.getItem("token");
    const headers = { Authorization: `Basic ${token}` };

    Promise.all([
      api.get("/patients",   { headers }),
      api.get("/follow-up", { headers }),
    ])
      .then(([pRes, fRes]) => {
        setPatients(pRes.data);
        setFollowUps(fRes.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="nurse-dashboard">
      <div className="nurse-container">

        {/* Sidebar */}
        <nav>
          <div className="nurse-side-navbar">
            <span className="nurse-menu-title">Main Menu</span>

            <Link
              to="/nurse"
              className={pathname === "/nurse" ? "nurse-active" : ""}
            >
              Dashboard
            </Link>

            <Link
              to="/patients"
              className={pathname === "/patients" ? "nurse-active" : ""}
            >
              Patients
            </Link>

            {/* pushes logout to bottom */}
            <div className="nurse-grow" />

            <button
              onClick={handleLogout}
              className="nurse-sidebar-btn nurse-logout-btn"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="nurse-main-body">

          {/* Promo Banner */}
          <div className="nurse-promo-card">
            <h1>Welcome, {username}</h1>
            <span>View and follow up on all patients here.</span>
          </div>

          <div className="nurse-history-lists">

            {/* Patients Table */}
            <div className="nurse-list1">
              <div className="nurse-row">
                <h4>Patients</h4>
                <Link to="/patients">See all</Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date Added</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p, idx) => (
                    <tr key={p.id || idx}>
                      <td>{idx + 1}</td>
                      <td>
                        {new Date(p.created_at || p.date_added)
                          .toLocaleDateString()}
                      </td>
                      <td>
                        <Link to={`/patients/${p.id}`}>{p.Name}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add Patient Button */}
              <div className="nurse-add-patient-btn">
                <Link to="/add-patient" className="nurse-add-patient-link">
                  Add Patient
                </Link>
              </div>
            </div>

            {/* Follow-Up Table */}
            <div className="nurse-list2">
              <div className="nurse-row">
                <h4>Follow-Up</h4>
                <Link to="/patients">See all</Link>
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
}