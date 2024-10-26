import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import Header from './parts/Header';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, Box } from '@mui/material';

function SearchResult() {
    const [startups, setStartups] = useState([]);

    const allStartups = async () => {
        const res = await api.get('/get_all_company');
        console.log(!!res.data);
        return res;
    };

    useEffect(() => {
        allStartups()
            .then((response) => {
                console.log(response.data);
                setStartups(response.data);
            })
            .catch((e) => {
                console.error('Error fetching startups:', e);
            });
    }, []);

    function renderCards() {
        return startups.map((element) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={element.id}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Box
                                sx={{
                                    bgcolor: 'blue.200',
                                    borderRadius: '50%',
                                    width: 48,
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: 'blue.500',
                                }}
                            >
                                ST
                            </Box>
                        </Box>
                        <Typography variant="h6" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
                            {element.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            CEO: <span>{element.ceo}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            CTO: <span>{element.cto || 'Not Available'}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Address: <span>{element.address || 'Not Available'}</span>
                        </Typography>
                    </CardContent>
                    <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                        <Link to={`/startup/${element.id}`}>
                            <Button variant="contained" color="primary">
                                Donate
                            </Button>
                        </Link>
                    </Box>
                </Card>
            </Grid>
        ));
    }

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />

            <main className="flex-grow">
                <section className="relative">
                    <Container sx={{ mt: 4 }}>
                        <Typography variant="h4" align="center" sx={{ mb: 4, color: 'blue.600' }}>
                            Donate to Your Favorite Startups
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                            <TextField
                                variant="outlined"
                                placeholder="Search your company name"
                                sx={{ flexGrow: 1, mr: 2 }}
                            />
                            <Button variant="contained" color="primary">
                                Search
                            </Button>
                        </Box>
                    </Container>

                    <Container sx={{ p: 2 }}>
                        <Grid container spacing={4}>
                            {renderCards()}
                        </Grid>
                    </Container>
                </section>
            </main>
        </div>
    );
}

export default SearchResult;
