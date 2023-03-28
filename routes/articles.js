const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.get('/new', (request, response) => {
  const article = new Article();
  response.render('articles/new', { article });
});

router.get('/:slug', async (request, response) => {
  const article = await Article.findOne({ slug: request.params.slug });
  console.log(article);
  if (article == null) {
    response.redirect('/');
  }
  response.render('articles/show', { article });
});

router.post('/', async (request, response) => {
  let article = new Article({
    title: request.body.title,
    description: request.body.description,
    markdown: request.body.markdown,
  });
  try {
    article = await article.save();
    response.redirect(`articles/${article.slug}`);
  } catch (e) {
    response.render('articles/new', { article });
  }
});

module.exports = router;
