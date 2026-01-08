import React, { createContext, useState } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const API_URL = "http://localhost:3001/api/movies";

    const getHeaders = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    const fetchMovies = async (page = 1, sortBy = 'rating', order = 'desc', limit = 3) => {
        console.log(`Fetching Page ${page} (Limit: ${limit})`);
        try {
            const res = await axios.get(`${API_URL}/sorted`, {
                params: { page, sortBy, order, limit }
            });

            const movieArray = res.data.movies || (Array.isArray(res.data) ? res.data : []);
            setMovies(movieArray);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) { 
            console.error(" Fetch failed:", err.message);
            setMovies([]); 
        }
    };

    const searchMovies = async (query) => {
        if (!query) return fetchMovies(1, 'rating', 'desc', 3);
        try {
            const res = await axios.get(`${API_URL}/search`, { params: { q: query } });
            setMovies(Array.isArray(res.data) ? res.data : []);
        } catch (err) { 
            console.error(" Search failed", err);
            setMovies([]); 
        }
    };

    const addMovie = async (movieData) => {
        try {
            const res = await axios.post(API_URL, movieData, getHeaders());
            setMovies((prev) => [res.data, ...prev]);
        } catch (err) { console.error("Add failed", err); }
    };

    const updateMovie = async (id, updatedData) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, updatedData, getHeaders());
            setMovies((prev) => prev.map(m => m._id === id ? res.data : m));
        } catch (err) { console.error("Update failed", err); }
    };

    const deleteMovie = async (id) => {
        if (!window.confirm("Delete this movie?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`, getHeaders());
            setMovies((prev) => prev.filter(m => m._id !== id));
        } catch (err) { console.error("Delete failed", err); }
    };

    return (
        <MovieContext.Provider value={{ 
            movies, totalPages, fetchMovies, searchMovies, 
            addMovie, updateMovie, deleteMovie 
        }}>
            {children}
        </MovieContext.Provider>
    );
};