import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#0d0b33', color: '#fff', py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          About FreeGameScout
        </Typography>
        <Typography variant="body2" gutterBottom>
          FreeGameScout is your go-to source for the latest free games available on various platforms. Stay updated with the newest releases and never miss out on a free game again!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body2" gutterBottom>
          Have questions or suggestions? Reach out to us at <Link href="mailto:support@freegamescout.com" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}><EmailIcon sx={{ mr: 1 }} />support@freegamesscout.com</Link>.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Follow Us
        </Typography>
        <Typography variant="body2">
          Stay connected with us on social media:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <IconButton href="https://www.facebook.com" color="inherit" target="_blank" sx={{ '&:hover': { color: '#3b5998' } }}>
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://www.twitter.com" color="inherit" target="_blank" sx={{ '&:hover': { color: '#1DA1F2' } }}>
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://www.instagram.com" color="inherit" target="_blank" sx={{ '&:hover': { color: '#E1306C' } }}>
            <InstagramIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
