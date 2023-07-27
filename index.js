//require express and bodyparser
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const {createbook, viewbook,updatebook, deletebook, addAuthor} = require('./controllers')

//create instances
const app = express()


//middlewares
app.use(bodyParser.json())

//routes

//create books

app.post('/book', createbook)
//view books
app.get('/books/:id', viewbook)

//update
app.put('/book',updatebook)

//delete
app.delete('/book',deletebook)

app.post('/author', addAuthor)



//port
mongoose.connect("mongodb+srv://Joyce:joyce1355@cluster0.mceuxxy.mongodb.net/?retryWrites=true&w=majority")
.then(result => {
    app.listen(3000, function () {
        console.log("server started on port 3000")
    })
}).catch(err => console.log(err))

