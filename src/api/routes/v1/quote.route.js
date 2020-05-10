const express = require('express');
// Import our Controllers

const controller = require('../../controllers/quote.controller');

const router = express.Router();

router.use(express.json());    // <==== parse request body as JSON

router.route('/').post(controller.quote);

module.exports = router;
