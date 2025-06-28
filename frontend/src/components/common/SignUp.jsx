import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SignUp = () => {
  const [title, setTitle] = useState('Select User');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    userType: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = 'Full name is required.';
    if (!/^\S+@\S+\.\S+$/.test(user.email)) newErrors.email = 'Invalid email format.';
    if (user.password.length < 8 || !/[0-9]/.test(user.password) || !/[!@#$%^&*]/.test(user.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include a number and special character.';
    }
    if (!user.phone || user.phone.length < 10) newErrors.phone = 'Valid phone number is required.';
    if (!user.address.trim()) newErrors.address = 'Address is required.';
    if (!user.city.trim()) newErrors.city = 'City is required.';
    if (!user.state.trim()) newErrors.state = 'State is required.';
    if (!user.pincode || isNaN(user.pincode)) newErrors.pincode = 'Valid pincode is required.';
    if (!user.userType) newErrors.userType = 'User type must be selected.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setUser({ ...user, phone: value });
  };

  const handleTitle = (selectedType) => {
    setTitle(selectedType);
    setUser({ ...user, userType: selectedType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch('http://localhost:8000/SignUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (res.ok) {
        alert('Successfully registered');
        setUser({
          name: '',
          email: '',
          password: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          userType: ''
        });
        setTitle('Select User');
        setErrors({});
      } else {
        const error = await res.json();
        alert('Failed: ' + (error.message || 'Something went wrong'));
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred during registration');
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="justify-content-between">
          <Navbar.Brand>ComplaintCare</Navbar.Brand>
          <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
            <li className="nav-item"><Link to="/" className="nav-link text-light">Home</Link></li>
            <li className="nav-item"><Link to="/signup" className="nav-link text-light">SignUp</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link text-light">Login</Link></li>
          </ul>
        </Container>
      </Navbar>

      <section className="signup-wrapper d-flex justify-content-center align-items-center">
        <div className="signup-card p-4">
          <h2 className="text-center fw-bold mb-3">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Full Name</label>
              <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label>Phone Number</label>
              <PhoneInput country={'in'} value={user.phone} onChange={handlePhoneChange} inputClass="w-100" />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label>Address</label>
              <input type="text" name="address" value={user.address} onChange={handleChange} className="form-control" />
              {errors.address && <div className="text-danger">{errors.address}</div>}
            </div>

            <div className="mb-3">
              <label>City</label>
              <input type="text" name="city" value={user.city} onChange={handleChange} className="form-control" />
              {errors.city && <div className="text-danger">{errors.city}</div>}
            </div>

            <div className="mb-3">
              <label>State</label>
              <input type="text" name="state" value={user.state} onChange={handleChange} className="form-control" />
              {errors.state && <div className="text-danger">{errors.state}</div>}
            </div>

            <div className="mb-3">
              <label>Pincode</label>
              <input type="number" name="pincode" value={user.pincode} onChange={handleChange} className="form-control" />
              {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
            </div>

            <div className="mb-3">
              <label>User Type</label>
              <Dropdown>
                <Dropdown.Toggle className="form-control text-start">
                  {title}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleTitle('Ordinary')}>Ordinary</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTitle('Admin')}>Admin</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTitle('Agent')}>Agent</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {errors.userType && <div className="text-danger mt-1">{errors.userType}</div>}
            </div>

            <button type="submit" className="btn btn-dark w-100 py-2 rounded-pill mt-3">Register</button>
            <p className="text-center mt-3 text-muted">Already registered? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
