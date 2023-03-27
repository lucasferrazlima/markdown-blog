const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.send('Part of /articles');
});

module.exports = router;
