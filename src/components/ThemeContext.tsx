import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createTheme, Theme } from '@mui/material';

interface ThemeContextProps {
  toggleTheme: () => void;
  darkMode: boolean;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedTheme = localStorage.getItem('darkMode');
  const initialTheme = savedTheme ? JSON.parse(savedTheme) : true; // Default to dark mode for gaming theme

  const [darkMode, setDarkMode] = useState(initialTheme);

  const toggleTheme = () => {
    setDarkMode((prevMode: any) => !prevMode);
  };

  useEffect(() => {
    // Save the theme to localStorage whenever it changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#ff6b6b' : '#e55a5a',
            dark: darkMode ? '#e55a5a' : '#d14949',
            light: darkMode ? '#ff8787' : '#ff7c7c',
          },
          secondary: {
            main: darkMode ? '#4ecdc4' : '#45b7d1',
            dark: darkMode ? '#45b7d1' : '#3ea5bf',
            light: darkMode ? '#6dd3cb' : '#5bc0d8',
          },
          background: {
            default: darkMode 
              ? 'linear-gradient(135deg, #0a0a0a 0%, #1a0b1e 50%, #0a0a0a 100%)' 
              : 'linear-gradient(135deg, #f8f4ff 0%, #f3e8ff 50%, #f8f4ff 100%)',
            paper: darkMode ? '#1a0b1e' : '#ffffff',
          },
          text: {
            primary: darkMode ? '#ffffff' : '#2d1b36',
            secondary: darkMode ? '#c4b5fd' : '#6b46c1',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 900,
            fontSize: '3.5rem',
            lineHeight: 1.2,
          },
          h2: {
            fontWeight: 800,
            fontSize: '2.5rem',
            lineHeight: 1.3,
          },
          h3: {
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.3,
          },
          h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
          },
          h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4,
          },
          h6: {
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.5,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 12,
                padding: '8px 24px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0,0,0,0.3)'
                  : '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: darkMode
                    ? '0 16px 64px rgba(0,0,0,0.4)'
                    : '0 16px 64px rgba(0,0,0,0.15)',
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 12,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                  '&.Mui-focused': {
                    transform: 'scale(1.02)',
                  },
                },
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const contextValue: ThemeContextProps = {
    toggleTheme,
    darkMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
