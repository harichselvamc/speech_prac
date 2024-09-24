// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import UserPage from './components/UserPage';
// import BreathingExercise from './components/BreathingExercise';
// import SpeechPractice from './components/SpeechPractice';
// import TipsResources from './components/TipsResources';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Redirect to user page if accessing root */}
//         <Route path="/" element={<Navigate to="/user" />} />

//         {/* Other application routes */}
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/breathing" element={<BreathingExercise />} />
//         <Route path="/speech" element={<SpeechPractice />} />
//         <Route path="/tips" element={<TipsResources />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserPage from './components/UserPage';
import BreathingExercise from './components/BreathingExercise';
import SpeechPractice from './components/SpeechPractice';
import TipsResources from './components/TipsResources';
import LoginRegisterPage from './components/LoginRegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate checking authentication from localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle user authentication after login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/user" /> : <Navigate to="/login" />} 
        />

        {/* Login/Register Route */}
        <Route path="/login" element={<LoginRegisterPage onLoginSuccess={handleLoginSuccess} />} />

        {/* Protected Routes */}
        <Route 
          path="/user" 
          element={isAuthenticated ? <UserPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/breathing" 
          element={isAuthenticated ? <BreathingExercise /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/speech" 
          element={isAuthenticated ? <SpeechPractice /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tips" 
          element={isAuthenticated ? <TipsResources /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
