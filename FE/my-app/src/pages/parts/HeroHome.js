import React from 'react';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function HeroHome() {
  return (
    <section>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: 'grey.100' }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 5, borderRadius: 2, textAlign: 'center', backgroundColor: 'blue.50' }}>
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
              Donate to your favourite startups
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Help them achieve their goals
            </Typography>
            <form action="/search-result">
              <Box display="flex" alignItems="center" mt={3} sx={{ backgroundColor: 'white', borderRadius: 1, p: 1 }}>
                <TextField
                  variant="outlined"
                  placeholder="Ignition"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    ml: 2,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 'light',
                    borderRadius: 2,
                  }}
                >
                  <ArrowForwardIcon/>
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </section>
  );
}

export default HeroHome;
