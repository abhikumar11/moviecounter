const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    role:{
        type:mongoose.Schema.Types.String,
        required:true,
        enum:["admin","user"],
        default:"user"
    }
});
module.exports=mongoose.model("user",userSchema);