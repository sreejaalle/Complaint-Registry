import React, { useState, useEffect } from 'react';
import {
  Button, Container, Nav, Navbar, Card, Alert, Collapse
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';

const AgentHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [toggle, setToggle] = useState({});
  const [agentComplaintList, setAgentComplaintList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const { _id, name } = user;
          setUserName(name);
          const response = await axios.get(`http://localhost:8000/allcomplaints/${_id}`);
          setAgentComplaintList(response.data);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);

  const handleStatusChange = async (complaintId) => {
    try {
      await axios.put(`http://localhost:8000/complaint/${complaintId}`, {
        status: 'completed',
      });
      setAgentComplaintList((prev) =>
        prev.map((comp) => {
          const complaint = comp._doc || comp;
          return complaint.complaintId === complaintId
            ? { ...comp, status: 'completed' }
            : comp;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = (complaintId) => {
    setToggle((prev) => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-white">
            Hi Agent {userName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <NavLink className="nav-link text-light">View Complaints</NavLink>
            </Nav>
            <Button onClick={LogOut} variant="outline-light">
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Body */}
      <div style={{ background: '#ffa726', padding: '30px', minHeight: '90vh' }}>
        <Container fluid className="d-flex flex-wrap gap-4 justify-content-start">
          {agentComplaintList && agentComplaintList.length > 0 ? (
            agentComplaintList.map((complaint, index) => {
              const comp = complaint._doc || complaint;
              const open = toggle[comp.complaintId] || false;
              const isCompleted = comp.status === 'completed';

              return (
                <Card key={index} className="shadow-sm" style={{ width: '20rem' }}>
                  <Card.Body>
                    <Card.Title className="text-dark fw-bold mb-3">{comp.name}</Card.Title>
                    <Card.Text><b>Address:</b> {comp.address}</Card.Text>
                    <Card.Text><b>City:</b> {comp.city}</Card.Text>
                    <Card.Text><b>State:</b> {comp.state}</Card.Text>
                    <Card.Text><b>Pincode:</b> {comp.pincode}</Card.Text>
                    <Card.Text><b>Comment:</b> {comp.comment}</Card.Text>
                    <Card.Text>
                      <b>Status:</b>{' '}
                      <span className={isCompleted ? 'text-success' : 'text-warning'}>
                        {comp.status}
                      </span>
                    </Card.Text>

                    {!isCompleted && (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleStatusChange(comp.complaintId)}
                      >
                        Mark as Completed
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="info"
                      className="ms-2"
                      onClick={() => handleToggle(comp.complaintId)}
                      aria-controls={`collapse-${comp.complaintId}`}
                      aria-expanded={open}
                    >
                      Message
                    </Button>

                    <Collapse in={open}>
                      <div id={`collapse-${comp.complaintId}`} className="mt-3">
                        <Card body className="bg-light">
                          <ChatWindow
                            key={comp.complaintId}
                            complaintId={comp.complaintId}
                            name={userName}
                          />
                        </Card>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <Alert variant="info" className="w-100 text-center mt-5">
              <Alert.Heading>No Complaints Assigned</Alert.Heading>
              <p>You're all caught up for now.</p>
            </Alert>
          )}
        </Container>
      </div>

      {/* Footer */}
      <div className="bg-dark text-white py-3 text-center">
        <Footer />
      </div>
    </>
  );
};

export default AgentHome;



