import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

interface GameCardProps {
  title: string;
  image: string;
  releaseDate: string;
  availableUntil?: string;
  price: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, image, releaseDate, availableUntil, price }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {/* Game Image */}
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />

      {/* Game Details */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        {releaseDate && (<Typography variant="body2" color="text.secondary">
          Release Date: {releaseDate}
        </Typography>
        )}
        {availableUntil && (
          <Typography variant="body2" color="error">
            Available Until: {availableUntil}
          </Typography>
        )}
        <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
          Price: {price}
        </Typography>
      </CardContent>

      {/* Claim Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" color="primary">
          Claim
        </Button>
      </Box>
    </Card>
  );
};

export default GameCard;
