const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const postSchema = new mongoose.Schema({
    body:{
        type:String,
        required:"You have to write Something",
        minlength:1,
        maxlength:150
    },
    photo:{
        type:Buffer,
        contentType:String
    },
    postedBy:{
        type:ObjectId,
        ref:"User",
    },
    created:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Post",postSchema)