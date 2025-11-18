const { Sequelize, DataTypes } = require('sequelize')
const BookModel = require('../models/book')
const books = require('./mock-books')
// to use secret variable
const dotenv = require('dotenv')
dotenv.config()
  
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
    host: "localhost",
    dialect: "mysql",
    logging: false
    }
)
  
const Book = BookModel(sequelize, DataTypes)
  
const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        books.map(book => {
            Book.create({
                // id is auto incremented
                title: book.title, 
                author: book.author,
                isbn: book.isbn,
                publicationYear: book.publicationYear,
                genre: book.genre,
                isAvailable: book.isAvailable
            }).then(bookInstance => console.log(bookInstance.toJSON()))
        })
        console.log('The database has been sync and initialized with books!')
    })
}
  
module.exports = { 
  initDb, Book
}
