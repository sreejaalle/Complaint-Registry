import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Complaint');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserName(user.name);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFA500' }}>
      {/* Header / Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000', color: 'white' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          <h3 className="navbar-brand mb-0" style={{ color: 'lightgray' }}>
            Hello,{userName}
          </h3>
          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-row">
              <li className="nav-item me-3">
                <NavLink
                  className={`nav-link nav-tab ${activeComponent === 'Complaint' ? 'text-white fw-bold' : 'text-light'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNavLinkClick('Complaint')}
                >
                  Complaint Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link nav-tab ${activeComponent === 'Status' ? 'text-white fw-bold' : 'text-light'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNavLinkClick('Status')}
                >
                  Status
                </NavLink>
              </li>
            </ul>
            <button className="btn btn-outline-light ms-3" onClick={Logout}>
               Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="container py-4 flex-grow-1">
        {activeComponent === 'Complaint' && <Complaint />}
        {activeComponent === 'Status' && <Status />}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: 'black', color: 'lightgray', padding: '10px', textAlign: 'center' }}>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;



