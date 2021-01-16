const express = require('express');

const router = express.Router();

const { getAll, save, getById } = require('../controllers/game.controller');

// get, post, put, delete, patch
router.route('/').get(getAll).post(save);
router.route('/:id').get(getById);

module.exports = router;
