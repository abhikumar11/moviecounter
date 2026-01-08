const MovieModel = require('../models/MovieModel');

const getAllMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 3; 

        const movies = await MovieModel.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await MovieModel.countDocuments();
        res.json({ 
            movies, 
            totalPages: Math.ceil(total / limit), 
            currentPage: page 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const searchMovies = async (req, res) => {
    try {
        const { q } = req.query;

        const movies = await MovieModel.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSortedMovies = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3; 
        const { sortBy, order = 'desc' } = req.query; 

        const sortOrder = order === 'asc' ? 1 : -1;
        const sortField = sortBy === 'name' ? 'title' : sortBy;

        const movies = await MovieModel.find()
            .sort({ [sortField]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await MovieModel.countDocuments();

        res.json({ 
            movies, 
            totalPages: Math.ceil(total / limit), 
            currentPage: page 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addMovie = async (req, res) => {
    try {
        const movie = new MovieModel(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const editMovie = async (req, res) => {
    try {
        const movie = await MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        await MovieModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Movie deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    getAllMovies, 
    searchMovies, 
    getSortedMovies, 
    addMovie, 
    editMovie, 
    deleteMovie 
};