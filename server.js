const express = require('express');
const mustache = require('mustache-express');
const path = require('path');

const router = require('./routes');
const recipe = require('./models/recipe');

const port = process.env.PORT || 3000;

const server = express();
const engine = mustache();

server.engine('mustache', engine);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'mustache');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(router);

recipe.populate()

server.listen(port, () => {
  console.info(`Listening on http://localhost:${port}`);
});
