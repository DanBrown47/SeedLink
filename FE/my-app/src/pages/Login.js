import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, CircularProgress } from '@mui/material';
import Header from './parts/Header';
import api from '../services/api';

function Login() {
  const navigate = useNavigate();
  const INITIAL_LOGIN_OBJ = {
    password: '',
    username: ''
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (loginObj.username.trim() === '') return setErrorMessage('Username required! (use any value)');
    if (loginObj.password.trim() === '') return setErrorMessage('Password is required! (use any value)');

    try {
      setLoading(true);
      const response = await Login(loginObj.username, loginObj.password);
      if (response.data.token) {
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        navigate(`/search-result`);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (e) {
      console.error('Login error:', e);
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const Login = async (email, password) => {
    const res = await api.post('/login', { username: email, password });
    return res;
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={submitForm}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={loginObj.username}
              onChange={(e) => updateFormValue({ updateType: 'username', value: e.target.value })}
              error={!!errorMessage && loginObj.username.trim() === ''}
              helperText={loginObj.username.trim() === '' ? errorMessage : ''}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={loginObj.password}
              onChange={(e) => updateFormValue({ updateType: 'password', value: e.target.value })}
              error={!!errorMessage && loginObj.password.trim() === ''}
              helperText={loginObj.password.trim() === '' ? errorMessage : ''}
            />
            {errorMessage && <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>{errorMessage}</Typography>}
            <Box sx={{ mt: 3, position: 'relative' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                size="large"
              >
                Login
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'primary.main',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px'
                  }}
                />
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
