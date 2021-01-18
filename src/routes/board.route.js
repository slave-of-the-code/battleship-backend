const express = require('express');

const router = express.Router();

const { setShipsHide } = require('../controllers/board.controller');

// get, post, put, delete, patch
router.route('/setShipsHide').post(setShipsHide);

module.exports = router;
