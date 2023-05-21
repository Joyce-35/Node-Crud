//require express and bodyparser
const express = require("express")
const bodyParser = require("body-parser")

//create instances
const app = express()


//middlewares
app.use(bodyParser.json())

//database
let bookdb =[

]
//models
class BookModel {
    constructor({title, author, description}){
        this.title = title
        this.author = author
        this.description = description
    }
    save(){
      bookdb.push(this)
      return this
    }
    static all(){
        return bookdb
    }
    static update(updateInfo = {}){
      bookdb = bookdb.map(book =>{
            if (book.title === updateInfo.title) {
                return {...book, ...updateInfo}
            }
            return book
        })
    }
    static delete({title}){
        let deleted = null
       bookdb = bookdb.filter(book => {
            if (book.title !== title) {
               
                return true
            }
            deleted = book
            return false
        })
        return deleted
        
    }
}

//handles
const viewbook = (req, res) =>{
    //listbooks
    const books = BookModel.all()
    res.json({data: books})
}
const createbook = (req, res) =>{
    //createbooks
    const {title, author, description} = req.body
    const book = new BookModel({title, author, description})
    book.save()
    res.json({message: 'create successful', data: book})
}
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
//view books
app.get('/book',viewbook)
//create books
app.post('/book',createbook)
//update
app.put('/book',updatebook)
//delete
app.delete('/book',deletebook)




//port
app.listen(3000, function () {
    console.log("server started on port 3000")
})
