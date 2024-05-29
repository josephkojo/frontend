import React, { useState, useEffect } from "react";
import './Login.css'


import { Button, Badge } from "react-bootstrap"; // Import Badge component for status styling
import UserService from "../UserService";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const { userId } = useParams();
  const [accessKeys, setAccessKeys] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        setName(name);
        const keysResponse = await UserService.getKeysGeneratedByUser(userId, token);
        setAccessKeys(keysResponse);
        await UserService.updateKeyDetails(userId, token);
        
      } catch (error) {
        console.error('Error fetching or updating keys:', error);
        toast.error("Failed to fetch or update keys");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();

  }, [userId]);


  const handleClick = async () => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token');
      const response = await UserService.generateKeyByUser(userId, token);
      if (!response) {
        toast.success("Key generated successfully");
        const keysResponse = await UserService.getKeysGeneratedByUser(userId, token);
        setAccessKeys(keysResponse);
      } else {
        toast.error("Active key already exists");
      }
    } catch (error) {
      console.error('Error generating key:', error);
      toast.error("Active key already exists");
    } finally {
      setLoading(false); 
    }
  };
  
  return (
    <div className="container">
     <h2><strong>Hello {name}!</strong></h2>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={handleClick}>
          Generate New Access Key
        </Button>
      </div>
      <div className="cards">
        {accessKeys.map((card, index) => (
          <div className="card" key={index}>
            <h3>KeyID: {card.key}{index}</h3>
            <p>Date of Procurement:  <strong style={{ color: 'darkgreen' }}>{card.dateOfProcurement}</strong>. 
              Expiry Date  <strong style={{ color: 'darkred', fontWeight: 'bold', fontSize: 'larger' }}>{card.expiryDate}</strong>.  
              </p>
            <p><strong>Status:</strong>
              <Badge bg={card.status === 'ACTIVE' ? 'success' : 'danger'}>
                {card.status}
              </Badge>
            </p>
           
          </div>
        ))}
      </div>
      <ToastContainer /> {/* Toast container for displaying toast messages */}
    </div>
  );
}

export default User;
