const game = {};

const GameModel = require('../models/game.model');

game.getAll = async (req, res) => {
  const games = await GameModel.find();

  res.json(games);
};

game.save = async (req, res) => {
  const { title, description } = req.body;

  const newGame = new GameModel({
    title,
    description,
  });
  await newGame.save();
  res.send('Game saved');
  //   res.send(JSON.stringify(params, null, 4));
};

game.getById = async (req, res) => {
  const { id } = req.params;
  const gameData = await GameModel.findById(id);

  res.json(gameData);
};

module.exports = game;
