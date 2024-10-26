import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { styled } from '@mui/system';
import Treelogo from '../../images/icons8-tree-planting.png';

const LogoIcon = styled('svg')({
  width: 32,
  height: 32,
});

function Header() {
  const [elevated, setElevated] = useState(false);

  // Detect scrolling to change header elevation
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  useEffect(() => {
    setElevated(trigger);
  }, [trigger]);

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        transition: 'background-color 0.3s ease-in-out',
        bgcolor: elevated ? 'background.paper' : 'transparent',
        boxShadow: elevated ? 2 : 0,
      }}
    >
      <Toolbar sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', px: 2 }}>
        {/* Site Branding */}
        <IconButton
          component={RouterLink}
          to="/"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
        >
          <img src={Treelogo} alt="Logo" style={{ width: 32, height: 32 }} />
          <Typography variant="h6" color="textPrimary" sx={{ ml: 1 }}>
            SeedLink
          </Typography>
        </IconButton>

        {/* Site Navigation */}
        <Box sx={{ flexGrow: 1 }} />
        <Link
          component={RouterLink}
          to="/login"
          underline="none"
          color="textSecondary"
          sx={{
            fontWeight: 'medium',
            p: 1.5,
            '&:hover': {
              color: 'textPrimary',
            },
            transition: 'color 0.15s ease-in-out',
          }}
        >
          Sign in
        </Link>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
