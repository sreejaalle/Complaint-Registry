import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';
import Footer from '../common/FooterC';

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
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
        console.log(error);
      }
    };
    getData();
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#001f3f', // Navy blue background
      color: 'white'
    }}>
      
      {/* Navbar */}
      <Navbar bg="black" expand="lg" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
        <Container fluid>
          <Navbar.Brand style={{ fontWeight: 'bold', color: 'lightgrey' }}>
            Hi, Admin {userName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <NavLink
                className={`nav-link ${activeComponent === 'dashboard' ? 'fw-bold text-primary' : 'text-light'}`}
                onClick={() => handleNavLinkClick('dashboard')}
              >
                Dashboard
              </NavLink>
              <NavLink
                className={`nav-link ${activeComponent === 'UserInfo' ? 'fw-bold text-primary' : 'text-light'}`}
                onClick={() => handleNavLinkClick('UserInfo')}
              >
                Users
              </NavLink>
              <NavLink
                className={`nav-link ${activeComponent === 'Agent' ? 'fw-bold text-primary' : 'text-light'}`}
                onClick={() => handleNavLinkClick('Agent')}
              >
                Agents
              </NavLink>
            </Nav>
            <Button onClick={LogOut} variant="outline-danger">
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content */}
      <div style={{ flex: 1, padding: '30px', backgroundColor: 'orange', color: 'white' }}>
        {activeComponent === 'dashboard' && <AccordionAdmin />}
        {activeComponent === 'UserInfo' && <UserInfo />}
        {activeComponent === 'Agent' && <AgentInfo />}
      </div>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
};

export default AdminHome;
