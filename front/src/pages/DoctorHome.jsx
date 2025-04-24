import React, { useEffect, useState } from "react";
import "./DoctorHome.css";
import { Link } from "react-router-dom";
import axios from "axios";

const DoctorHome = () => {
  const [patients, setPatients] = useState([]);
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    const fetchFollowUps = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/follow-ups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFollowUps(res.data);
      } catch (err) {
        console.error("Error fetching follow-ups:", err);
      }
    };

    fetchPatients();
    fetchFollowUps();
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">
          <h3>The Stroker</h3>
        </div>
        <div className="header-icons">
          <i className="fas fa-bell"></i>
        </div>
      </header>

      <div className="container">
        <nav>
          <div className="side_navbar">
            <span>Main Menu</span>
            <a href="#" className="active">Dashboard</a>
            <a href="#">Patients</a>
            <a href="#">Consultation and Treatment</a>
          </div>
        </nav>

        <div className="main-body">
          <h2>Doctor Home</h2>
          <div className="promo_card">
            <h1>Welcome to The Stroker</h1>
            <span>Manage and monitor stroke patients efficiently. Your all-in-one stroke unit dashboard.</span>
          </div>

          <div className="history_lists">
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
                  {patients.map((patient, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{patient.date_added || "-"}</td>
                      <td>{patient.Name}</td>
                      <td>{patient.treatment || "N/A"}</td>
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
                  {followUps.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.patient_name}</td>
                      <td>{item.follow_up}</td>
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