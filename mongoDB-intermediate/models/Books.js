const mongoose = require('mongoose')


const BooksSchema = new mongoose.Schema({
    title: String,
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
})


module.exports = mongoose.model('Books',BooksSchema)