import React from 'react';
import { Box, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import GameCard from './GameCard';
import { Game } from '../types/Game'; // Ensure that Game type is imported

interface GameSectionProps {
  sectionTitle: string;
  games?: Game[];
}

const GameSection: React.FC<GameSectionProps> = ({ sectionTitle, games = [] }) => {
  // Defensive: ensure `games` is an array at runtime. Props typing helps at compile-time
  // but runtime data (from APIs) can still be malformed.
  const safeGames = Array.isArray(games) ? games : [];
  return (
    <Box sx={{ mt: 4 }}>
      {/* Section Title */}
      <Typography variant="h4" gutterBottom>
        {sectionTitle}
      </Typography>

      {/* Display Games */}
      <Grid container spacing={2}>
        {safeGames.map((game) => (
          <Grid size={{xs:6, sm:6, md:4, lg:3}} key={game.id}>
            <GameCard game={game} /> {/* Pass the entire game object */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameSection;

