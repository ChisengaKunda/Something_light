import React, { useEffect, useState } from "react";
import { Link, useNavigate }          from "react-router-dom";
import axios                          from "axios";
import "./DoctorHome.css";

const DoctorHome = () => {
  const [patients,  setPatients]  = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const username = localStorage.getItem("username") ?? "User";
  const navigate  = useNavigate();

  /* ----------------------------- data fetch ----------------------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:8000/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    const fetchFollowUps = async () => {
      try {
        const res = await axios.get("http://localhost:8000/follow-ups", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollowUps(res.data);
      } catch (err) {
        console.error("Error fetching follow-ups:", err);
      }
    };

    fetchPatients();
    fetchFollowUps();
  }, []);

  /* -----------------------------  logout  ------------------------------ */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  /* ===================================================================== */
  return (
    <div className="dashboard">
      <div className="container">
        {/* ===============  SIDEBAR  =============== */}
        <nav>
          <div className="side_navbar">
            <span className="menu_title">Main Menu</span>

            <Link to="#"               className="active">Dashboard</Link>
            <Link to="/patients">Patients</Link>
            <Link to="/consult">Consultation and Treatment</Link>

            {/* pushes the buttons to the bottom */}
            <div className="grow" />

            {/* user & logout buttons */}
            <Link   to="/user-profile" className="sidebar-btn user-btn">
              {username}
            </Link>
            <button onClick={handleLogout} className="sidebar-btn logout-btn">
              Logout
            </button>
          </div>
        </nav>

        {/* ===============  MAIN CONTENT  =============== */}
        <div className="main-body">
          {/* Promo banner */}
          <div className="promo_card">
            <h1>Welcome to The Stroker</h1>
            <span>
              Manage and monitor stroke patients efficiently. Your all-in-one
              stroke unit dashboard.
            </span>
          </div>

          {/* Patients & Follow-Up panels */}
          <div className="history_lists">
            {/* -------------------- PATIENTS -------------------- */}
            <div className="list1">
              <div className="row">
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
                    <tr key={p.id ?? idx}>
                      <td>{idx + 1}</td>
                      <td>{p.date_added || "-"}</td>
                      <td>{p.Name}</td>
                      <td>{p.treatment || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="add-patient-btn">
                <Link to="/add-patient">
                  <button>Add Patient</button>
                </Link>
              </div>
            </div>

            {/* -------------------- FOLLOW-UPS -------------------- */}
            <div className="list2">
              <div className="row">
                <h4>Follow-Up</h4>
                <Link to="/follow-up">See all</Link>
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
        {/* ------------ end main-body ------------- */}
      </div>
      {/* ------------ end container ------------- */}
    </div>
  );
};

export default DoctorHome;
