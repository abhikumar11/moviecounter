import React, { useEffect, useState, useContext } from 'react';
import { 
  Container, Grid, Card, CardMedia, CardContent, Typography, 
  TextField, MenuItem, Select, FormControl, InputLabel, Box, 
  Pagination, Chip, Stack, Button, Skeleton 
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const { movies, totalPages, fetchMovies, searchMovies } = useContext(MovieContext);
  const [sortBy, setSortBy] = useState('rating');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!searchTerm) {
        setLoading(true);
        await fetchMovies(page, sortBy, 'desc', 3);
        setLoading(false);
      }
    };
    loadData();
  }, [page, sortBy, searchTerm]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm) {
        setLoading(true);
        await searchMovies(searchTerm);
        setLoading(false);
      }
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container sx={{ py: 6 }}>
      {}
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search movies..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              >
                <MenuItem value="rating">Top Rated</MenuItem>
                <MenuItem value="releaseDate">Newest</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
                <MenuItem value="title">A-Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {}
      <Box sx={{ minHeight: '70vh' }}>
        <Grid container spacing={4} justifyContent="center">
          {loading ? (

            [1, 2, 3].map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '2/3', borderRadius: 4, mb: 1 }} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))
          ) : movies && movies.length > 0 ? (
            movies.map((movie) => (
              <Grid item key={movie._id} xs={12} sm={6} md={4}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 4, 
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-10px)', boxShadow: 10 }
                }}>
                  {}
                  <CardMedia
                    component="img"
                    image={movie.imageUrl || 'https://via.placeholder.com/300x450?text=No+Poster'}
                    alt={movie.title}
                    sx={{ 
                      width: '100%',
                      aspectRatio: '2/3', 
                      objectFit: 'cover' 
                    }}
                  />

                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    p: 3,
                    justifyContent: 'space-between' 
                  }}>
                    <Box>
                      <Stack direction="row" justifyContent="space-between" mb={2}>
                        <Chip 
                          icon={<StarIcon style={{ color: '#000' }} />} 
                          label={movie.rating} 
                          size="small"
                          sx={{ bgcolor: '#f5c518', color: '#000', fontWeight: 'bold' }} 
                        />
                        <Typography variant="caption" color="text.secondary" fontWeight="bold">
                          {movie.duration} min • {new Date(movie.releaseDate).getFullYear()}
                        </Typography>
                      </Stack>

                      {}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 800, mb: 1, fontSize: '1.2rem',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                          overflow: 'hidden', height: '2.8em' 

                        }}
                      >
                        {movie.title}
                      </Typography>

                      <Typography 
                        variant="body2" color="text.secondary" 
                        sx={{ 
                          mb: 3, display: '-webkit-box', WebkitLineClamp: 3, 
                          WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          height: '4.5em' 

                        }}
                      >
                        {movie.description}
                      </Typography>
                    </Box>

                    <Button 
                      fullWidth variant="contained" color="primary"
                      endIcon={<OpenInNewIcon />}
                      href={`https://www.imdb.com/title/${movie.imdbId}`}
                      target="_blank"
                      sx={{ borderRadius: 2, textTransform: 'none', py: 1 }}
                    >
                      Official IMDb
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <SearchOffIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>No movies found matching "{searchTerm}"</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {}
      {!searchTerm && !loading && movies?.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            size="large"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Container>
  );
};

export default Home;