import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ThemeContextProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedTheme = localStorage.getItem('darkMode');
  const initialTheme = savedTheme ? JSON.parse(savedTheme) : false;

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
            main: '#0d0b33',
          },
          background: {
            default: darkMode ? '#121212' : '#ffffff',
            paper: darkMode ? '#1d1d1d' : '#ffffff',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                backgroundColor: darkMode ? '#333' : '#0d0b33', // Dark button in dark mode, light in light mode
                color: darkMode ? '#fff' : '#fff', // White text in dark mode, dark text in light mode
                '&:hover': {
                  backgroundColor: darkMode ? '#444' : '#2a2873', // Dark button in dark mode, light in light mode
                },
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
