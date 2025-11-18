const { Book } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/books/available/', (req, res) => {

        Book.findAll( {where: { isAvailable: true } })
            .then(books => {
                // if date has no books
                if (books.length === 0) {
                    const message = `No available books found.`;
                    return res.status(404).json({ message, data: [] });
                }
                // books found
                const message = `The list of ${books.length} books available has been retrieved.`;
                res.status(200).json({ message, data: books });
            })
            .catch(error => {
                const message = `Couldn't retrieve available book list. Please try again later.`;
                res.status(500).json({ message, data: error });
            });
    });
}