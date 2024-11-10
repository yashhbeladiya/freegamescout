import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div>
      <Navbar />
      <HomePage />
      <Footer />
      {/* Other sections go here */}
    </div>
    </Provider>
  );
}

export default App;
