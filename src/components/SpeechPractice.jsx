import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import './SpeechPractice.css';  // Import the custom CSS for styling
import { Container, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { FaMicrophone, FaStop } from 'react-icons/fa';  // Import icons for mic and stop

function SpeechPractice() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [poetry, setPoetry] = useState([]);  // Store the poetry lines from the API
  const [currentIndex, setCurrentIndex] = useState(0);  // Track the current poetry index

  const navigate = useNavigate();  // Hook to navigate

  // Fetch data from the Poetry API
  useEffect(() => {
    fetch('https://poetrydb.org/linecount/5')
      .then(response => response.json())
      .then(data => setPoetry(data))
      .catch(error => console.error('Error fetching poetry:', error));
  }, []);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        const url = URL.createObjectURL(e.data);
        setAudioUrl(url);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  const showNextPoetry = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % poetry.length);
  };

  return (
    <div>
      {/* Navbar for Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">Speech Practice</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/breathing">Breathing Exercise</Nav.Link>
            <Nav.Link href="/speech">Speech Practice</Nav.Link>
            <Nav.Link href="/tips">Tips & Resources</Nav.Link>
            <Nav.Link href="/user">Home</Nav.Link>
          

          
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="speech-container text-center my-5">
        <Card className="speech-card">
          <Card.Body>
            <Card.Title className="speech-title">Mimic and Record</Card.Title>

            {/* Display current poetry line */}
            {poetry.length > 0 && (
              <Card.Text className="poetry-text">
                {poetry[currentIndex].lines.join(' ')}
              </Card.Text>
            )}

            {/* Button to fetch next poetry */}
            <Button variant="info" className="mt-3" onClick={showNextPoetry}>
              Show Next Text
            </Button>

            {/* Recording buttons */}
            <Button 
              variant={isRecording ? 'danger' : 'success'} 
              className="mic-btn mt-3"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <FaStop /> : <FaMicrophone />}
              {isRecording ? ' Stop Recording' : ' Start Recording'}
            </Button>

            {/* Audio playback and delete recording */}
            {audioUrl && (
              <div className="mt-4">
                <audio controls src={audioUrl} className="w-100 speech-audio"></audio>
                <Button variant="warning" className="mt-2" onClick={() => setAudioUrl(null)}>
                  Delete Recording
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        
      </Container>
    </div>
  );
}

export default SpeechPractice;
