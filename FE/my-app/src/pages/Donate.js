import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, TextField, Paper } from '@mui/material';
import api from '../services/api.js';
import Header from './parts/Header';

function Donate() {
  const { id } = useParams();
  const [startup, setStartup] = useState({
    name: '',
    ceo: '',
    cto: '',
    address: '',
    email: '',
    website: '',
    following: 0,
    donation: 10,
  });

  const fetchStartupData = async () => {
    try {
      const res = await api.get(`/get_company/${id}`);
      setStartup(res.data);
    } catch (error) {
      console.error('Error fetching startup data:', error);
    }
  };

  useEffect(() => {
    fetchStartupData();
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2" color="primary" gutterBottom>
            ₹ {startup.donation}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Raised so far
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 320, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter the amount to donate"
              type="number"
              placeholder="Enter the amount to donate"
            />
          </Box>
          <Button variant="contained" color="primary" size="large">
            Pay Now!
          </Button>
          <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
            Donate now to <strong>{startup.name}</strong>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Donate;
