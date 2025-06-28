import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';
import '../../App.css'; // global styles (or create LoginModern.css if you want)

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/Login', user);
      alert('Successfully logged in');
      localStorage.setItem('user', JSON.stringify(res.data));
      const { userType } = res.data;

      switch (userType) {
        case 'Admin':
          navigate('/AdminHome');
          break;
        case 'Ordinary':
          navigate('/HomePage');
          break;
        case 'Agent':
          navigate('/AgentHome');
          break;
        default:
          navigate('/Login');
          break;
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("User doesn't exist");
      }
      navigate('/Login');
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: '#333333' }}>
        <Container className="justify-content-between">
          <Navbar.Brand className="text-white fw-bold fs-3">ComplaintCare</Navbar.Brand>
          <ul className="navbar-nav d-flex flex-row gap-4 mb-0">
            <li className="nav-item"><Link to="/" className="nav-link text-white">Home</Link></li>
            <li className="nav-item"><Link to="/signup" className="nav-link text-white">SignUp</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link text-white">Login</Link></li>
          </ul>
        </Container>
      </Navbar>

      {/* Login Section */}
      <section className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#e67e22', minHeight: '90vh' }}>
        <div className="bg-white rounded shadow-lg px-4 py-5" style={{ width: '100%', maxWidth: '450px' }}>
          <h2 className="fw-bold mb-3 text-center text-dark">Welcome Back!</h2>
          <p className="text-muted mb-4 text-center">Log in to continue managing complaints.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-dark">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4 position-relative">
              <label className="form-label text-dark">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="Enter your password"
                required
              />
              <small
                onClick={togglePassword}
                className="position-absolute end-0 top-50 translate-middle-y me-3 text-primary"
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </small>
            </div>
            <button type="submit" className="btn btn-dark w-100 py-2 rounded-pill fw-bold shadow-sm">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold text-primary">Sign Up</Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Login;




