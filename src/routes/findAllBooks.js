const {Book} = require('../db/sequelize')
const { Op } = require('sequelize');
const minLength = 2;

module.exports = (app) => {
    app.get('/api/books', (req, res) => {
        
    const maxResults = parseInt(req.query.limit) || 5;
        if(req.query.title) {
            const title = req.query.title

            if(title.length >= minLength) {
                return Book
                    .findAndCountAll({
                        where: {title: {[Op.like]: `%${title}%`}},
                        order: [['title', 'ASC']],
                        limit: maxResults
                    })
                    .then(({count, rows}) => {
                        const message = `There are ${count} of books matching with the search term '${title}'.`
                        res.status(200).json({message, data: rows})
                    })
                    .catch(error => {
                    const message = `The list of books could not be retrieved. Please try again later.`
                    res.status(500).json({message, data: error})
                    })
            }
                
        }
        
        else {
            Book.findAll()
            .then(books => {
                const message = 'The list of books has been retrieved.'
                res.status(200).json({message, data: books})
            })
            .catch(error => {
                const message = `The list of books could not be retrieved. Please try again later.`
                res.status(500).json({message, data: error})
            })
        }
        
    }) 
}