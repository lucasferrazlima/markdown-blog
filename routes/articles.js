const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.get('/new', (request, response) => {
  const article = new Article();
  response.render('articles/new', { article });
});

router.get('/edit/:id', async (request, response) => {
  const article = await Article.findById(request.params.id);
  response.render('articles/edit', { article });
});

router.get('/:slug', async (request, response) => {
  const article = await Article.findOne({ slug: request.params.slug });
  if (article == null) {
    response.redirect('/');
  }
  response.render('articles/show', { article });
});

router.post('/', async (request, response, next) => {
  request.article = new Article();
  next();
}, saveArticleAndRedirect('new'));

router.put('/:id', async (request, response, next) => {
  request.article = await Article.findById(request.params.id);
  next();
}, saveArticleAndRedirect('edit'));

router.delete('/:id', async (request, response) => {
  await Article.findByIdAndDelete(request.params.id);
  response.redirect('/');
});

function saveArticleAndRedirect(path) {
  return async (request, response) => {
    let { article } = request;
    article.title = request.body.title;
    article.description = request.body.description;
    article.markdown = request.body.markdown;
    try {
      article = await article.save();
      response.redirect(`/articles/${article.id}`);
    } catch (e) {
      response.render(`articles/${path}`, { article });
    }
  };
}

module.exports = router;
