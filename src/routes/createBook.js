const { Book } = require('../db/sequelize');

module.exports = (app) => {
    app.post('/api/books', (req, res) => {
        Book.create(req.body)
            .then(book => {
                const message = `Le livre ${book.title} a été créé avec succès.`
                res.status(200).json({ message, data: book }) 
            })
            .catch(error => {
                
                const message = `Le livre n'a pas pu être créé. Veuillez réessayer ultérieurement.`;
                res.status(500).json({ message, data: error })
            })
    })
}