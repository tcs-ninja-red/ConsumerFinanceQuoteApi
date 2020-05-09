const express = require('express');

const controller = require('../../controllers/dealer.controller')
const router = express.Router();

router.route('/').get(controller.getDealers);

module.exports = router;
