const mongoose=require("mongoose");
require("dotenv").config();
const connectDb=()=>{
    mongoose.connect(`${process.env.DBCONN}`)
            .then(()=>{console.log("Database Connected")})
            .catch(()=>{console.log("Unable to connect to database")})
}
module.exports=connectDb;