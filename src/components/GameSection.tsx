import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import GameCard from './GameCard';

interface Game {
  id: number;
  title: string;
  image: string;
  releaseDate: string;
  availableUntil?: string;
  price: string;
}

interface GameSectionProps {
  sectionTitle: string;
  games: Game[];
}

const GameSection: React.FC<GameSectionProps> = ({ sectionTitle, games }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {/* Section Title */}
      <Typography variant="h4" gutterBottom>
        {sectionTitle}
      </Typography>

      {/* Display Games */}
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard
              title={game.title}
              image={game.image}
              releaseDate={game.releaseDate}
              availableUntil={game.availableUntil}
              price={game.price}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameSection;
