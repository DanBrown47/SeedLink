import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './parts/Header';    // Assuming Header component is adapted to Material UI
import HeroHome from './parts/HeroHome'; // Assuming HeroHome component is adapted to Material UI

function Landing() {
  return (
    <>
      {/* Normalize CSS for MUI styling */}
      <CssBaseline />

      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        overflow="hidden"
      >
        {/* Site Header */}
        <Header />

        {/* Page Content */}
        <Box component="main" flexGrow={1}>
          <Container maxWidth="lg">
            <HeroHome />
            {/* Page sections */}
          </Container>
        </Box>

        {/* Site Footer (Add footer here if needed) */}
      </Box>
    </>
  );
}

export default Landing;
