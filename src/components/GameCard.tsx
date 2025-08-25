import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, Tag, Zap } from "lucide-react";
import { Game } from "../types/Game";
import { styled } from '@mui/material/styles';
import LazyLoad from 'react-lazyload';

interface GameCardProps {
  game: Game;
}

const PlatformChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  zIndex: 2,
  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  '& .MuiChip-icon': {
    color: 'white',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
  borderRadius: 16,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s',
    zIndex: 1,
  },
  '&:hover::before': {
    transform: 'translateX(100%)',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  border: 'none',
  borderRadius: 12,
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #e55a5a, #45b7d1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
  },
}));

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      const currentYear = new Date().getFullYear();
      
      // If the year is less than 2020, assume it should be current year
      if (date.getFullYear() < 2020) {
        date.setFullYear(currentYear);
      }
      
      // Check if date is valid
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

  const getDefaultImage = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('epic')) return 'https://via.placeholder.com/400x200/8b45be/ffffff?text=Epic+Games';
    if (platformLower.includes('steam')) return 'https://via.placeholder.com/400x200/8b45be/ffffff?text=Steam';
    if (platformLower.includes('prime')) return 'https://via.placeholder.com/400x200/8b45be/ffffff?text=Prime+Gaming';
    if (platformLower.includes('gog')) return 'https://via.placeholder.com/400x200/8b45be/ffffff?text=GOG';
    return 'https://via.placeholder.com/400x200/8b45be/ffffff?text=Free+Game';
  };

  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes('epic')) return '🎮';
    if (platformLower.includes('steam')) return '⚡';
    if (platformLower.includes('prime')) return '👑';
    if (platformLower.includes('gog')) return '🎯';
    return '🎮';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Tooltip 
        title={game.title} 
        arrow 
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 2,
            }
          }
        }}
      >
        <StyledCard>
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <PlatformChip
              icon={<span>{getPlatformIcon(game.platform)}</span>}
              label={game.platform}
              size="small"
            />
            
            <LazyLoad height={200} offset={100}>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    height: 200,
                    filter: imageLoaded ? 'none' : 'blur(5px)',
                    transition: 'filter 0.3s ease',
                  }}
                  image={game.image || getDefaultImage(game.platform)}
                  alt={game.title}
                  onLoad={() => setImageLoaded(true)}
                />
              </motion.div>
            </LazyLoad>
          </Box>

          <CardContent sx={{ flexGrow: 1, p: 2, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                lineHeight: 1.3,
                mb: 1,
                height: '2.6em',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {game.title}
            </Typography>

            {formatDate(game.available_until) && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Calendar size={14} />
                <Typography variant="body2" color="text.secondary">
                  Until: {formatDate(game.available_until)}
                </Typography>
              </Box>
            )}

            {(game.categories || game.features) && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Tag size={14} />
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {game.categories && game.categories.slice(0, 2).map((category, index) => (
                    <Chip
                      key={`cat-${index}`}
                      label={category}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.7rem',
                        height: 20,
                        borderColor: 'primary.main',
                        color: 'primary.main',
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
                        fontSize: '0.7rem',
                        height: 20,
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                      }}
                    />
                  ))}
                  {((game.categories?.length || 0) + (game.features?.length || 0)) > 3 && (
                    <Chip
                      label={`+${((game.categories?.length || 0) + (game.features?.length || 0)) - 3}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.7rem',
                        height: 20,
                        borderColor: 'text.secondary',
                        color: 'text.secondary',
                      }}
                    />
                  )}
                </Box>
              </Box>
            )}

            <ActionButton
              fullWidth
              startIcon={<Zap size={16} />}
              onClick={(e) => {
                e.stopPropagation();
                window.open(game.link, '_blank');
              }}
            >
              Get Free Game
            </ActionButton>
          </CardContent>
        </StyledCard>
      </Tooltip>
    </motion.div>
  );
};
export default GameCard;
