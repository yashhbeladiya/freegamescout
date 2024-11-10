import React, { useEffect, useState, useRef } from "react";
import GameSection from "./GameSection";
import gameData from "../data/Gamedata.json";
import Pagination from "./Pagination"; // Import the pagination component
import { Game } from "../types/Game";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const HomePage: React.FC = () => {
  const [epicGames, setEpicGames] = useState<Game[]>([]);
  const [primeGames, setPrimeGames] = useState<Game[]>([]);
  const [steamGames, setSteamGames] = useState<Game[]>([]);

  const { searchTerm } = useSelector((state: any) => state.navbar);

  const epicRef = useRef<HTMLDivElement>(null);
  const primeRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Pagination states
  const [currentEpicPage, setCurrentEpicPage] = useState(1);
  const [currentPrimePage, setCurrentPrimePage] = useState(1);
  const [currentSteamPage, setCurrentSteamPage] = useState(1);

  // Filter games based on search term
  const filteredGames = gameData.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gamesPerPage = 15; // You can change this value for more or fewer games per page

  // Assuming your JSON data has categories for each platform
  useEffect(() => {
    const epicGames = gameData.filter((game) => game.platform === "Epic");
    const primeGames = gameData.filter((game) => game.platform === "Prime");
    const steamGames = gameData.filter((game) => game.platform === "Steam");

    setEpicGames(epicGames);
    setPrimeGames(primeGames);
    setSteamGames(steamGames);
  }, []);

  // Calculate current games for each section
  const indexOfLastEpicGame = currentEpicPage * gamesPerPage;
  const indexOfFirstEpicGame = indexOfLastEpicGame - gamesPerPage;
  const currentEpicGames = epicGames.slice(
    indexOfFirstEpicGame,
    indexOfLastEpicGame
  );

  const indexOfLastPrimeGame = currentPrimePage * gamesPerPage;
  const indexOfFirstPrimeGame = indexOfLastPrimeGame - gamesPerPage;
  const currentPrimeGames = primeGames.slice(
    indexOfFirstPrimeGame,
    indexOfLastPrimeGame
  );

  const indexOfLastSteamGame = currentSteamPage * gamesPerPage;
  const indexOfFirstSteamGame = indexOfLastSteamGame - gamesPerPage;
  const currentSteamGames = steamGames.slice(
    indexOfFirstSteamGame,
    indexOfLastSteamGame
  );

  // Pagination functions
  const paginateEpic = (pageNumber: number) => setCurrentEpicPage(pageNumber);
  const paginatePrime = (pageNumber: number) => setCurrentPrimePage(pageNumber);
  const paginateSteam = (pageNumber: number) => setCurrentSteamPage(pageNumber);

  // Scroll to search results section when search term changes
  useEffect(() => {
    if (searchTerm && searchRef.current) {
      window.scrollTo({
        top: searchRef.current.offsetTop - 30, // Adjust offset for navbar height
        behavior: 'smooth',
      });
    }
  }, [searchTerm]);

  return (
    <div className="content-wrapper">
      {/* Search Results Section */}
      {searchTerm && (
        <div id="search-results" ref={searchRef} className="section">
          <GameSection
            sectionTitle={`Search Results for "${searchTerm}"`}
            games={filteredGames}
          />
          {filteredGames.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              There are no games available for "{searchTerm}"
            </Typography>
          )}
        </div>
      )}

      {/* Render Paginated Game Sections */}
      <div id="epic" ref={epicRef} className="section">
        <GameSection sectionTitle="Epic Games" games={currentEpicGames} />
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={epicGames.length}
          paginate={paginateEpic}
          currentPage={currentEpicPage}
          sectionRef={epicRef}
        />
      </div>

      <div id="prime" ref={primeRef} className="section">
        <GameSection sectionTitle="Prime Games" games={currentPrimeGames} />
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={primeGames.length}
          paginate={paginatePrime}
          currentPage={currentPrimePage}
          sectionRef={primeRef}
        />
      </div>

      <div id="steam" ref={steamRef} className="section">
        <GameSection sectionTitle="Steam Games" games={currentSteamGames} />
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={steamGames.length}
          paginate={paginateSteam}
          currentPage={currentSteamPage}
          sectionRef={steamRef}
        />
      </div>
    </div>
  );
};

export default HomePage;
