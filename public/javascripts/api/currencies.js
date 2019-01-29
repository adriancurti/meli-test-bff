const request = require('request');
const config = require('../../../config');
const util = require('../util');

const close = (statusCode, data, response) => {
    console.log(data);
    if (response.statusMessage === undefined) {
        response.contentType('application/json').status(statusCode);
        response.json(data);
    }
};

const getItems = (binds, response) => {
    let statusCode = 0;
    let data = [];

    const path = `public/data/currencies.json`;
    let currencies = util.existJsonFile(path) ? util.readJsonFile(path) : [];

    let url = `${config.api.url}/currencies`;
    request(url, (error, meliResponse, body) => {
        if (error) {
            if (currencies.length > 0) {
                statusCode = 200;
                data = currencies;
            } else {
                statusCode = 500;
                data = { message: `Oops! An error occurred in the Web Service: ${error}` };
            }
            close(statusCode, data, response);
        }
        if (!error && meliResponse.statusCode === 200) {
            data = JSON.parse(body);
            if (util.saveJsonFile(path, data, 'Currencies')) {
                statusCode = 200;
            } else {
                statusCode = 500;
            }
            close(statusCode, data, response);
        }
    });
};

const open = (binds, response, action) => {
    switch (action) {
        case 'getItems':
            getItems(binds, response);
            break;
    }
}

exports.open = open;