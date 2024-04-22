const createError = require('http-errors');

const validateBook = (name, description, publishDate, price) => {
    // Validate book name
    if (typeof name !== 'string' || !name.trim()) {
        throw createError(400, 'Please provide a valid book name');
    }

    // Validate description
    if (typeof description !== 'string' || !description.trim()) {
        throw createError(400, 'Please provide a valid description');
    }

    // Validate publish date
    if (!publishDate) {
        throw createError(400, 'Please provide a valid publish date');
    }

    // Validate price
    if (price < 0 || !price) {
        throw createError(400, 'Please provide a valid price');
    }
};

module.exports = validateBook;