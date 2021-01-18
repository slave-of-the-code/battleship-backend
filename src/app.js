const express = require('express');
const cors = require('cors');
// permite que dos servidores se conecten
const app = express();

settings();
middlewares(); // funciones que se ejecutan antes que lleguen a las rutas, a las URL
routes();

module.exports = app;

function settings() {
  app.set('port', process.env.PORT || 3000);
}

function middlewares() {
  app.use(cors());
  app.use(express.json()); // mi servidor entiende formato Json
}

function routes() {
  //   app.get("/api/test", (req, res) => {
  //     res.send("API test OK");
  //   });
  app.use('/api/game', require('./routes/game.route'));
  app.use('/api/board', require('./routes/board.route'));
}
