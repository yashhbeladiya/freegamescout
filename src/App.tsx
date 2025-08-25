import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeContextProvider, useThemeContext } from './components/ThemeContext';
import store from './store';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Games from './pages/Games';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';

const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        height: '100%',
        scrollBehavior: 'smooth',
      },
      body: {
        height: '100%',
        fontFamily: theme.typography.fontFamily,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 50%, #bbdefb 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      },
      '#root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      // Custom scrollbar
      '*::-webkit-scrollbar': {
        width: 8,
        height: 8,
      },
      '*::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(0,0,0,0.1)',
        borderRadius: 4,
      },
      '*::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        borderRadius: 4,
        '&:hover': {
          background: 'linear-gradient(45deg, #ff5252, #26a69a)',
        },
      },
      // Smooth animations
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      '@keyframes slideUp': {
        from: { 
          opacity: 0,
          transform: 'translateY(30px)',
        },
        to: { 
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
      '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
      },
      '@keyframes gradient': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      // Focus styles
      'button:focus-visible, a:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
        borderRadius: 4,
      },
    })}
  />
);

const AppContent: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <AppContent />
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
