const express = require('express');
const controller = require('../../controllers/quote.controller');
const router = express.Router();

router.use(express.json());    // <==== parse request body as JSON

router.route('/').post(controller.generateQuote);

module.exports = router;
