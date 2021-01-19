const express = require('express');
const cors = require('cors');

const app = express();

settings();
middlewares();
routes();

module.exports = app;

function settings() {
  app.set('port', process.env.PORT || 3001);
}

function middlewares() {
  app.use(cors());
  app.use(express.json());
}

function routes() {
  app.use('/api/game', require('./routes/game.route'));
  app.use('/api/board', require('./routes/board.route'));
}
