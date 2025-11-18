const { Book } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/books/:id', (req, res) => {
        const id = req.params.id;

        Book.findByPk(id)
            .then(book => {
                // incorrect identifier
                if (!book) {
                    const message = "Le livre demandé n'existe pas. Veuillez essayer un autre identifiant."
                    return res.status(404).json({ message })
                }
                
                // correct identifier
                const bookDeleted = book;
                
                return book.destroy()
                    .then(() => {
                        const message = `Le livre (ID n°${bookDeleted.id}, Titre: "${bookDeleted.title}") a été supprimé avec succès.`
                        res.status(200).json({ message, data: bookDeleted })
                    })
            })
            .catch(error => { 
                const message = `Le livre n'a pas pu être supprimé. Veuillez réessayer ultérieurement.`;
                res.status(500).json({ message, data: error.message || error })
            })
    })
}