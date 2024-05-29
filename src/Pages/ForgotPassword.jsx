import React, { useState } from "react";
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../UserService";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const token = localStorage.getItem('token');
      localStorage.setItem('email', email);
      const response = await UserService.forgotPassword(email, token);
      setLoading(false); 
      navigate('/code');

      toast.success('Password reset code sent successfully', { autoClose: 2000 }); 
      
      
      console.log(response);
    } catch (error) {
      setLoading(false); 
      if (error.response && error.response.status === 403) {
        toast.error('A 4-digit code has already been sent to your email', { autoClose: 2000 }); 
      } else {
        toast.error('An error occurred while sending password reset email', { autoClose: 2000 }); 
      }
      console.log(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="text-center mt-5">
      <h2>Forgot Password?</h2>
      <Form style={{ width: '300px', margin: 'auto' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            style={{ width: '100%' }}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
        </Button>
      </Form>
      <ToastContainer /> 
    </div>
  );
}

export default ForgotPassword;
