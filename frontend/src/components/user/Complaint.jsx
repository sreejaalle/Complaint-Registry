import axios from 'axios';
import React, {  useState } from 'react';

const Complaint = () => {
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const [userComplaint, setUserComplaint] = useState({
    userId: localUser._id || '',
    name: localUser.name || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint(prev => ({ ...prev, [name]: value }));

    // Auto fetch PIN code when city or state changes
    if (name === 'city' || name === 'state') {
      const { city, state } = {
        ...userComplaint,
        [name]: value
      };
      if (city && state) {
        getPincode(city, state);
      }
    }
  };

  const getPincode = async (city, state) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/postoffice/${city}`);
      const data = res.data[0];
      if (data.Status === 'Success') {
        const match = data.PostOffice.find(
          p => p.State.toLowerCase() === state.toLowerCase()
        );
        if (match) {
          setUserComplaint(prev => ({ ...prev, pincode: match.Pincode }));
        }
      }
    } catch (error) {
      console.error('Error fetching pincode:', error);
    }
  };

  const handleClear = () => {
    setUserComplaint({
      userId: localUser._id || '',
      name: localUser.name || '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/Complaint/${userComplaint.userId}`, userComplaint);
      alert("Your complaint has been submitted!");
      handleClear();
    } catch (err) {
      console.log(err);
      alert("Submission failed. Try again.");
    }
  };

  return (
    <div className="text-white complaint-box">
      <form onSubmit={handleSubmit} className="compliant-form row bg-dark p-3 rounded">
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            name="name"
            onChange={handleChange}
            value={userComplaint.name}
            type="text"
            className="form-control"
            id="name"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            name="address"
            onChange={handleChange}
            value={userComplaint.address}
            type="text"
            className="form-control"
            id="address"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            name="city"
            onChange={handleChange}
            value={userComplaint.city}
            type="text"
            className="form-control"
            id="city"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input
            name="state"
            list="stateOptions"
            onChange={handleChange}
            value={userComplaint.state}
            className="form-control"
            id="state"
            required
          />
          <datalist id="stateOptions">
            <option value="Andhra Pradesh" />
            <option value="Telangana" />
            <option value="Karnataka" />
            <option value="Tamil Nadu" />
            <option value="Maharashtra" />
            <option value="Delhi" />
            <option value="Uttar Pradesh" />
            <option value="West Bengal" />
            <option value="Kerala" />
            <option value="Gujarat" />
          </datalist>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input
            name="pincode"
            onChange={handleChange}
            value={userComplaint.pincode}
            type="text"
            className="form-control"
            id="pincode"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <input
            name="status"
            list="statusOptions"
            onChange={handleChange}
            value={userComplaint.status}
            className="form-control"
            id="status"
            placeholder="e.g., pending"
            required
          />
          <datalist id="statusOptions">
            <option value="pending" />
            <option value="in progress" />
            <option value="completed" />
            <option value="on hold" />
          </datalist>
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="comment" className="form-label" placeholder="Briefly describe your issue...">Description</label>
          <textarea
            name="comment"
            onChange={handleChange}
            value={userComplaint.comment}
            className="form-control"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="text-center col-12">
          <button type="submit" className="btn btn-success px-5">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Complaint;


