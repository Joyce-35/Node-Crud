const mongoose = require('mongoose')
const { schema } = require('./models')
const Schema = mongoose.Schema

const Author = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required:true
    },
    country:{
        type: String,
        required: true
    },
    bookId:{
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    }
})
module.exports = mongoose.model('book', Author)