const mongoose = require('mongoose')
//models
const Schema = mongoose.Schema
const BookSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      author: {
          type: String,
          required:true
      },
      description:{
          type: String,
          required: true
      },
      books: [
        {bookId: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "book"
        }}
      ]
})
const BookModel = mongoose.model('Book', BookSchema)
module.exports = BookModel;