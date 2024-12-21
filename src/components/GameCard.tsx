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
import { Game } from "../types/Game"; // Ensure Game type is imported

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const theme = useTheme(); // Access theme
  
  return (
    <Tooltip title={game.title} arrow>
      <Card
        sx={{
          maxWidth: 345,
          margin: 2,
          backgroundColor: theme.palette.background.paper, // Theme-aware background
          color: theme.palette.text.primary, // Theme-aware text color
        }}
        className="game-card"
      >
        {/* Game Image */}
        <CardMedia
          component="img"
          height="140"
          image={game.image}
          alt={game.title}
        />

        {/* Game Details */}
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button
            variant="contained"
            href={game.link}
            target="_blank"
            // sx={{
            //   backgroundColor: theme.palette.primary.main, // Theme-aware button color
            //   color: theme.palette.primary.contrastText, // Theme-aware text color
            //   '&:hover': {
            //     backgroundColor: theme.palette.primary.dark,
            //   },
            // }}
          >
            Claim
          </Button>
        </Box>
      </Card>
    </Tooltip>
  );
};

export default GameCard;
