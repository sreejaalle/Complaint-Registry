import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import Footer from '../common/FooterC';

const AgentInfo = () => {
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    const getAgentRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/agentUsers');
        setAgentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAgentRecords();
  }, []);

  const deleteUser = async (agentId) => {
    const confirm = window.confirm('Are you sure you want to delete this agent?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${agentId}`);
      setAgentList((prev) => prev.filter((a) => a._id !== agentId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#001f3f', minHeight: '90vh', padding: '40px 0' }}>
        <Container>
          <h3 className="text-light mb-4">Agent Management</h3>
          {agentList.length ? (
            <Row className="g-4">
              {agentList.map((agent) => (
                <Col md={6} lg={4} key={agent._id}>
                  <Card
                    className="shadow-sm"
                    style={{
                      transition: 'transform 0.3s, box-shadow 0.3s'
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
                      <Card.Title className="fw-bold">{agent.name}</Card.Title>
                      <Card.Text><b>Email:</b> {agent.email}</Card.Text>
                      <Card.Text><b>Phone:</b> {agent.phone}</Card.Text>
                      <Card.Text><b>Address:</b> {agent.address}</Card.Text>
                      <Card.Text><b>City:</b> {agent.city}</Card.Text>
                      <Card.Text><b>State:</b> {agent.state}</Card.Text>
                      <Card.Text><b>Pincode:</b> {agent.pincode}</Card.Text>

                      <div className="d-flex justify-content-end">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteUser(agent._id)}
                        >
                          🗑️ Delete Agent
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="info" className="text-center mt-4">
              <Alert.Heading>No agents to display</Alert.Heading>
            </Alert>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AgentInfo;
