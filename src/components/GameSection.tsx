import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GameCard from './GameCard';
import Pagination from './Pagination';
import { Game } from '../types/Game';
import { styled } from '@mui/material/styles';

interface GameSectionProps {
  sectionTitle?: string;
  title?: string; // Alternative prop name for compatibility
  games?: Game[];
  icon?: React.ReactNode;
  loading?: boolean;
  showPagination?: boolean;
  gradient?: string;
}

const SectionContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2, 3),
  borderRadius: 16,
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
    : 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
}));

const GameSection: React.FC<GameSectionProps> = ({ 
  sectionTitle, 
  title, 
  games = [], 
  icon, 
  loading = false, 
  showPagination = false,
  gradient 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;
  
  // Use either prop name for title
  const displayTitle = title || sectionTitle || '';
  
  // Defensive: ensure `games` is an array at runtime
  const safeGames = Array.isArray(games) ? games : [];
  
  // Pagination logic
  const totalPages = Math.ceil(safeGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const paginatedGames = showPagination 
    ? safeGames.slice(startIndex, startIndex + gamesPerPage)
    : safeGames;

  if (loading) {
    return (
      <SectionContainer>
        <SectionHeader>
          <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
            {icon}
            {displayTitle}
          </Typography>
        </SectionHeader>
        
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={index}>
              <Box 
                sx={{ 
                  height: 300, 
                  borderRadius: 2, 
                  bgcolor: 'grey.300',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  }
                }} 
              />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>
    );
  }

  if (!safeGames.length) {
    return (
      <SectionContainer>
        <SectionHeader>
          <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
            {icon}
            {displayTitle}
          </Typography>
        </SectionHeader>
        
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No games available at the moment.
          </Typography>
        </Box>
      </SectionContainer>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <SectionContainer>
        <SectionHeader
          sx={{
            background: gradient || undefined,
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              color: gradient ? 'white' : 'text.primary',
              textShadow: gradient ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {icon}
            {displayTitle}
          </Typography>
          
          {showPagination && totalPages > 1 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <ChevronLeft size={16} />
              </Button>
              
              <Typography variant="body2" sx={{ mx: 2, color: gradient ? 'white' : 'text.primary' }}>
                {currentPage} / {totalPages}
              </Typography>
              
              <Button
                variant="outlined"
                size="small"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <ChevronRight size={16} />
              </Button>
            </Box>
          )}
        </SectionHeader>

        <Grid container spacing={3}>
          {paginatedGames.map((game, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={game.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <GameCard game={game} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {showPagination && totalPages > 1 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Box>
        )}
      </SectionContainer>
    </motion.div>
  );
};

export default GameSection;

