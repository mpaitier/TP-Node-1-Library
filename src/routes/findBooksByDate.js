const { Book } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/books/date/:date', (req, res) => {
        const date = parseInt(req.params.date);

        if (!date) {
            const message = "No date mentionned in the url. (Ex: /api/books/date/1980)";
            return res.status(400).json({ message });
        }

        Book.findAll({where: { publicationYear: date } })
        .then(books => {
            // if date has no books
            if (books.length === 0) {
                const message = `No books found for the date ${date}.`;
                return res.status(404).json({ message, data: [] });
            }
            // books found
            const message = `The list of ${books.length} books from the date ${date} has been retrieved.`;
            res.status(200).json({ message, data: books });
        })
        .catch(error => {
            const message = `Couldn't retrieve book list from date ${date}. Please try again later.`;
            res.status(500).json({ message, data: error });
        });
    });
}