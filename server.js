const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const articleRouter = require('./routes/articles');

const app = express();

const atlasUsername = process.env.ATLAS_USERNAME;
const atlasPassword = process.env.ATLAS_PASSWORD;

// Connecting to Atlas database
mongoose.connect(`mongodb+srv://${atlasUsername}:${atlasPassword}@test.zajgzpb.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

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

app.use('/articles', articleRouter);

app.listen(5000);
