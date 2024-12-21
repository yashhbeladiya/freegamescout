import React, { useState, useEffect } from 'react';
import { Game } from "../types/Game";
import { 
  Box, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  IconButton, 
  Button,
  Container,
  useTheme,
  Paper,
  useMediaQuery
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  CardGiftcard,
  AutoAwesome
} from '@mui/icons-material';

const ScoutPicks = ({games}: {games: Game[]}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Determine number of cards to show based on screen size
  const getCardsToShow = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const cardsToShow = getCardsToShow();
  const maxIndex = games.length - cardsToShow;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        py: 4,
        backgroundColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#f5f7fa', 
        // background: `
        //   linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%),
        //   repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(66, 133, 244, 0.03) 10px, rgba(66, 133, 244, 0.03) 20px)
        // `,
        borderRadius: 4,
        my: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesome sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#0d0b33' }} />
            <Typography variant="h4" component="h2" fontWeight="bold">
              Scout Picks
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={prevSlide} size="large">
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={nextSlide} size="large">
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        <Box 
          sx={{ position: 'relative', overflow: 'hidden' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {games.map((game) => (
              <Box
                key={game.id}
                sx={{
                  width: `${100 / cardsToShow}%`,
                  flexShrink: 0,
                  px: 1
                }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s',
                    transform: 'scale(0.98)',
                    '&:hover': {
                      transform: 'scale(1)',
                      boxShadow: theme.shadows[10],
                      '& .MUI-card-media': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  <Box sx={{ overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={game.image}
                      alt={game.title}
                      className="MUI-card-media"
                      sx={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h6" component="h3" noWrap>
                      {game.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Release: {game.release_date}
                    </Typography>
                    <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                      Until: {game.available_until}
                    </Typography>
                    <Typography variant="h6" color="text.primary" fontWeight="bold">
                      {game.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="medium"
                      href={game.link}
                      target="_blank"
                      startIcon={<CardGiftcard />}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      Claim Now
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Progress dots */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: index === currentIndex ? 24 : 12,
                height: 12,
                borderRadius: 6,
                bgcolor: index === currentIndex ? 'primary.main' : 'grey.300',
                transition: 'all 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: index === currentIndex ? 'primary.dark' : 'grey.400'
                }
              }}
            />
          ))}
        </Box>
      </Container>
    </Paper>
  );
};

export default ScoutPicks;