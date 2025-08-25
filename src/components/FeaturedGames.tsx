import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Game } from '../types/Game';
import FeaturedGameCard from './FeaturedGameCard';
import GameCardSkeleton from './GameCardSkeleton';

interface FeaturedGamesProps {
  games: Game[];
  loading: boolean;
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ games, loading }) => {
  const featuredGames = games.slice(0, 3);

  if (loading) {
    return (
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 6,
            }}
          >
            ⭐ Featured Free Games
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GameCardSkeleton />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 6,
          }}
        >
          ⭐ Featured Free Games
        </Typography>
        
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Handpicked premium games that are completely free right now. 
          Don't miss these limited-time offers!
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {featuredGames.map((game, index) => (
          <Grid item xs={12} md={6} lg={4} key={game.id || index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <FeaturedGameCard game={game} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {featuredGames.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              🎮 No featured games available at the moment
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back soon for amazing free game deals!
            </Typography>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default FeaturedGames;
