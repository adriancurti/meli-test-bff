const express = require('express');
const router = express.Router();
const config = require('../config');

// Middleware to use for all requests
router.use((request, response, next) => {
	console.log('Processing the request...');
	next();
});

router.get('/', (request, response) => {
	response.contentType('application/json').status(200);
	response.json({ result: 'The BFF is working correctly!', version: config.server.version });
	console.log(`The BFF is working correctly! - Version: ${config.server.version}`);
	response.end;
});

router.use('/currencies', require('./currencies'));
router.use('/items', require('./items'));

module.exports = router;