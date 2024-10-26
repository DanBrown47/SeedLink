import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box, CircularProgress } from '@mui/material';
import Header from './parts/Header';
import api from '../services/api';

function NewStartup() {
    const navigate = useNavigate();

    const INITIAL_STARTUP_OBJ = {
        name: '',
        ceo: '',
        cto: '',
        address: '',
        email: '',
        website: '',
        following: 0,
        donation: 0,
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [startupObj, setStartupObj] = useState(INITIAL_STARTUP_OBJ);

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (startupObj.name.trim() === '') return setErrorMessage('Name of startup required!');
        if (startupObj.ceo.trim() === '') return setErrorMessage('CEO of startup required!');
        if (startupObj.cto.trim() === '') return setErrorMessage('CTO of startup required!');
        if (startupObj.address.trim() === '') return setErrorMessage('Address of startup required!');
        if (startupObj.email.trim() === '') return setErrorMessage('Email of startup required!');
        if (startupObj.website.trim() === '') return setErrorMessage('Website of startup required!');

        try {
            setLoading(true);
            const response = await createStartup(startupObj);
            console.log(response.data);
            // Optionally navigate or reset the form here if necessary
            // navigate('/some-route');
        } catch (e) {
            console.error('Error creating startup:', e);
            setErrorMessage('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const createStartup = async (obj) => {
        console.warn('OBJ', obj)
        const token = localStorage.getItem("token");
        const res = await api.post('/add_company', obj, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          });
        return res;
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setStartupObj({ ...startupObj, [updateType]: value });
    };

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Create New Startup
                    </Typography>
                    <form onSubmit={submitForm}>
                        <TextField
                            fullWidth
                            label="Name of Startup"
                            variant="outlined"
                            margin="normal"
                            value={startupObj.name}
                            onChange={(e) => updateFormValue({ updateType: 'name', value: e.target.value })}
                            error={!!errorMessage && startupObj.name.trim() === ''}
                            helperText={startupObj.name.trim() === '' ? errorMessage : ''}
                        />
                        <TextField
                            fullWidth
                            label="CEO"
                            variant="outlined"
                            margin="normal"
                            value={startupObj.ceo}
                            onChange={(e) => updateFormValue({ updateType: 'ceo', value: e.target.value })}
                            error={!!errorMessage && startupObj.ceo.trim() === ''}
                            helperText={startupObj.ceo.trim() === '' ? errorMessage : ''}
                        />
                        <TextField
                            fullWidth
                            label="CTO"
                            variant="outlined"
                            margin="normal"
                            value={startupObj.cto}
                            onChange={(e) => updateFormValue({ updateType: 'cto', value: e.target.value })}
                            error={!!errorMessage && startupObj.cto.trim() === ''}
                            helperText={startupObj.cto.trim() === '' ? errorMessage : ''}
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            variant="outlined"
                            margin="normal"
                            value={startupObj.address}
                            onChange={(e) => updateFormValue({ updateType: 'address', value: e.target.value })}
                            error={!!errorMessage && startupObj.address.trim() === ''}
                            helperText={startupObj.address.trim() === '' ? errorMessage : ''}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={startupObj.email}
                            onChange={(e) => updateFormValue({ updateType: 'email', value: e.target.value })}
                            error={!!errorMessage && startupObj.email.trim() === ''}
                            helperText={startupObj.email.trim() === '' ? errorMessage : ''}
                        />
                        <TextField
                            fullWidth
                            label="Website"
                            variant="outlined"
                            margin="normal"
                            value={startupObj.website}
                            onChange={(e) => updateFormValue({ updateType: 'website', value: e.target.value })}
                            error={!!errorMessage && startupObj.website.trim() === ''}
                            helperText={startupObj.website.trim() === '' ? errorMessage : ''}
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
                                Create
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

export default NewStartup;
