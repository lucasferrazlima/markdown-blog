const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');

const app = express();

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use('/articles', articleRouter);

app.get('/', (request, response) => {
  const articles = [{
    title: 'Title Test',
    createdAt: new Date(),
    description: 'Description test',
  },
  {
    title: 'Title Test 2',
    createdAt: new Date(),
    description: 'Description test',
  }];
  response.render('articles/index', { articles });
});

app.listen(5000);
