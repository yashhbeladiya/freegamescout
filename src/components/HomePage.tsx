import React, { useEffect, useState, useRef } from "react";
import GameSection from "./GameSection";
import Pagination from "./Pagination"; // Import the pagination component
import { Game } from "../types/Game";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import * as gameClient from "../components/client";
import ScoutPicks from "./ScoutPicks";

const HomePage: React.FC = () => {
  const [epicGames, setEpicGames] = useState<Game[]>([]);
  const [primeGames, setPrimeGames] = useState<Game[]>([]);
  const [steamGames, setSteamGames] = useState<Game[]>([]);
  const [topPicks, setTopPicks] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const { searchTerm } = useSelector((state: any) => state.navbar);

  const epicRef = useRef<HTMLDivElement>(null);
  const primeRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Pagination states
  const [currentEpicPage, setCurrentEpicPage] = useState(1);
  const [currentPrimePage, setCurrentPrimePage] = useState(1);
  const [currentSteamPage, setCurrentSteamPage] = useState(1);

  const gameData = epicGames.concat(primeGames, steamGames, epicGames, topPicks); // Add more games to test pagination

  // Filter games based on search term
  const filteredGames = gameData.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gamesPerPage = 15; // You can change this value for more or fewer games per page

  // Assuming your JSON data has categories for each platform
  const fetchAllGames = async () => {
    setLoading(true);
    try {
      const [epicResponse, primeResponse, steamResponse] = await Promise.all([
        gameClient.getEpicGames(),
        gameClient.getPrimeGames(),
        gameClient.getSteamGames(),
      ]);
      setEpicGames(epicResponse);
      setPrimeGames(primeResponse);
      setSteamGames(steamResponse);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopGames = async () => {
    try {
      const response = await gameClient.getTopPicks();
      setTopPicks(response);
      console.log(topPicks);
    } catch (error) {
      console.error("Error fetching top picks:", error);
    }
  };

  useEffect(() => {
    fetchAllGames();
    fetchTopGames();
  }, []);

  console.log(loading);

  console.log(epicGames);

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
        behavior: "smooth",
      });
    }
  }, [searchTerm]);

  return (
    <div className="content-wrapper">
      {/* Search Results Section */}
      <div id="top-picks" className="section mt-3">
        <ScoutPicks games={topPicks} />
      </div>
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
