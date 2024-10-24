import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Home } from '@mui/icons-material';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <Navbar />
      <HomePage />
      {/* Other sections go here */}
    </div>
  );
}

export default App;
