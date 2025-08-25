import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Play, Download, TrendingUp } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.mode === 'dark' ? '#0a0a0a' : '#f5f5f5'} 0%, 
    ${theme.palette.mode === 'dark' ? '#1a1a2e' : '#e3f2fd'} 50%, 
    ${theme.palette.mode === 'dark' ? '#16213e' : '#bbdefb'} 100%)`,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    animation: 'float 20s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}));

const GlowButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  border: 0,
  borderRadius: 25,
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 5px 30px ${theme.palette.primary.main}60`,
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreGames = () => {
    navigate('/games');
  };

  const handleTopPicks = () => {
    // Scroll to featured games section
    const featuredSection = document.getElementById('featured-games');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <HeroContainer>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                  fontWeight: 900,
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: 'gradient 3s ease infinite',
                  mb: 2,
                  '@keyframes gradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                  },
                }}
              >
                Free Game Scout
              </Typography>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    fontWeight: 400,
                    color: 'text.secondary',
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  Discover the best free games across all platforms. 
                  Epic, Steam, Prime Gaming & more - all in one place.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <GlowButton
                    startIcon={<Play size={20} />}
                    size="large"
                    onClick={handleExploreGames}
                  >
                    Explore Games
                  </GlowButton>
                  
                  <Button
                    variant="outlined"
                    startIcon={<TrendingUp size={20} />}
                    size="large"
                    onClick={handleTopPicks}
                    sx={{
                      borderRadius: 25,
                      px: 3,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    Top Picks
                  </Button>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  '& .hero-icon': {
                    fontSize: { xs: '200px', md: '300px' },
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    animation: 'pulse 2s ease-in-out infinite',
                  },
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                  },
                }}
              >
                <Download className="hero-icon" />
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      top: `${20 + i * 10}%`,
                      left: `${10 + i * 15}%`,
                    }}
                    animate={{
                      y: [-20, 20, -20],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
