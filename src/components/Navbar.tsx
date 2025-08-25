import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Container,
  Paper,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  X as CloseIcon,
  Sun,
  Moon,
  Home,
  Gamepad2,
  Grid3x3,
  Info,
  Mail,
} from "lucide-react";
import { useThemeContext } from "./ThemeContext";
import { setSearchTerm } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(26, 11, 30, 0.95)'
    : 'rgba(248, 244, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(139, 69, 190, 0.2)' : 'rgba(139, 69, 190, 0.1)'}`,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 8px 32px rgba(139, 69, 190, 0.3)'
    : '0 8px 32px rgba(139, 69, 190, 0.1)',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '1.5rem',
  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  textDecoration: 'none',
  cursor: 'pointer',
}));

const NavButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  color: active 
    ? theme.palette.primary.main 
    : theme.palette.text.primary,
  fontWeight: active ? 'bold' : 'normal',
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: 12,
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255,255,255,0.1)' 
      : 'rgba(0,0,0,0.05)',
    transform: 'translateY(-2px)',
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: 3,
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
    borderRadius: 2,
  } : {},
}));

const SearchBox = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(255,255,255,0.1)' 
    : 'rgba(0,0,0,0.05)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
  borderRadius: 25,
  padding: '4px 16px',
  display: 'flex',
  alignItems: 'center',
  minWidth: 300,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ThemeToggle = styled(IconButton)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
    : 'linear-gradient(45deg, #4ecdc4, #ff6b6b)',
  color: 'white',
  width: 40,
  height: 40,
  '&:hover': {
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(45deg, #e55a5a, #45b7d1)'
      : 'linear-gradient(45deg, #45b7d1, #e55a5a)',
    transform: 'rotate(180deg)',
  },
  transition: 'all 0.3s ease',
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 247, 247, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    border: 'none',
    width: 280,
  },
}));

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  const { toggleTheme, darkMode } = useThemeContext();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { searchTerm } = useSelector((state: any) => state.navbar);
  const dispatch = useDispatch();

  // Visitor tracking
  React.useEffect(() => {
    const updateVisitorCount = () => {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('lastVisit');
      const currentCount = parseInt(localStorage.getItem('dailyVisitors') || '0');
      
      if (lastVisit !== today) {
        // New day, reset counter
        localStorage.setItem('dailyVisitors', '1');
        localStorage.setItem('lastVisit', today);
        setVisitorCount(1);
      } else {
        // Same day, increment if new session
        const sessionVisit = sessionStorage.getItem('sessionVisit');
        if (!sessionVisit) {
          const newCount = currentCount + 1;
          localStorage.setItem('dailyVisitors', newCount.toString());
          sessionStorage.setItem('sessionVisit', 'true');
          setVisitorCount(newCount);
        } else {
          setVisitorCount(currentCount);
        }
      }
    };

    updateVisitorCount();
  }, []);

  const navItems = [
    { label: 'Home', path: '/', icon: <Home size={20} /> },
    { label: 'Games', path: '/games', icon: <Gamepad2 size={20} /> },
    { label: 'Categories', path: '/categories', icon: <Grid3x3 size={20} /> },
    { label: 'About', path: '/about', icon: <Info size={20} /> },
    { label: 'Contact', path: '/contact', icon: <Mail size={20} /> },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    dispatch(setSearchTerm(term));
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      dispatch(setSearchTerm(''));
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <StyledAppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px !important' }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo 
                onClick={() => navigate('/')}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                🎮 FreeGameScout
              </Logo>
            </motion.div>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <NavButton
                    onClick={() => navigate(item.path)}
                    active={isActive(item.path)}
                    startIcon={item.icon}
                  >
                    {item.label}
                  </NavButton>
                </motion.div>
              ))}
            </Box>

            {/* Right Side Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Search */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SearchBox>
                      <SearchIcon size={20} />
                      <TextField
                        variant="standard"
                        placeholder="Search games..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{
                          ml: 1,
                          '& .MuiInput-underline:before': { borderBottom: 'none' },
                          '& .MuiInput-underline:after': { borderBottom: 'none' },
                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                        }}
                        autoFocus
                      />
                    </SearchBox>
                  </motion.div>
                )}
              </AnimatePresence>

              <IconButton onClick={toggleSearch} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
              </IconButton>

              {/* Theme Toggle */}
              <ThemeToggle onClick={toggleTheme}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </ThemeToggle>

              {/* Visitor Counter */}
              <Box sx={{ 
                display: { xs: 'none', sm: 'flex' }, 
                alignItems: 'center', 
                gap: 1, 
                px: 2,
                py: 1,
                borderRadius: 2,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, rgba(139, 69, 190, 0.2), rgba(217, 70, 239, 0.2))'
                  : 'linear-gradient(45deg, rgba(139, 69, 190, 0.1), rgba(217, 70, 239, 0.1))',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(139, 69, 190, 0.3)' : 'rgba(139, 69, 190, 0.2)'}`,
              }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Today: {visitorCount}
                </Typography>
              </Box>

              {/* Mobile Menu */}
              <IconButton 
                onClick={() => setMobileDrawerOpen(true)}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      
      {/* Mobile Drawer */}
      <MobileDrawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Box sx={{ p: 2 }}>
          <Logo onClick={() => {setMobileDrawerOpen(false); navigate('/');}}>
            🎮 FreeGameScout
          </Logo>
        </Box>
        
        <Divider />
        
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.path}
              onClick={() => {navigate(item.path); setMobileDrawerOpen(false);}}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                backgroundColor: isActive(item.path) ? 'rgba(255, 107, 107, 0.1)' : 'transparent',
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                cursor: 'pointer',
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Mobile Search */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search games..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={20} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
        </Box>
      </MobileDrawer>
    </>
  );
};

export default Navbar;
