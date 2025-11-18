const {Book} = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/books', (req, res) => {
        Book.findAll()
            .then(books => {
                const message = 'The list of books has been retrieved.'
                res.status(200).json({message, data: books})
            })
            .catch(error => {
                const message = `The list of books could not be retrieved. Please try again later.`
                res.status(500).json({message, data: error})
            })
    }) 
}