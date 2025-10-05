const mongoose = require('mongoose')
const serchPostSchema = new mongoose.Schema({
    postId:{
        type:String,
        require:true,
        unique:true,
    },
    userId:
    {
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true,
    },
    createdAt:{
      type:Date,
      required:true
    },

},{timestamps:true})

searchPostShema.index({content:'text'})
searchPostSchema.index({createdAt:-1})

const Search = mongoose.model("Search",searchPostSchema)

module.exports = Search;