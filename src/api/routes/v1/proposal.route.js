const express = require('express');
const controller = require('../../controllers/proposal.controller');
const router = express.Router();

router.use(express.json());    // <==== parse request body as JSON

router.route('/').post(controller.createProposal);

module.exports = router;
