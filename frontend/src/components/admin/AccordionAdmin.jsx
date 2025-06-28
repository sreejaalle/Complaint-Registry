import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';

const AccordionAdmin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/status')
      .then((res) => setComplaintList(res.data))
      .catch((err) => console.log(err));

    axios.get('http://localhost:8000/AgentUsers')
      .then((res) => setAgentList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelection = async (agentId, complaintId, status, agentName) => {
    try {
      const updatedData = {
        assignedTo: agentName,
        agentId: agentId,
        status: status
      };

      // Update complaint with assigned agent
      await axios.put(`http://localhost:8000/updateComplaint/${complaintId}`, updatedData);

      setComplaintList(prevList =>
        prevList.map(c =>
          c._id === complaintId ? { ...c, assignedTo: agentName } : c
        )
      );

      alert(`Complaint assigned to Agent ${agentName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (complaintId) => {
    const confirm = window.confirm('Are you sure you want to delete this complaint?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/deleteComplaint/${complaintId}`);
      setComplaintList(prev => prev.filter(c => c._id !== complaintId));
      alert('Complaint deleted successfully.');
    } catch (error) {
      console.log(error);
      alert('Failed to delete complaint.');
    }
  };

  return (
    <div style={{ backgroundColor: '#001f3f', minHeight: '100vh', padding: '30px' }}>
      <h3 className="text-light mb-4">User Complaints</h3>
      <div className="d-flex flex-wrap gap-4">
        {complaintList.length ? (
          complaintList.map((complaint) => (
            <Card
              key={complaint._id}
              className="hover-card text-dark"
              style={{
                width: '20rem',
                borderRadius: '12px',
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('.details-box').style.maxHeight = '500px';
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('.details-box').style.maxHeight = '0px';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold">{complaint.name}</Card.Title>
                <div className="details-box" style={{
                  maxHeight: '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}>
                  <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                  <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                  <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                  <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                  <Card.Text><b>Description:</b> {complaint.comment}</Card.Text>
                  <Card.Text><b>Status:</b> {complaint.status}</Card.Text>

                  {complaint.status !== 'completed' && !complaint.assignedTo ? (
                    <Dropdown className="my-2">
                      <Dropdown.Toggle variant="primary" size="sm">
                        Assign to Agent
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {agentList.map((agent) => (
                          <Dropdown.Item
                            key={agent._id}
                            onClick={() =>
                              handleSelection(agent._id, complaint._id, complaint.status, agent.name)
                            }
                          >
                            {agent.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <p className="mt-2"><b>Assigned to Agent:</b> {complaint.assignedTo}</p>
                  )}

                  <Button
                    variant="danger"
                    size="sm"
                    disabled={complaint.status !== 'completed'}
                    onClick={() => handleDelete(complaint._id)}
                    className="mt-2"
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="info" className="w-100 text-center">No complaints found.</Alert>
        )}
      </div>
    </div>
  );
};

export default AccordionAdmin;

