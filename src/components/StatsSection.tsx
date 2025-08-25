import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gamepad2, Users, Download, TrendingUp } from 'lucide-react';
import { styled } from '@mui/material/styles';

const StatsContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.mode === 'dark' ? '#1a1a2e' : '#e3f2fd'} 0%, 
    ${theme.palette.mode === 'dark' ? '#16213e' : '#bbdefb'} 100%)`,
  py: 8,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="m20 20 20 20v-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
  borderRadius: 20,
  padding: theme.spacing(4),
  textAlign: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 20px 40px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)'}`,
  },
}));

const CounterNumber = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 900,
  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  lineHeight: 1,
  marginBottom: theme.spacing(1),
}));

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, delay }) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (inView) {
      const target = parseInt(value.replace(/[^0-9]/g, ''));
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 fps
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <StatCard elevation={0}>
        <Box sx={{ 
          fontSize: '3rem', 
          color: 'primary.main', 
          mb: 2,
          '& svg': {
            fontSize: 'inherit',
          }
        }}>
          {icon}
        </Box>
        
        <CounterNumber>
          {formatNumber(count)}{value.includes('+') ? '+' : ''}
        </CounterNumber>
        
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: 'text.primary',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {label}
        </Typography>
      </StatCard>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Gamepad2 />,
      value: "5000+",
      label: "Free Games",
    },
    {
      icon: <Users />,
      value: "100000+",
      label: "Happy Gamers",
    },
    {
      icon: <Download />,
      value: "2500000+",
      label: "Downloads",
    },
    {
      icon: <TrendingUp />,
      value: "99",
      label: "% Satisfaction",
    },
  ];

  return (
    <StatsContainer>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 6,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            📊 Platform Statistics
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatItem
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </StatsContainer>
  );
};

export default StatsSection;
