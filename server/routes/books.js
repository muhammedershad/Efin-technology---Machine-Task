const express = require('express');
const bookController = require('../controller/books')

const router = express.Router();

router.post('/', bookController.addBook)
router.patch('/:id', bookController.editBook)
router.get('/', bookController.getBooks)
router.delete('/:id', bookController.deleteBook)

module.exports = router;