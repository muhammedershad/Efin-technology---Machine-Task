const validateBook = require('../utils/validations')
const BooksModel = require('../models/books')

module.exports = {
    addBook: async (req, res, next) => {
        try {
            const { name, description, publishDate, price} = req.body
            validateBook(name,description, publishDate, price)

            const book = new BooksModel({name, description, publishDate, price})
            const addNewBook = await book.save()

            console.log(addNewBook)
            
            if (addNewBook) return res.status(200).json({success: true, message: 'New book added', book: addNewBook})
            else throw createError(400, 'Error in adding new book')

        } catch (error) {
            next(error);
        }
    },
};
