import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { Gamepad2, TrendingUp, Gift, Zap } from "lucide-react";
import GameSection from "../components/GameSection";
import HeroSection from "../components/HeroSection";
import FeaturedGames from "../components/FeaturedGames";
import { Game } from "../types/Game";
import { useSelector } from "react-redux";
import * as gameClient from "../components/client";

const Home: React.FC = () => {
  const [epicGames, setEpicGames] = useState<Game[]>([]);
  const [primeGames, setPrimeGames] = useState<Game[]>([]);
  const [steamGames, setSteamGames] = useState<Game[]>([]);
  const [gogGames, setGOGGames] = useState<Game[]>([]);
  const [topPicks, setTopPicks] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const { searchTerm } = useSelector((state: any) => state.navbar);

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const fetchAllGames = async () => {
    setLoading(true);
    try {
      const [epicResponse, primeResponse, steamResponse, gogResponse] = await Promise.all([
        gameClient.getEpicGames(),
        gameClient.getPrimeGames(),
        gameClient.getSteamGames(),
        gameClient.getGOGGames(),
      ]);
      setEpicGames(epicResponse);
      setPrimeGames(primeResponse);
      setSteamGames(steamResponse);
      setGOGGames(gogResponse);
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
    } catch (error) {
      console.error("Error fetching top picks:", error);
    }
  };

  useEffect(() => {
    fetchAllGames();
    fetchTopGames();
  }, []);

  // Filter games based on search term
  const toArray = (v: any) => (Array.isArray(v) ? v : []);
  const gameData = [
    ...toArray(epicGames),
    ...toArray(primeGames),
    ...toArray(steamGames),
    ...toArray(topPicks),
    ...toArray(gogGames),
  ];

  const normalizedSearchTerm = (searchTerm || "").toLowerCase();
  const filteredGames = Array.isArray(gameData)
    ? gameData.filter((game) => (game?.title || "").toLowerCase().includes(normalizedSearchTerm))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ y: 50, opacity: 0 }}
        animate={heroInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <HeroSection />
      </motion.div>

      {/* Featured Games */}
      <Container maxWidth="xl" sx={{ py: 4 }} id="featured-games">
        <FeaturedGames games={topPicks.slice(0, 6)} loading={loading} />
      </Container>



      {/* Game Sections */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {searchTerm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <Gamepad2 size={32} />
              Search Results
            </Typography>
            <GameSection
              games={filteredGames}
              title="Search Results"
              icon={<Gamepad2 />}
              loading={loading}
              showPagination={true}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GameSection
                games={epicGames}
                title="Epic Games Store"
                icon={<Gift />}
                loading={loading}
                showPagination={true}
                gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GameSection
                games={primeGames}
                title="Prime Gaming"
                icon={<Zap />}
                loading={loading}
                showPagination={true}
                gradient="linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GameSection
                games={steamGames}
                title="Steam Free Games"
                icon={<TrendingUp />}
                loading={loading}
                showPagination={true}
                gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GameSection
                games={gogGames}
                title="GOG Free Games"
                icon={<Gamepad2 />}
                loading={loading}
                showPagination={true}
                gradient="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
              />
            </motion.div>
          </motion.div>
        )}
      </Container>
    </motion.div>
  );
};

export default Home;
