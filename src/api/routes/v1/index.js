const express = require('express');

// import all the routes here
const vehicleRoute = require('./vehicle.route');
const dealerRoute = require('./dealer.route');
const quoteRoute = require('./quote.route');
const proposalRoute = require('./proposal.route');

const router = express.Router();

//GET v1/healthcheck
router.get('/healthcheck', (req, res) => {
	console.log('we are on healthcheck api');
	res.json({
		message: 'In Service',
		timestamp: new Date().toLocaleString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

router.use('/vehicles', vehicleRoute);
router.use('/dealers', dealerRoute);
router.use('/quotes', quoteRoute);
router.use('/proposals', proposalRoute);

module.exports = router;
