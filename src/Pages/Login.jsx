import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import UserService from '../UserService';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userData = await UserService.login(formData);
      localStorage.setItem('role', userData.role);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('name', userData.firstname);
      
      toast.success('Login successful!');
      setTimeout(() => {
        if (UserService.isAdmin()) {
          navigate('/admin');
        } else {
          navigate(`/s/${userData.id}`);
        }
      }, 2000); 
    } catch (err) {
      setError('Login failed. Please check your email and password.');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <div className="shadow p-4 rounded">
            <h3 className="text-center mb-4">Log in to Your Account</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" size="lg" className="mt-3" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </Form>
            <div className="text-center mt-3">
              <Link to="/forgotPassword">Forgot Password?</Link>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Login;