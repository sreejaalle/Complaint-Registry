import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import Footer from '../common/FooterC';

const UserInfo = () => {
  const [ordinaryList, setOrdinaryList] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/OrdinaryUsers');
        setOrdinaryList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleToggle = (e, userId) => {
    if (e.target.tagName !== 'BUTTON') {
      setExpandedUser(expandedUser === userId ? null : userId);
    }
  };

  const deleteUser = async (userId) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
      setOrdinaryList(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#001f3f', minHeight: '90vh', padding: '40px 0' }}>
        <Container>
          <h3 className="text-light mb-4">User Management</h3>
          {ordinaryList.length ? (
            <Row className="g-4">
              {ordinaryList.map((user) => (
                <Col md={6} lg={4} key={user._id}>
                  <Card
                    className="shadow-sm"
                    onClick={(e) => handleToggle(e, user._id)}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      borderRadius: '12px',
                      backgroundColor: '#f5f5f5',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="fw-bold">{user.name}</Card.Title>
                      {expandedUser === user._id && (
                        <div onClick={(e) => e.stopPropagation()} className="mt-3">
                          <p><strong>Email:</strong> {user.email}</p>
                          <p><strong>Phone:</strong> {user.phone}</p>
                          <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                          <p><strong>City:</strong> {user.city || 'N/A'}</p>
                          <p><strong>State:</strong> {user.state || 'N/A'}</p>
                          <p><strong>Pincode:</strong> {user.pincode || 'N/A'}</p>

                          <Button
                            variant="danger"
                            size="sm"
                            className="mt-2"
                            onClick={() => deleteUser(user._id)}
                          >
                            🗑️ Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="info" className="text-center mt-4">
              <Alert.Heading>No users found</Alert.Heading>
            </Alert>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default UserInfo;


