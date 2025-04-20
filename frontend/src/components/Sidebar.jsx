import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserMd, FaBell, FaDatabase, FaCogs, FaPlus } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'My Patients', icon: <FaUserMd />, path: '/' },
    { name: 'Add Patient', icon: <FaPlus />, path: '/new' },
    { name: 'Alerts', icon: <FaBell />, path: '/alerts' },
    { name: 'Database', icon: <FaDatabase />, path: '/' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Stroke Unit</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? 'active-link' : ''
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
