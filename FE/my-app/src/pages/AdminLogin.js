import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress, Paper } from '@mui/material';
import Header from './parts/Header';
import api from '../services/api';

function AdminLogin() {
  let navigate = useNavigate();

  const INITIAL_LOGIN_OBJ = {
    password: '',
    username: '',
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (loginObj.username.trim() === '') return setErrorMessage('Username required! (use any value)');
    if (loginObj.password.trim() === '') return setErrorMessage('Password is required! (use any value)');
    else {
      setLoading(true);
      try {
        const response = await Login(loginObj.username, loginObj.password);
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/startup/create');
        }
      } catch (e) {
        console.error('Login error', e);
        setErrorMessage('Something went wrong');
      }
      setLoading(false);
    }
  };

  const Login = async (email, password) => {
    const res = await api.post('/login', {
      username: email,
      password: password,
    });
    return res;
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Header />
      <Paper elevation={3} sx={{ p: 4, mx: 'auto', mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={submitForm}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={loginObj.username}
              onChange={(e) => updateFormValue({ updateType: 'username', value: e.target.value })}
              error={!!errorMessage && loginObj.username.trim() === ''}
              helperText={errorMessage && loginObj.username.trim() === '' ? errorMessage : ''}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={loginObj.password}
              onChange={(e) => updateFormValue({ updateType: 'password', value: e.target.value })}
              error={!!errorMessage && loginObj.password.trim() === ''}
              helperText={errorMessage && loginObj.password.trim() === '' ? errorMessage : ''}
            />
          </Box>
          {errorMessage && (
            <Typography color="error" variant="body2" align="center" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AdminLogin;
