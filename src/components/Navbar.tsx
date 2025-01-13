import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Box,
  TextField,
  InputAdornment,
  Container,
  Paper,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "./ThemeContext";
import { setSearchTerm } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { toggleTheme, darkMode } = useThemeContext();

  const theme = useTheme();

  const { searchTerm } = useSelector((state: any) => state.navbar);

  const dispatch = useDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    dispatch(setSearchTerm(term));
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 30, // Adjust offset for navbar height
        behavior: "smooth",
      });
    }
    handleMenuClose();
  };

  const handleLogoClick = () => {
    // Reset search term
    dispatch(setSearchTerm(""));
    // Scroll to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Close the menu when the user scrolls
    window.addEventListener("scroll", handleMenuClose);
    return () => {
      window.removeEventListener("scroll", handleMenuClose);
    };
  }
  , []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: darkMode ? "#1a1a1a" : "#0d0b33", // Adjust navbar color
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar>
          {/* Brand Name */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              flexGrow: 1,
            }}
            onClick={handleLogoClick}
          >
            <img
              src="./fgslogo.png"
              alt="Free Game Scout Logo"
              style={{ height: 40, marginRight: 10 }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "white",
                display: { xs: "none", md: "block" },
              }}
            >
              Free Game Scout
            </Typography>
          </Box>

          {/* Navbar Buttons (Visible on md and up) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button sx={{ color: "white" }} href="#epic">
              Epic Games
            </Button>
            <Button sx={{ color: "white" }} href="#prime">
              Prime Gaming
            </Button>
            <Button sx={{ color: "white" }} href="#steam">
              Steam
            </Button>
            <Button sx={{ color: "white" }} href="#GOG">
              GOG
            </Button>
          </Box>

          {/* Search Field for md and larger */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search games..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ backgroundColor: theme.palette.mode === 'dark' ? "" : '#fff', borderRadius: 1, ml: 2 }}
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
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}>
            <IconButton onClick={toggleSearch} sx={{ color: "white" }}>
              {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          </Box>

          {/* Collapsible Search Field for small screens */}
          {/* {isSearchOpen && (
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
        )} */}

          {/* Menu Icon for small screens */}
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          {/* Dropdown Menu for small screens */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => scrollToSection("epic")} href="#epic">
              Epic Games
            </MenuItem>
            <MenuItem onClick={() => scrollToSection("prime")} href="#prime">
              Prime Gaming
            </MenuItem>
            <MenuItem onClick={() => scrollToSection("steam")} href="#steam">
              Steam
            </MenuItem>
            <MenuItem onClick={() => scrollToSection("GOG")} href="#GOG">
              GOG
            </MenuItem>
          </Menu>
          <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Search Box for small screens */}
      {isSearchOpen && (
        <Paper
          sx={{
            position: "fixed",
            top: 64,
            left: 10,
            right: 10,
            zIndex: 1300,
            backgroundColor: darkMode ? "#1a1a1a" : "#fff",
            padding: 1,
            borderRadius: 2,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search games..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ backgroundColor: "transparent", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      )}
    </>
  );
};

export default Navbar;
