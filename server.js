const express = require('express');
const articleRouter = require('./routes/articles');

const app = express();

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
  response.render('index', { articles });
});

app.listen(5000);
