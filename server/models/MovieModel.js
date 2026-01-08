const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title is required"],
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    releaseDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        default: "https://via.placeholder.com/150"
    },
    imdbId: {
        type: String,
        unique: true
    }
}, { 
    timestamps: true 
});

movieSchema.index({ title: "text", description: "text" });
movieSchema.index({ rating: -1, releaseDate: -1 });

module.exports = mongoose.model("Movie", movieSchema);