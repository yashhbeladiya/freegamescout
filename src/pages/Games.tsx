import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Tabs, 
  Tab, 
  Button,
  TextField,
  InputAdornment,
  Pagination,
  Card,
  CardContent
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Gamepad2, Gift, Zap, TrendingUp } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { Game } from '../types/Game';
import GameCard from '../components/GameCard';
import GameCardSkeleton from '../components/GameCardSkeleton';
import * as gameClient from '../components/client';
import { useSelector } from 'react-redux';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`games-tabpanel-${index}`}
      aria-labelledby={`games-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
    height: 3,
    borderRadius: 2,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}));

const SearchCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(139, 69, 190, 0.1) 0%, rgba(88, 28, 135, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(139, 69, 190, 0.1) 0%, rgba(88, 28, 135, 0.05) 100%)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(139, 69, 190, 0.2)' : 'rgba(139, 69, 190, 0.1)'}`,
  borderRadius: 16,
  mb: 4,
}));

const Games: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [epicGames, setEpicGames] = useState<Game[]>([]);
  const [primeGames, setPrimeGames] = useState<Game[]>([]);
  const [steamGames, setSteamGames] = useState<Game[]>([]);
  const [gogGames, setGOGGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);

  const { searchTerm } = useSelector((state: any) => state.navbar);

  useEffect(() => {
    fetchAllGames();
  }, []);

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
      
      // Combine all games for "All Games" tab
      const combined = [
        ...epicResponse,
        ...primeResponse,
        ...steamResponse,
        ...gogResponse,
      ];
      setAllGames(combined);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filterGames = (games: Game[]) => {
    const query = (searchQuery || searchTerm || '').toLowerCase();
    if (!query) return games;
    
    return games.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.platform.toLowerCase().includes(query) ||
      (game.tags && game.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  };

  const getTabData = () => {
    switch (tabValue) {
      case 0: return { games: filterGames(allGames), icon: <Gamepad2 />, title: 'All Games' };
      case 1: return { games: filterGames(epicGames), icon: <Gift />, title: 'Epic Games' };
      case 2: return { games: filterGames(primeGames), icon: <Zap />, title: 'Prime Gaming' };
      case 3: return { games: filterGames(steamGames), icon: <TrendingUp />, title: 'Steam' };
      case 4: return { games: filterGames(gogGames), icon: <Gamepad2 />, title: 'GOG' };
      default: return { games: [], icon: <Gamepad2 />, title: '' };
    }
  };

  // Pagination logic
  const { games: allTabGames, icon, title } = getTabData();
  const totalPages = Math.ceil(allTabGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = allTabGames.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [tabValue]);

  const renderGameGrid = (games: Game[]) => {
    if (loading) {
      return (
        <Grid container spacing={3}>
          {[...Array(12)].map((_, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
              <GameCardSkeleton />
            </Grid>
          ))}
        </Grid>
      );
    }

    if (!games.length) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              🎮 No games found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or check back later for new games!
            </Typography>
          </Box>
        </motion.div>
      );
    }

    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={3}>
          <AnimatePresence>
            {games.map((game, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={game.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                >
                  <GameCard game={game} />
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </motion.div>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 4,
            textAlign: 'center',
          }}
        >
          🎮 Games Library
        </Typography>
      </motion.div>

      {/* Search Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SearchCard>
          <CardContent sx={{ p: 3 }}>
            <TextField
              fullWidth
              placeholder="Search games, platforms, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="outlined" startIcon={<Filter />}>
                      Filter
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            />
          </CardContent>
        </SearchCard>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <StyledTabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Games" icon={<Gamepad2 />} iconPosition="start" />
            <Tab label="Epic Games" icon={<Gift />} iconPosition="start" />
            <Tab label="Prime Gaming" icon={<Zap />} iconPosition="start" />
            <Tab label="Steam" icon={<TrendingUp />} iconPosition="start" />
            <Tab label="GOG" icon={<Gamepad2 />} iconPosition="start" />
          </StyledTabs>
        </Box>
      </motion.div>

      {/* Games Grid */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            {icon}
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ({allTabGames.length} total games)
            </Typography>
          </Box>
        </motion.div>

        <TabPanel value={tabValue} index={tabValue}>
          {renderGameGrid(currentGames)}
        </TabPanel>

        {/* Pagination */}
        {!loading && allTabGames.length > gamesPerPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 6,
              mb: 4
            }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 'bold',
                    border: '1px solid rgba(255, 107, 107, 0.2)',
                    '&.Mui-selected': {
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      color: 'white',
                      border: '1px solid rgba(255, 107, 107, 0.5)',
                    },
                    '&:hover': {
                      background: 'rgba(255, 107, 107, 0.1)',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                    },
                  },
                }}
              />
            </Box>
          </motion.div>
        )}
      </Box>
    </Container>
  );
};

export default Games;
