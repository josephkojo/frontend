import React, { useState, useEffect } from "react";
import { Card, Container, Button, Form, Row, Col } from 'react-bootstrap'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../UserService";
import {  Badge } from "react-bootstrap";
import './Login.css';

const ActiveKey = () => {
  const [accessKeys, setAccessKeys] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  const fetchActiveKey = async (email, token) => {
    try {
      const response = await UserService.adminGetActive(email, token);
      setAccessKeys(response);
      toast.success("Data fetched successfully!");
    } catch (error) {
      toast.error("Please enter the correct school email");
      console.error(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async () => {
    if (!email) {
      toast.warn("Please enter an email address");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetchActiveKey(email, token);
    } catch (error) {
    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label><strong>Enter school email address to get details of an active key</strong></Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={handleEmailChange} 
                disabled={isLoading}
                className="w-100"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleClick} disabled={isLoading} className="w-100">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Col>
      </Row>
      {accessKeys && (
         <Card style={{ width: '20rem', border: 'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="mx-auto mt-4 rounded">
         <Card.Body>
           <Card.Title className="text-center mb-3">Active Key Details</Card.Title>
           <Card.Subtitle className="mb-2 text-muted text-center">
             <strong>Key Name: </strong>{accessKeys.keyName || "No title"}
           </Card.Subtitle>
           <Card.Text className="text-center">
             <p><strong>Date of Procurement: </strong>{accessKeys.dateOfProcurement || "No description available"}</p>
             <p><strong>Expiry Date: </strong><span className="text-danger">{accessKeys.expiryDate}</span></p>
             <p><strong>Status: </strong>
               <Badge bg={accessKeys.status === 'ACTIVE' ? 'success' : 'danger'}>{accessKeys.status}</Badge>
             </p>
           </Card.Text>
         </Card.Body>
       </Card>
      )}
      <ToastContainer />
    </Container>
  );
};

export default ActiveKey;
