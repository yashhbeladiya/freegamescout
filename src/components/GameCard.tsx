import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  Button,
  Box,
} from "@mui/material";
import { Game } from "../types/Game"; // Ensure Game type is imported

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Tooltip title={game.title} arrow>
      <Card sx={{ maxWidth: 345, margin: 2 }} className="game-card">
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
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {game.title}
          </Typography>
          {game.releaseDate && (
            <Typography variant="body2" color="text.secondary">
              Release Date: {game.releaseDate}
            </Typography>
          )}
          {game.availableUntil && (
            <Typography variant="body2" color="error">
              Available Until: {game.availableUntil}
            </Typography>
          )}
          <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
            Price: {game.price}
          </Typography>
        </CardContent>

        {/* Claim Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            href={game.link}
            target="_blank"
          >
            Claim
          </Button>
        </Box>
      </Card>
    </Tooltip>
  );
};

export default GameCard;
