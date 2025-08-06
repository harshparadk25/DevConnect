const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{type:String,required:true},
},{timestamps:true});


const projectSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{type:String , required:true},
    description:{type:String , required:true},
    link:{type:String},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    comments:[CommentSchema],

},{timestamps : true});

module.exports = mongoose.model("Project",projectSchema);