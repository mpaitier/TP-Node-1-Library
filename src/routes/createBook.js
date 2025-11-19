const { ValidationError } = require('sequelize');
const { Book } = require('../db/sequelize');

module.exports = (app) => {
    app.post('/api/books', (req, res) => {
        Book.create(req.body)
            .then(book => {
                const message = `The book ${book.title} has been created.`
                res.status(201).json({ message, data: book }) 
            })
            .catch(error => {
                // if (error.name === 'SequelizeValidationError') {
                //     const message = `Invalid book data. Please verify the information provided.`
                //     return res.status(400).json({ message, data: error.errors.map(e => e.message) })
                // }
                
                // if (error.name === 'SequelizeUniqueConstraintError') {
                //     const message = `ISBN must be unique. A book with this ISBN already exists.`
                //     return res.status(409).json({ message, data: error.errors.map(e => e.message) })
                // }
                
                if (error instanceof ValidationError) {
                    const messages = error.errors.map(e => e.message);
                    const message = `Invalid book data. Please verify the information provided.`;
                    return res.status(400).json({ message, data: messages });
                }

                const message = `The book couldn't be created. Please try again later.`;
                res.status(500).json({ message, data: error })
            })
    })
}