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
            .catch(err => {
                const message = `The book can't be retrieve. Please try later.`
                res.status(500).json({message, data: err})
            })
    })
}
