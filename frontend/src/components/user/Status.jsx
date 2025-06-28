import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button, Badge } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';
import Collapse from 'react-bootstrap/Collapse';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusCompliants, setStatusCompliants] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;
    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => setStatusCompliants(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center p-4" style={{ backgroundColor: 'orange', minHeight: '90vh' }}>
      {statusCompliants.length > 0 ? (
        statusCompliants.map((complaint, index) => {
          const open = toggle[complaint._id] || false;
          const statusColor = complaint.status === 'completed' ? 'success' : 'warning';

          return (
            <Card
              key={index}
              className="shadow"
              style={{
                width: '22rem',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                transition: 'transform 0.2s',
              }}
            >
              <Card.Body>
                <Card.Title className="text-primary fw-bold"> {complaint.name}</Card.Title>
                <div style={{ fontSize: '14px' }}>
                  <Card.Text> <strong>Address:</strong> {complaint.address}</Card.Text>
                  <Card.Text> <strong>City:</strong> {complaint.city}</Card.Text>
                  <Card.Text> <strong>State:</strong> {complaint.state}</Card.Text>
                  <Card.Text> <strong>Pincode:</strong> {complaint.pincode}</Card.Text>
                  <Card.Text><strong>Comment:</strong> {complaint.comment}</Card.Text>
                  <Card.Text>
                    <strong>Status:</strong>{' '}
                    <Badge bg={statusColor} className="text-capitalize">{complaint.status}</Badge>
                  </Card.Text>
                </div>

                <div className="d-grid mt-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleToggle(complaint._id)}
                    aria-controls={`collapse-${complaint._id}`}
                    aria-expanded={open}
                  >
                    {open ? 'Hide Chat' : 'Open Chat'}
                  </Button>
                </div>

                <Collapse in={open}>
                  <div id={`collapse-${complaint._id}`} className="mt-3">
                    <Card body style={{ backgroundColor: '#f1f1f1' }}>
                      <ChatWindow
                        key={complaint._id}
                        complaintId={complaint._id}
                        name={complaint.name}
                      />
                    </Card>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Alert variant="info" className="w-100 text-center">
          <Alert.Heading>No complaints to show</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Status;


