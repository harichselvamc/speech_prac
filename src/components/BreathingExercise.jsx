import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './BreathingExercise.css';

function BreathingExercise() {
  const [showExplanation, setShowExplanation] = useState(false);

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="breathing-page">
      {/* Navbar for navigation */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="navbar-title mx-auto">Breathing Exercise</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/breathing">Breathing Exercise</Nav.Link>
            <Nav.Link href="/speech">Speech Practice</Nav.Link>
            <Nav.Link href="/resources">Tips & Resources</Nav.Link>
            <Nav.Link href="/user">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Breathing Circle */}
      <div id="circle">
        <span className="popup" id="inhale-message">Inhale</span>
        <span className="popup" id="exhale-message">Exhale</span>
      </div>

      {/* What is this? Link */}
      <div id="the-question">
        <span id="link-me" onClick={toggleExplanation}>What is this?</span>
      </div>

      {/* Explanation Popup */}
      {showExplanation && (
        <div id="the-explanation">
          <p>This is a breathing exercise to help you focus and relax. Inhale when the circle grows and exhale as it shrinks.</p>
          <span id="close-explanation" onClick={toggleExplanation}>Close</span>
        </div>
      )}
    </div>
  );
}

export default BreathingExercise;
