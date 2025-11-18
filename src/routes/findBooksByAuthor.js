const { Book } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/books/author/:authorName', (req, res) => {
        const authorName = req.params.authorName;

        if (!authorName) {
            const message = "No author mentionned in the url. (Ex: /api/books/author/Victor%20Hugo)";
            return res.status(400).json({ message });
        }

        Book.findAll({where: { author: authorName } })
        .then(books => {
            // if author has no books
            if (books.length === 0) {
                const message = `No books found for the author ${authorName}.`;
                return res.status(404).json({ message, data: [] });
            }
            // books found
            const message = `The list of ${books.length} books from the author ${authorName} has been retrieved.`;
            res.status(200).json({ message, data: books });
        })
        .catch(error => {
            const message = `Couldn't retrieve book list from author ${authorName}. Please try again later.`;
            res.status(500).json({ message, data: error });
        });
    });
}