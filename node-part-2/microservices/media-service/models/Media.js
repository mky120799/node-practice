
const { mongoose } = require("mongoose");



const mediaSchema = new mongoose.Schema ({
    publicID : {
        type: String,
        require:true
    },
    mimeType : {
        type: String,
        required : true
    },
    url : {
        type : String,
        require : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    }
},{timestamps : true})

const Media = mongoose.model("Model", mediaSchema);

module.exports = Media;