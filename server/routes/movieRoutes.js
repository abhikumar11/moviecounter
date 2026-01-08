const express = require('express');
const { verifyToken, authorizeAdmin } = require('../middleware/AuthMiddleWare');
const router = express.Router();
const movieController=require("../controllers/MovieController")


router.get('/', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.get('/sorted', movieController.getSortedMovies);

router.post('/', verifyToken, authorizeAdmin, movieController.addMovie);
router.put('/:id', verifyToken, authorizeAdmin, movieController.editMovie);
router.delete('/:id', verifyToken, authorizeAdmin, movieController.deleteMovie);

module.exports = router;