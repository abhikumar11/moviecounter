import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { MovieProvider } from './context/MovieContext.jsx';

const theme = createTheme({
palette: {
    mode: 'dark',
    primary: {
      main: '#f5c518',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
      <App />
      </MovieProvider>
      </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
