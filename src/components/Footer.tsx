import React from 'react';
import { Box, Container, Typography, Link, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const Footer: React.FC = () => {
  const theme = useTheme(); // Access theme
  
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#0d0b33',
        color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          About FreeGameScout
        </Typography>
        <Typography variant="body2" gutterBottom>
          FreeGameScout is your go-to source for the latest free games available on various platforms.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body2" gutterBottom>
          Have questions or suggestions? Reach out to us at{' '}
          <Link href="mailto:support@freegamescout.com" color="inherit">
            support@freegamescout.com
          </Link>.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Follow Us
        </Typography>
        <Typography variant="body2">Stay connected with us on social media:</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <IconButton
            href="https://www.facebook.com"
            color="inherit"
            target="_blank"
            sx={{ '&:hover': { color: '#3b5998' } }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://www.twitter.com"
            color="inherit"
            target="_blank"
            sx={{ '&:hover': { color: '#1DA1F2' } }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://www.instagram.com"
            color="inherit"
            target="_blank"
            sx={{ '&:hover': { color: '#E1306C' } }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};


export default Footer;
