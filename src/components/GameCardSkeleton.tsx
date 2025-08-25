import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const SkeletonCard = styled(Card)(({ theme }) => ({
  height: 400,
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(139, 69, 190, 0.1) 0%, rgba(88, 28, 135, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(139, 69, 190, 0.1) 0%, rgba(88, 28, 135, 0.05) 100%)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(139, 69, 190, 0.2)' : 'rgba(139, 69, 190, 0.1)'}`,
  borderRadius: 20,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(139, 69, 190, 0.1), transparent)',
    animation: 'shimmer 1.5s infinite',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
}));

const GameCardSkeleton: React.FC = () => {
  return (
    <SkeletonCard>
      <Box sx={{ position: 'relative', height: 200 }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          sx={{ 
            bgcolor: 'rgba(139, 69, 190, 0.1)',
            borderRadius: '20px 20px 0 0' 
          }} 
        />
      </Box>
      
      <CardContent sx={{ p: 3 }}>
        <Skeleton 
          variant="text" 
          sx={{ 
            fontSize: '1.5rem', 
            mb: 1,
            bgcolor: 'rgba(139, 69, 190, 0.2)' 
          }} 
        />
        
        <Skeleton 
          variant="text" 
          width="70%" 
          sx={{ 
            mb: 2,
            bgcolor: 'rgba(139, 69, 190, 0.15)' 
          }} 
        />
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton 
            variant="rounded" 
            width={60} 
            height={25} 
            sx={{ bgcolor: 'rgba(139, 69, 190, 0.2)' }} 
          />
          <Skeleton 
            variant="rounded" 
            width={80} 
            height={25} 
            sx={{ bgcolor: 'rgba(139, 69, 190, 0.2)' }} 
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton 
            variant="text" 
            width={100} 
            sx={{ bgcolor: 'rgba(139, 69, 190, 0.2)' }} 
          />
          <Skeleton 
            variant="rounded" 
            width={120} 
            height={40} 
            sx={{ bgcolor: 'rgba(139, 69, 190, 0.2)' }} 
          />
        </Box>
      </CardContent>
    </SkeletonCard>
  );
};

export default GameCardSkeleton;
