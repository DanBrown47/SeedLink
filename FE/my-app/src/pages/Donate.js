import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, TextField, Paper, InputAdornment, Snackbar, Alert } from '@mui/material';
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
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar

  const donationOptions = [100, 500, 1000, 2000];

  const fetchStartupData = async () => {
    try {
      const res = await api.get(`/get_company/${id}`);
      setStartup(res.data);
    } catch (error) {
      console.error('Error fetching startup data:', error);
    }
  };

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
  };

  const handlePayNow = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        `/donate`,
        {
          amount: selectedAmount,
          company_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log('Donation successful:', res.data);
      setSnackbarOpen(true); // Open Snackbar on successful donation
    } catch (error) {
      console.error('Error processing donation:', error);
    }
  };

  useEffect(() => {
    fetchStartupData();
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 8, justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h2" color="primary" gutterBottom>
            ₹ {startup.donation}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Raised so far
          </Typography>
          <Box textAlign="center" p={2} width="100%" maxWidth="300px" m="auto">
            <Typography variant="h6" gutterBottom>
              Donation Amount
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              {donationOptions.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? 'contained' : 'outlined'}
                  color={selectedAmount === amount ? 'primary' : 'default'}
                  onClick={() => handleAmountClick(amount)}
                  sx={{
                    minWidth: '60px',
                    borderRadius: 2,
                    fontWeight: 'bold',
                    backgroundColor: selectedAmount === amount ? '#1565c0' : 'transparent',
                    color: selectedAmount === amount ? 'white' : '#000',
                  }}
                >
                  ₹{amount}
                </Button>
              ))}
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                endAdornment: <InputAdornment position="end">INR</InputAdornment>,
              }}
            />
          </Box>
          <Button variant="contained" color="primary" size="large" onClick={handlePayNow}>
            Pay Now!
          </Button>
          <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
            Donate now to <strong>{startup.name}</strong>
          </Typography>
        </Paper>
      </Box>
      {/* Snackbar for successful donation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Donation successful! Thank you for your support.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Donate;
