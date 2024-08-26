const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news')
router
    .get('/category-wise/:category',newsController.getNews)
    .get('/search',newsController.searchNews)

module.exports = router