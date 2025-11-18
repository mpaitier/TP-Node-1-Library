const {Book} = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/books/:id', (req,res) => {
        const id = req.params.id
        Book.update(req.body, { where: {id: id} })
            .then(() => {
                return Book.findByPk(id)
            })
            .then(book => {
                if(!book){
                    const message = "The requested book does not exist. Try another identifier."
                    return res.status(404).json({message})
                }

                const message = `The book ${book.title} has been modified.`
                res.json({message, data: book})
            })
            .catch(error => {
                if (error.name === 'SequelizeValidationError') {
                    const message = `Invalid book data. Please verify the information provided.`
                    return res.status(400).json({ message, data: error.errors.map(e => e.message) })
                }
                
                if (error.name === 'SequelizeUniqueConstraintError') {
                    const message = `ISBN must be unique. A book with this ISBN already exists.`
                    return res.status(409).json({ message, data: error.errors.map(e => e.message) })
                }
                
                const message = `The book couldn't be created. Please try again later.`;
                res.status(500).json({ message, data: error })
            })
    })
}
