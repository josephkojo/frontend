import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import UserService from '../UserService';

const Nav = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = () => {
    UserService.logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-success mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand mx-auto" to="/" style={{ color: '#fff' }}>Access Key Manager</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ color: '#fff' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" style={{ color: '#fff' }}>Register</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={handleShowLogoutModal} style={{ cursor: 'pointer', color: '#fff' }}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Nav;
