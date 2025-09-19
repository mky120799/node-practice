const mongoose = require("mongoose");
const { applyTimestamps } = require("./User");

const ImageSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  uploadedBy :{
    type:mongoose.Schema.Types.ObjectId,
    ref : "User",
    required:true
  }
},{applyTimestamps : true});


module.exports = mongoose.model('Image',ImageSchema)
