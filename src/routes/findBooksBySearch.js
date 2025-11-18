const { Op } = require('sequelize');
const { Book } = require('../db/sequelize');

module.exports = (app) => {
    app.get('/api/books/search', (req, res) => {
        const query = req.query.q;

        if (!query) {
            const message = "Query is missing. (Ex: /api/books/search?q=roman)";
            return res.status(400).json({ message });
        }
        
        Book.findAll({
            where: {
                [Op.or]: [
                    { title:    { [Op.like]: `%${query}%` } },
                    { author:   { [Op.like]: `%${query}%` } },
                    { genre:    { [Op.like]: `%${query}%` } }
                ]
            }
        })
        .then(books => {
            if (books.length === 0) {
                const message = `No books matching query : '${query}'.`;
                return res.status(404).json({ message, data: [] });
            }
            
            // 3. Succès 200 (OK) : Résultats trouvés
            const message = `The list of ${books.length} book matching '${query}' has been retrieved.`;
            res.status(200).json({ message, data: books });
        })
        .catch(error => {
            // 4. Gestion de l'erreur 500 (Internal Server Error) : Problème BDD ou serveur
            const message = `Couldn't retrieve the book list matching the query. Please try again later`;
            res.status(500).json({ message, data: error });
        });
    });
}