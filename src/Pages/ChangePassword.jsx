import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserService from '../UserService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
    console.log("New Password:", e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    console.log("Repeat Password:", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      if (!email || !token) {
        throw new Error('Missing email or token');
      }
      console.log({ email, password1, password2 });

      const response = await UserService.changePassword(email, password1, password2, token);
      setLoading(false);
      console.log(response);
      toast.success('Password changed successfully', { autoClose: 2000 });
      navigate('/');
    } catch (err) {
      setLoading(false);
      console.error('Error in handleSubmit:', err); 
      toast.error('Error changing password', { autoClose: 2000 });
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Forgot Password?</h2>
      <p><strong>Change Password</strong></p>
      <Form style={{ width: '300px', margin: 'auto' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="New Password"
            style={{ width: '100%' }}
            id="password1"
            value={password1}
            onChange={handlePassword1Change}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            style={{ width: '100%' }}
            id="password2"
            value={password2}
            onChange={handlePassword2Change}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </Button>
      </Form>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default ChangePassword;
