const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.get('/new', (request, response) => {
  response.render('articles/new');
});

router.post('/', (request, response) => {

});

module.exports = router;
