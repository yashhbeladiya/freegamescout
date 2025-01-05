import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Game } from "../types/Game"; 

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const theme = useTheme(); // Access theme
  
  return (
    <Tooltip title={game.title} arrow>
      <Card
        sx={{
          width: '100%', // Full width of the parent container
          backgroundColor: theme.palette.background.paper, // Theme-aware background
          color: theme.palette.text.primary, // Theme-aware text color
          display: 'flex',
          flexDirection: 'column', // Stack content vertically
          height: '100%', // Ensure cards are equal height
        }}
        className="game-card"
      >
        {/* Game Image */}
        <CardMedia
          component="img"
          sx={{
            aspectRatio: '16/9', // Maintain a consistent aspect ratio
            objectFit: 'cover', // Ensure the image covers the area without distortion
            flexGrow: 1, // Allow the image to grow to take available space
          }}
          image={game.image}
          alt={game.title}
        />

        {/* Game Details */}
        <CardContent sx={{ flexGrow: 0 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: { xs: '1rem', sm: '1.2rem' }, // Adjust font size
            }}
          >
            {game.title}
          </Typography>
          {game.release_date && (
            <Typography variant="body2" color="text.secondary">
              Release Date: {game.release_date}
            </Typography>
          )}
          {game.available_until && (
            <Typography variant="body2" color="error">
              Available Until: {game.available_until}
            </Typography>
          )}
          <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
            Price: {game.price}
          </Typography>
        </CardContent>

        {/* Claim Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 'auto' }}>
          <Button
            variant="contained"
            href={game.link}
            target="_blank"
            sx={{
              fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive button font size
            }}
            // sx={{
            //   backgroundColor: theme.palette.primary.main, // Theme-aware button color
            //   color: theme.palette.primary.contrastText, // Theme-aware text color
            //   '&:hover': {
            //     backgroundColor: theme.palette.primary.dark,
            //   },
            // }}
          >
            Play
          </Button>
        </Box>
      </Card>
    </Tooltip>
  );
};

export default GameCard;
