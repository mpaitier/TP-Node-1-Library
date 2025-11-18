const { Book } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Book.findByPk(id)
            .then(book => {
                if(book === null) {
                    const message = `The book hasn't been found. Please try another identifier.`;
                    return res.status(404).json({ message })
                }
                else {
                    const message = `The book ${book.title} has been found.`
                    res.status(200).json({ message, data: book })
                }
            })
            .catch(error => {
                const message = `The book couldn't be retrieved. Please try again later.`;
                res.status(500).json({ message, data: error })
            })
    })
}