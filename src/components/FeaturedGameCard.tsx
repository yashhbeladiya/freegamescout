import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Calendar,
  Star,
  Download
} from 'lucide-react';
import { styled } from '@mui/material/styles';
import LazyLoad from 'react-lazyload';
import { Game } from '../types/Game';

interface FeaturedGameCardProps {
  game: Game;
}

const FeaturedCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: 500, // Increased height to prevent cut-off
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(139, 69, 190, 0.15) 0%, rgba(88, 28, 135, 0.1) 100%)'
    : 'linear-gradient(135deg, rgba(139, 69, 190, 0.1) 0%, rgba(88, 28, 135, 0.05) 100%)',
  backdropFilter: 'blur(20px)',
  border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(139, 69, 190, 0.3)' : 'rgba(139, 69, 190, 0.2)'}`,
  borderRadius: 24,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: `0 25px 50px ${theme.palette.mode === 'dark' ? 'rgba(139, 69, 190, 0.4)' : 'rgba(139, 69, 190, 0.3)'}`,
    borderColor: theme.palette.mode === 'dark' ? 'rgba(139, 69, 190, 0.5)' : 'rgba(139, 69, 190, 0.4)',
  },
}));

const FeaturedBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  left: 20,
  zIndex: 3,
  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  color: 'white',
  padding: '8px 16px',
  borderRadius: 20,
  fontWeight: 'bold',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 8px 25px rgba(139, 69, 190, 0.4)',
}));

const PlatformChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  zIndex: 3,
  background: theme.palette.mode === 'dark' 
    ? 'rgba(139, 69, 190, 0.8)' 
    : 'rgba(139, 69, 190, 0.9)',
  color: 'white',
  fontWeight: 'bold',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
  '& .MuiChip-icon': {
    color: 'white',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  border: 'none',
  borderRadius: 16,
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'none',
  padding: '12px 24px',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #e55a5a, #45b7d1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
  },
}));

const FeaturedGameCard: React.FC<FeaturedGameCardProps> = ({ game }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      const currentYear = new Date().getFullYear();
      
      if (date.getFullYear() < 2020) {
        date.setFullYear(currentYear);
      }
      
      if (isNaN(date.getTime())) {
        return null;
      }
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return null;
    }
  };

  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('epic')) return '🎮';
    if (platformLower.includes('steam')) return '⚡';
    if (platformLower.includes('prime')) return '👑';
    if (platformLower.includes('gog')) return '🎯';
    return '🎮';
  };

  const getDefaultImage = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('epic')) return 'https://via.placeholder.com/600x300/8b45be/ffffff?text=Epic+Games+Featured';
    if (platformLower.includes('steam')) return 'https://via.placeholder.com/600x300/8b45be/ffffff?text=Steam+Featured';
    if (platformLower.includes('prime')) return 'https://via.placeholder.com/600x300/8b45be/ffffff?text=Prime+Gaming+Featured';
    if (platformLower.includes('gog')) return 'https://via.placeholder.com/600x300/8b45be/ffffff?text=GOG+Featured';
    return 'https://via.placeholder.com/600x300/8b45be/ffffff?text=Featured+Game';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <FeaturedCard>
        {/* Featured Badge */}
        <FeaturedBadge>
          <Star size={16} fill="currentColor" />
          Featured
        </FeaturedBadge>

        {/* Platform Chip */}
        <PlatformChip
          icon={<span>{getPlatformIcon(game.platform)}</span>}
          label={game.platform}
          size="medium"
        />

        {/* Image Section */}
        <Box sx={{ position: 'relative', height: '60%', overflow: 'hidden' }}>
          <LazyLoad height={240} offset={100}>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
              style={{ height: '100%' }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: imageLoaded ? 'none' : 'blur(5px)',
                  transition: 'filter 0.3s ease',
                }}
                image={game.image || getDefaultImage(game.platform)}
                alt={game.title}
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>
          </LazyLoad>

          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(transparent, rgba(26, 11, 30, 0.9))'
                : 'linear-gradient(transparent, rgba(255, 255, 255, 0.9))',
              zIndex: 1,
            }}
          />
        </Box>

        {/* Content Section */}
        <CardContent sx={{ 
          p: 3, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative', 
          zIndex: 2,
          minHeight: 180 // Ensure enough space for content
        }}>
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              lineHeight: 1.2,
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {game.title}
          </Typography>

          {formatDate(game.available_until) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Calendar size={16} />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                Available until: {formatDate(game.available_until)}
              </Typography>
            </Box>
          )}

          {/* Categories and Features */}
          {(game.categories || game.features) && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {game.categories && game.categories.slice(0, 2).map((category, index) => (
                <Chip
                  key={`cat-${index}`}
                  label={category}
                  size="small"
                  variant="filled"
                  sx={{
                    fontSize: '0.75rem',
                    background: 'linear-gradient(45deg, rgba(139, 69, 190, 0.3), rgba(217, 70, 239, 0.3))',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    border: '1px solid rgba(139, 69, 190, 0.3)',
                  }}
                />
              ))}
              {game.features && game.features.slice(0, 1).map((feature, index) => (
                <Chip
                  key={`feat-${index}`}
                  label={feature}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.75rem',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  }}
                />
              ))}
              {((game.categories?.length || 0) + (game.features?.length || 0)) > 3 && (
                <Chip
                  label={`+${((game.categories?.length || 0) + (game.features?.length || 0)) - 3} more`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.75rem',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  }}
                />
              )}
            </Box>
          )}

          {/* Price and Action */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            mt: 'auto',
            pt: 2
          }}>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                  textDecoration: 'line-through',
                  fontSize: '0.9rem',
                  opacity: 0.7
                }}
              >
                ${game.price !== 'Free' ? game.price : '29.99'}
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                FREE
              </Typography>
            </Box>

            <ActionButton
              onClick={() => window.open(game.link, '_blank')}
              endIcon={<ExternalLink size={18} />}
            >
              Claim Now
            </ActionButton>
          </Box>
        </CardContent>
      </FeaturedCard>
    </motion.div>
  );
};

export default FeaturedGameCard;
