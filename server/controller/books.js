const validateBook = require("../utils/validations");
const BooksModel = require("../models/books");

module.exports = {
    addBook: async (req, res, next) => {
        try {
            const { name, description, publishDate, price } = req.body;
            validateBook(name, description, publishDate, price);

            const book = new BooksModel({
                name,
                description,
                publishDate,
                price,
            });
            const addNewBook = await book.save();

            console.log(addNewBook);

            if (addNewBook)
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: "New book added",
                        book: addNewBook,
                    });
            else throw createError(400, "Error in adding new book");
        } catch (error) {
            next(error);
        }
    },

    editBook: async (req, res, next) => {
        const { name, description, publishDate, price } = req.body;
        const { id } = req.params;

        try {
            validateBook(name, description, publishDate, price);

            const updateFields = {
                $set: { name, description, publishDate, price },
            };

            const updatedBook = await BooksModel.findByIdAndUpdate(
                id,
                updateFields,
                { new: true }
            );
            if (updatedBook) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: "Book details updated",
                        book: updatedBook,
                    });
            } else {
                throw createError(400, "Error in updating book details");
            }
        } catch (error) {
            next(error);
        }
    },
};
