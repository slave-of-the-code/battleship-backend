const express = require('express');

const router = express.Router();

const { setHiddenBoats } = require('../controllers/board.controller');

// get, post, put, delete, patch
router.route('/setHiddenBoats').post(setHiddenBoats);

module.exports = router;
