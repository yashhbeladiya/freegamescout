import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, MenuItem, Menu, Box, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0d0b33' }}>
      <Toolbar>
        {/* Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FreeGamesScout
        </Typography>

        {/* Navbar Buttons (Visible on md and up) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" href='#epic'>Epic Games</Button>
          <Button color="inherit" href='#prime'>Prime Games</Button>
          <Button color="inherit" href='#steam'>Steam Games</Button>
        </Box>

        {/* Search Field for md and larger */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search games..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ backgroundColor: '#fff', borderRadius: 1, ml: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Search Button for small screens */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
          <IconButton color="inherit" onClick={toggleSearch}>
            {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
        </Box>

        {/* Collapsible Search Field for small screens */}
        {isSearchOpen && (
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search games..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ backgroundColor: '#fff', borderRadius: 1, ml: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}

        {/* Menu Icon for small screens */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: 'flex', md: 'none' } }} onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        
        {/* Dropdown Menu for small screens */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Epic Games</MenuItem>
          <MenuItem onClick={handleMenuClose}>Prime Games</MenuItem>
          <MenuItem onClick={handleMenuClose}>Steam Games</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
