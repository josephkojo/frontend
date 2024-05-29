import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserService from '../UserService';


const Code = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    try{
      const token = localStorage.getItem('token');
      const number = localStorage.getItem('email');
      const response = UserService.forgotCode(email, number, token);


      console.log(response);
      navigate('/changePassword')


    }catch(err){
      console.log(err);

    }
    

    
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="text-center mt-5">
      <h2>Forgot Password?</h2>
      <p><strong>Please enter the code sent to your email</strong></p>
      <Form style={{ width: '300px', margin: 'auto' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="number" 
            placeholder="Enter code"
            style={{ width: '100%' }}
            id="exampleInputCode1"
            aria-describedby="codeHelp"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Code;
