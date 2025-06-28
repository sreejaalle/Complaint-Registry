import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import Image1 from '../../Images/Image11.png'; // Transparent background image

const Home = () => {
  return (
    <>
      {/* Modern Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: '#333333' }} className="px-4">
        <Container fluid className="justify-content-between align-items-center">
          <Navbar.Brand className="fw-bold text-white fs-3">ComplaintCare</Navbar.Brand>
          <ul className="navbar-nav d-flex flex-row gap-4 mb-0">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-hover text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link nav-hover text-white">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link nav-hover text-white">Login</Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div
        className="modern-hero d-flex flex-column flex-md-row align-items-center justify-content-between px-5 py-5"
        style={{ backgroundColor: '#e67e22', minHeight: '90vh' }}
      >
        <div className="hero-text text-white col-md-6">
          <h1 className="display-4 fw-bold mb-3">Your Voice Matters.</h1>
          <h4 className="mb-3">File complaints easily & get support instantly.</h4>
          <p className="lead mb-4" style={{ maxWidth: '450px' }}>
            Say goodbye to delays and confusion. Track, communicate, and resolve complaints — all in one place. Fast, friendly, and effective.
          </p>
          <Link to="/login">
            <Button className="bg-warning border-0 px-4 py-2 fw-bold rounded-pill text-dark shadow">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="hero-image col-md-5 mt-4 mt-md-0 text-center">
          <img src={Image1} alt="Illustration" className="img-fluid" style={{ maxHeight: '400px' }} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} ComplaintCare. All rights reserved.</p>
          <div className="footer-links d-flex gap-4">
            <Link to="/about" className="footer-link text-white text-decoration-none">About</Link>
            <Link to="/contact" className="footer-link text-white text-decoration-none">Contact</Link>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Home;

