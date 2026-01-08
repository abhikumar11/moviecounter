const express=require("express");
const connectDb = require("./config/DbConnection");
require("dotenv").config();
const cors=require("cors");
const app=express();
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoute");
connectDb();

app.use(cors());
app.use(express.json()); 

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})