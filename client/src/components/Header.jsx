import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {}
          <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
           Movie Counter
          </Typography>

          {}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>

            {user ? (
              <>
                {}
                {user.role === 'admin' && (
                  <Button color="inherit" component={Link} to="/admin">
                    Dashboard
                  </Button>
                )}
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/login"
                sx={{ fontWeight: 'bold' }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;