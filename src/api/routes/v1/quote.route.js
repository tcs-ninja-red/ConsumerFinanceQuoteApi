const express = require('express');
const controller = require('../../controllers/quote.controller')
const router = express.Router();

router.route('/').post(controller.calculateQuote);

module.exports = router;
