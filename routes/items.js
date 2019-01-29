const express = require('express');
const router = express.Router();
const api = require('../public/javascripts/api/items');

// Middleware that is specific to this router
router.use((request, response, next) => {
    console.log('Processing the request in Items route...');
    next();
});

router.get('/', (request, response) => {
    console.log('Query: ', request.query);

    let binds = {};
    if (request.query.q) {
        binds.query = request.query.q;
    }

    api.open(binds, response, 'getItems');
    response.end;
});

router.get('/:id', (request, response) => {
    console.log('Params: ', request.params);

    let binds = {};
    binds.id = request.params.id;

    api.open(binds, response, 'getItem');
    response.end;
});

module.exports = router;