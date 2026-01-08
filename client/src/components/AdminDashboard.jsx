import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { MovieContext } from '../context/MovieContext';

const AdminDashboard = () => {

  const { movies, fetchMovies, addMovie, updateMovie, deleteMovie } = useContext(MovieContext);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    title: '', rating: '', duration: '', description: '', imageUrl: '', releaseDate: ''
  });

  const refreshList = () => {
    fetchMovies(1, 'title', 'asc', 50); 

  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ title: '', rating: '', duration: '', description: '', imageUrl: '', releaseDate: '' });
    setOpen(true);
  };

  const handleOpenEdit = (movie) => {
    setEditMode(true);
    setCurrentId(movie._id);
    setFormData({
      title: movie.title,
      rating: movie.rating,
      duration: movie.duration,
      description: movie.description,
      imageUrl: movie.imageUrl,

      releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : ''
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateMovie(currentId, formData);
      } else {
        await addMovie(formData);
      }
      handleClose();
      refreshList(); 

    } catch (err) {
      console.error("Operation failed", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteMovie(id);
    refreshList(); 

  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
          Admin Console
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenAdd}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Add New Movie
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 3 }}>
  <Table>
    <TableHead sx={{ bgcolor: 'action.hover' }}>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>Poster</TableCell> {}
        <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <TableRow key={movie._id} hover>
            {}
            <TableCell>
              <Avatar
                variant="rounded"
                src={movie.imageUrl}
                alt={movie.title}
                sx={{ 
                  width: 50, 
                  height: 75, 
                  boxShadow: 2,
                  bgcolor: 'grey.300' 
                }}
              >
                 {}
              </Avatar>
            </TableCell>

            <TableCell sx={{ fontWeight: 500 }}>{movie.title}</TableCell>

            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ color: '#f5c518', mr: 0.5, fontSize: '1rem' }} />
                {movie.rating}
              </Box>
            </TableCell>

            <TableCell>{movie.duration} min</TableCell>

            <TableCell align="right">
              <IconButton color="primary" onClick={() => handleOpenEdit(movie)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(movie._id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
            No movies found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>

      {}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {editMode ? ' Edit Movie' : ' Add New Movie'}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth margin="dense" label="Movie Title"
            value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth margin="dense" label="Rating" type="number"
              value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})}
            />
            <TextField
              fullWidth margin="dense" label="Duration (mins)" type="number"
              value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}
            />
          </Box>
          <TextField
            fullWidth margin="dense" label="Image URL"
            value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />
          <TextField
            fullWidth margin="dense" label="Release Date" type="date" InputLabelProps={{ shrink: true }}
            value={formData.releaseDate} onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
          />
          <TextField
            fullWidth margin="dense" label="Description" multiline rows={3}
            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ px: 4 }}>
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const StarIcon = (props) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default AdminDashboard;