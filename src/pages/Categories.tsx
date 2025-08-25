import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Chip,
  Skeleton,
  Pagination,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Sword,
  Target,
  Car,
  Puzzle,
  Users,
  Heart,
  Trophy,
  Cpu,
  Music,
  Search,
  ArrowLeft,
  Filter,
} from 'lucide-react';
import GameCard from '../components/GameCard';
import * as gameClient from '../components/client';
import { Game } from '../types/Game';
import { useThemeContext } from '../components/ThemeContext';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode: isDarkMode } = useThemeContext();
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  const [availableCategories, setAvailableCategories] = useState<{[key: string]: {count: number, icon: React.ReactNode, color: string}}>({});
  const [availableFeatures, setAvailableFeatures] = useState<{[key: string]: number}>({});

  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('action') || categoryLower.includes('shooter') || categoryLower.includes('combat')) return <Sword color="white" />;
    if (categoryLower.includes('strategy') || categoryLower.includes('tactics')) return <Target color="white" />;
    if (categoryLower.includes('racing') || categoryLower.includes('car')) return <Car color="white" />;
    if (categoryLower.includes('puzzle') || categoryLower.includes('logic')) return <Puzzle color="white" />;
    if (categoryLower.includes('multiplayer') || categoryLower.includes('mmo') || categoryLower.includes('pvp')) return <Users color="white" />;
    if (categoryLower.includes('rpg') || categoryLower.includes('role')) return <Heart color="white" />;
    if (categoryLower.includes('simulation') || categoryLower.includes('sim')) return <Cpu color="white" />;
    if (categoryLower.includes('music') || categoryLower.includes('rhythm')) return <Music color="white" />;
    if (categoryLower.includes('sport') || categoryLower.includes('competitive')) return <Trophy color="white" />;
    return <Gamepad2 color="white" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = [
      'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      'linear-gradient(45deg, #e55a5a, #45b7d1)',
      'linear-gradient(45deg, #6366f1, #8b5cf6)',
      'linear-gradient(45deg, #ec4899, #f97316)',
      'linear-gradient(45deg, #06b6d4, #3b82f6)',
      'linear-gradient(45deg, #10b981, #059669)',
      'linear-gradient(45deg, #f59e0b, #ef4444)',
      'linear-gradient(45deg, #84cc16, #22c55e)',
    ];
    return colors[category.length % colors.length];
  };

  const fetchAllGames = useCallback(async () => {
    setLoading(true);
    try {
      const [epicResponse, primeResponse, steamResponse, gogResponse] = await Promise.all([
        gameClient.getEpicGames(),
        gameClient.getPrimeGames(),
        gameClient.getSteamGames(),
        gameClient.getGOGGames(),
      ]);
      const allGamesData = [...epicResponse, ...primeResponse, ...steamResponse, ...gogResponse];
      setAllGames(allGamesData);
      
      // Extract unique categories and features
      const categoryMap: {[key: string]: {count: number, icon: React.ReactNode, color: string}} = {};
      const featureMap: {[key: string]: number} = {};
      
      allGamesData.forEach(game => {
        if (game.categories && game.categories.length > 0) {
          game.categories.forEach((category: string) => {
            if (categoryMap[category]) {
              categoryMap[category].count++;
            } else {
              categoryMap[category] = {
                count: 1,
                icon: getCategoryIcon(category),
                color: getCategoryColor(category)
              };
            }
          });
        }
        if (game.features && game.features.length > 0) {
          game.features.forEach((feature: string) => {
            if (featureMap[feature]) {
              featureMap[feature]++;
            } else {
              featureMap[feature] = 1;
            }
          });
        }
      });
      
      setAvailableCategories(categoryMap);
      setAvailableFeatures(featureMap);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllGames();
  }, [fetchAllGames]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get('category');
    const featureFromUrl = urlParams.get('feature');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      setSelectedFeature('');
    } else if (featureFromUrl) {
      setSelectedFeature(featureFromUrl);
      setSelectedCategory('');
    }
  }, [location]);

  const filterGames = useCallback(() => {
    let filtered = allGames;
    if (selectedCategory) {
      filtered = filtered.filter(game => 
        game.categories && game.categories.some(cat => 
          cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    } else if (selectedFeature) {
      filtered = filtered.filter(game => 
        game.features && game.features.some(feature => 
          feature.toLowerCase() === selectedFeature.toLowerCase()
        )
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (game.categories && game.categories.some(cat => 
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
        (game.features && game.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
    }
    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [allGames, selectedCategory, selectedFeature, searchQuery]);

  useEffect(() => {
    filterGames();
  }, [filterGames]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedFeature('');
    navigate(`/categories?category=${encodeURIComponent(category)}`);
  };

  const handleFeatureClick = (feature: string) => {
    setSelectedFeature(feature);
    setSelectedCategory('');
    navigate(`/categories?feature=${encodeURIComponent(feature)}`);
  };

  const handleBackToCategories = () => {
    setSelectedCategory('');
    setSelectedFeature('');
    setSearchQuery('');
    navigate('/categories');
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = filteredGames.slice(startIndex, endIndex);

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Game Categories
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            {selectedCategory ? `Exploring ${selectedCategory} Games` : selectedFeature ? `Exploring ${selectedFeature} Games` : 'Discover games by category and features'}
          </Typography>
          <Box sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search categories, features, or games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color={isDarkMode ? 'white' : 'black'} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  '& fieldset': {
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff6b6b',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4ecdc4',
                  },
                },
              }}
            />
          </Box>
          {selectedCategory || selectedFeature ? (
            <Button
              startIcon={<ArrowLeft />}
              onClick={handleBackToCategories}
              sx={{
                mb: 3,
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                color: 'white',
                borderRadius: 3,
                px: 3,
                py: 1,
                '&:hover': {
                  background: 'linear-gradient(45deg, #e55a5a, #45b7d1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Back to All Categories & Features
            </Button>
          ) : null}
        </Box>

        {loading ? (
          <Box>
            <Grid container spacing={3}>
              {Array.from(new Array(8)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : selectedCategory || selectedFeature ? (
          <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Filter color={isDarkMode ? 'white' : 'black'} />
              <Typography variant="h6">
                {filteredGames.length} games found in "{selectedCategory || selectedFeature}"
              </Typography>
            </Box>
            {currentGames.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {currentGames.map((game, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={game.id || index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <GameCard game={game} />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          color: isDarkMode ? 'white' : 'black',
                          '&.Mui-selected': {
                            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                            color: 'white',
                          },
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No games found in this category/feature
                </Typography>
                <Button
                  onClick={handleBackToCategories}
                  sx={{
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    color: 'white',
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                  }}
                >
                  Explore All Categories & Features
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Categories</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {Object.entries(availableCategories).map(([category, data], index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={category}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        borderRadius: 3,
                        background: data.color,
                        border: 'none',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          zIndex: 0,
                        },
                      }}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <CardContent sx={{ 
                        p: 3, 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mb: 2,
                          p: 2,
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)',
                          width: 60,
                          height: 60,
                          mx: 'auto',
                        }}>
                          {data.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            mb: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'white',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {category}
                        </Typography>
                        <Chip
                          label={`${data.count} games`}
                          sx={{
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            mt: 'auto',
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Features</Typography>
            <Grid container spacing={3}>
              {Object.entries(availableFeatures).map(([feature, count], index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={feature}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                        border: 'none',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          zIndex: 0,
                        },
                      }}
                      onClick={() => handleFeatureClick(feature)}
                    >
                      <CardContent sx={{ 
                        p: 3, 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            mb: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'white',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {feature}
                        </Typography>
                        <Chip
                          label={`${count} games`}
                          sx={{
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            mt: 'auto',
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </motion.div>
    </Container>
  );
};

export default Categories;
