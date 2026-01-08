import React, { useState, useContext } from 'react';
import { 
  Container, Paper, TextField, Button, Typography, 
  Box, Alert, CircularProgress, MenuItem 
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Avatar from '@mui/material/Avatar';

const Register = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '', 
    role: 'user' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    const result = await register({
      email: formData.email,
      password: formData.password,
      role: formData.role
    });
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={10} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonAddOutlinedIcon />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Create Account
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Email Address" name="email" type="email"
              margin="normal" required value={formData.email} onChange={handleChange}
            />
            <TextField
              fullWidth label="Role" name="role" select
              margin="normal" value={formData.role} onChange={handleChange}
            >
              <MenuItem value="user">User (Viewer)</MenuItem>
              <MenuItem value="admin">Admin (Editor)</MenuItem>
            </TextField>
            <TextField
              fullWidth label="Password" name="password" type="password"
              margin="normal" required value={formData.password} onChange={handleChange}
            />
            <TextField
              fullWidth label="Confirm Password" name="confirmPassword" type="password"
              margin="normal" required value={formData.confirmPassword} onChange={handleChange}
            />
            
            <Button
              fullWidth type="submit" variant="contained" disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
            
            <Typography variant="body2" align="center">
              Already have an account? <Link to="/login" style={{ color: '#f5c518' }}>Login here</Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;