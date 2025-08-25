import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card,
  CardContent,
  Avatar,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Heart,
  Globe,
  Star,
  TrendingUp,
  Target,
  Award,
  Clock,
} from 'lucide-react';
import { styled } from '@mui/material/styles';

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
  borderRadius: 20,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)'}`,
  },
}));

const IconAvatar = styled(Avatar)<{ bgColor: string }>(({ bgColor }) => ({
  width: 64,
  height: 64,
  background: bgColor,
  mb: 2,
  '& svg': {
    fontSize: '2rem',
  },
}));

const About: React.FC = () => {
  const features = [
    {
      icon: <Target color="white" />,
      title: 'Our Mission',
      description: 'To make premium gaming accessible to everyone by providing a comprehensive platform for discovering free games.',
      color: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
    },
    {
      icon: <Heart color="white" />,
      title: 'Community First',
      description: 'Built by gamers, for gamers. We understand what the gaming community needs and values.',
      color: 'linear-gradient(45deg, #4ecdc4, #44bd87)',
    },
    {
      icon: <Shield color="white" />,
      title: 'Safe & Secure',
      description: 'All game links are verified and safe. We only list games from trusted platforms and developers.',
      color: 'linear-gradient(45deg, #a55eea, #8c7ae6)',
    },
    {
      icon: <Globe color="white" />,
      title: 'Global Coverage',
      description: 'Covering free games from all major platforms worldwide - Epic, Steam, Prime Gaming, GOG, and more.',
      color: 'linear-gradient(45deg, #feca57, #ff9ff3)',
    },
    {
      icon: <Clock color="white" />,
      title: 'Real-time Updates',
      description: 'Our platform is updated in real-time to ensure you never miss a free game opportunity.',
      color: 'linear-gradient(45deg, #26de81, #20bf6b)',
    },
    {
      icon: <Award color="white" />,
      title: 'Quality Curated',
      description: 'Not just any free games - we curate quality titles that are worth your time and storage space.',
      color: 'linear-gradient(45deg, #fd79a8, #e84393)',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Free Games Tracked' },
    { number: '100K+', label: 'Happy Users' },
    { number: '4', label: 'Major Platforms' },
    { number: '24/7', label: 'Monitoring' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6, minHeight: '100vh' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
              mb: 3,
            }}
          >
            About Free Game Scout
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              lineHeight: 1.6,
              mb: 4
            }}
          >
            Your ultimate companion for discovering amazing free games across all major gaming platforms. 
            We believe great gaming experiences shouldn't break the bank.
          </Typography>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'primary.main',
                      mb: 1
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>

      <Divider sx={{ my: 8 }} />

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            mb: 6,
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Why Choose Free Game Scout?
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut"
                }}
              >
                <FeatureCard>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <IconAvatar 
                      bgColor={feature.color}
                      sx={{ mx: 'auto', mb: 3 }}
                    >
                      {feature.icon}
                    </IconAvatar>
                    
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <Divider sx={{ my: 8 }} />

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Our Story
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}
            >
              Free Game Scout was born from a simple frustration: missing out on amazing free games 
              because they were scattered across different platforms and buried in newsletters.
            </Typography>

            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}
            >
              As passionate gamers ourselves, we knew there had to be a better way. So we built 
              Free Game Scout - a centralized hub that tracks free games across all major platforms, 
              ensuring you never miss another great deal.
            </Typography>

            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
            >
              Today, we're proud to serve a growing community of gamers who have discovered 
              thousands of hours of entertainment through our platform, completely free.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ 
              textAlign: 'center',
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1))',
              border: '1px solid rgba(255, 107, 107, 0.2)',
            }}>
              <Zap size={120} color="#ff6b6b" />
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                Game On!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Join our community and never pay for great games again
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About;
