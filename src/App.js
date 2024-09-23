import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardManager from './components/CardManager';
import './App.css';

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<CardManager />} />
      </Routes>
    </Router>
  );
}

export default App;



