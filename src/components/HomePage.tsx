import React, { useEffect, useState } from 'react';
import GameSection from './GameSection';
import gameData from '../data/Gamedata.json'

interface Game {
    id: number;
    title: string;
    releaseDate: string;
    availableUntil?: string;
    price: string;
    image: string;
    link: string;
    platform: string;
  }

const HomePage: React.FC = () => {
  const [epicGames, setEpicGames] = useState<Game[]>([]);
  const [primeGames, setPrimeGames] = useState<Game[]>([]);
  const [steamGames, setSteamGames] = useState<Game[]>([]);

  // Assuming your JSON data has categories for each platform
  useEffect(() => {
    // Filter games based on platform
    const epicGames = gameData.filter(game => game.platform === 'Epic');
    const primeGames = gameData.filter(game => game.platform === 'Prime');
    const steamGames = gameData.filter(game => game.platform === 'Steam');

    setEpicGames(epicGames);
    setPrimeGames(primeGames);
    setSteamGames(steamGames);
  }, []);

  return (
    <div>
      {/* Render Game Sections */}
      <GameSection sectionTitle="Epic Games" games={epicGames} />
      <GameSection sectionTitle="Prime Games" games={primeGames} />
      <GameSection sectionTitle="Steam Games" games={steamGames} />
    </div>
  );
};

export default HomePage;
