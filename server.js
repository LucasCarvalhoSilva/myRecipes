const express = require('express');
const mustache = require('mustache-express');
const session = require("express-session")
const path = require('path');

const router = require('./routes');
const recipe = require('./models/recipe');

const port = process.env.PORT || 3000;
const secret = process.env.SECRET || "!@f5#gH$7l";

const server = express();
const engine = mustache();

server.engine('mustache', engine);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'mustache');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}))
server.use(router);

recipe.populate()

server.listen(port, () => {
  console.info(`Listening on http://localhost:${port}`);
});
