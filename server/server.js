const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(__dirname + "/../public"))
app.use(bodyParser.json())

// DB
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongoloc = process.env.MONGODB_URI || 'mongodb://localhost:27017/book_db'
mongoose.connect(mongoloc)

const { Book } = require('./models/books')
const { Store } = require('./models/stores')

//POST
app.post('/api/add/store', (req, res) => {
    const store = new Store({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    })

    store.save((err, doc) => {
        if (err) res.status(400).send(err)
        res.status(200).send()
    })
})

app.post('/api/add/books', (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        stores: req.body.stores
    })

    book.save((err, doc) => {
        if (err) req.status(400).send(err)
        res.status(200).send()
    })
})

//GET
app.get('/api/stores', (req, res) => {
    Store.find((err, doc) => {
        console.log(doc)
        if (err) res.status(400).send(err)
        res.send(doc)
    })
})

app.get('/api/books', (req, res) => {
    Book.find((err, doc) => {
        if (err) res.status(400).send(err)
        res.send(doc)
    })
})

app.get('/api/books/:id', (req, res) => {
    Book.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).send(err)
        res.send(doc)
    })
})

//PATCH
app.patch('/api/add/books/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, doc) => {
        if (err) res.status(400).send(err)
        res.send(doc)
    })

})

//DELETE
app.delete('/api/add/books/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id,(err, doc)=>{
        if (err) res.status(400).send(err)
        res.status(200).send()
    })
})

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(process.env.port)
    console.log(`started at port: ${port}`)
})
