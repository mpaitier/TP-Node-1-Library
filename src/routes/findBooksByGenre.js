const { Op } = require('sequelize');
const { Book } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/books/genre/:genreName', (req, res) => {
        const genreName = req.params.genreName;

        if (!genreName) {
            const message = "The genre is missing in the URL. (Ex: /api/books/genre/Fiction)";
            return res.status(400).json({ message });
        }
        
        Book.findAll({ where: { genre: {[Op.like]: `%${genreName}%`} } })
            .then(books => {
                if (books.length === 0) {
                    const message = `No books found for the genre ${genre}.`;
                    return res.status(404).json({ message, data: [] });
                }

                const message = `The list of ${books.length} books from the genre ${genreName} has been retrieved.`;
                res.status(200).json({ message, data: books });
            })
            .catch(error => {
                const message = `Couldn't retrieve book list from the genre ${genreName}. Please try again later.`;
                res.status(500).json({ message, data: error });
            });
    });
}