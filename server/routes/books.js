const express = require('express');
const bookController = require('../controller/books')

const router = express.Router();

router.post('/', bookController.addBook)

module.exports = router;