import React, { useState } from 'react';
import GameCard from './GameCard'; // Assuming you have a GameCard component

interface Game {
  title: string;
  releaseDate: string;
  availableUntil: string;
  price: string;
  image: string;
  link: string;
  platform: string;
}

interface GameSectionProps {
  sectionTitle: string;
  games: Game[];
}

const GameSection: React.FC<GameSectionProps> = ({ sectionTitle, games }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20; // Adjust this number based on how many games you want per page

  // Calculate the games to show on the current page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  // Calculate total pages
  const totalPages = Math.ceil(games.length / gamesPerPage);

  // Handlers for pagination
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>{sectionTitle}</h2>
      <div className="game-grid">
        {currentGames.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default GameSection;
