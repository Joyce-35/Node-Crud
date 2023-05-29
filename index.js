//require express and bodyparser
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

//create instances
const app = express()


//middlewares
app.use(bodyParser.json())

//models
const BookSchema = mongoose.Schema({
    title:String,
    author:String,
    description: String
})
const BookModel = mongoose.model('Book', BookSchema)
//handles

const viewbook = (req, res) =>{
    //listbooks
    const {id} = req.params
     BookModel.find({title: id}).then(books =>{
        res.json({data: books})
     }).catch(err => console.log(err))
  
}

const createbook = (req, res) =>{
    //createbooks
    const {title, author, description} = req.body
    const book = new BookModel({title, author, description})
    book.save().then(result =>{
        res.json({message: 'create successful', data: book})

    }).catch(err => console.log(err))
  
}
/*
const updatebook = (req, res) =>{
    //updatebooks
    const {title, author, description} = req.body
  const updated = BookModel.update({title, author, description})
  res.json({message: "update successful", data: updated})
}
const deletebook = (req, res) =>{
    //deletebooks
    const {title} = req.body
   let deleted =  BookModel.delete({title})
   res.json({message: "book deleted", data: deleted})
}

//routes

//create books
*/
app.post('/book',createbook)
//view books
app.get('/books/:id',viewbook)
/*
//update
app.put('/book',updatebook)
//delete
app.delete('/book',deletebook)


*/

//port
mongoose.connect("mongodb+srv://Joyce:joyce1355@cluster0.mceuxxy.mongodb.net/?retryWrites=true&w=majority")
.then(result => {
    app.listen(3000, function () {
        console.log("server started on port 3000")
    })
}).catch(err => console.log(err))

