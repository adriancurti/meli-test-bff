const express = require('express');
const router = express.Router();
const api = require('../public/javascripts/api/currencies');

// Middleware that is specific to this router
router.use((request, response, next) => {
    console.log('Processing the request in Currencies route...');
    next();
});

router.get('/', (request, response) => {
    console.log('Query: ', request.query);

    let binds = {};

    api.open(binds, response, 'getItems');
    response.end;
});

module.exports = router;