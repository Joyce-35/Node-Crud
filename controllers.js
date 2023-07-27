const Author = require('./Author')
const BookModel = require('./models')
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
const updatebook = (req, res) =>{
    //updatebooks
    const {id,title, author, description} = req.body
    BookModel.find({_id: id}).then(books => {
        if (books.length > 0) {
            books[0].title = title
            books[0].author = author
            books[0].description = description

           
            books[0].save()
            res.json({message: "update successful", data: books[0]})

        }
        

        res.json({message: "document cannot be found"})
    }).catch(err => console.log(err))
  //const updated = BookModel.update({title, author, description})
 // 
}

const deletebook = (req, res) =>{
    //deletebooks
    const {id} = req.body
   BookModel.findByIdAndRemove(id).then(deleted =>{
    if (deleted) {
        res.json({message: "book deleted", data: deleted})
        return
    }
    res.json({message: 'book not found'})
   }).catch(err => console.log(err))
   
}
const addAuthor = (req, res) =>{
    const {name, email, country, bookId} = req.body
    const add = new Author({name, email, country, bookId})
    add.save().then(result =>{
        if (result) {
            res.json({meesage: "Author added", data: result})
        }
        else{
            res.json({message: "Authors was not added"})
        }
    })
}

module.exports = {
    createbook,
    viewbook,
    updatebook,
    deletebook,
    addAuthor,
}