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
    let data = {
        author: {
            name: 'Adrian', // Hard-coded
            lastname: 'Curti' // Hard-coded
        },
        categories: [],
        items: []
    };

    const path = `public/data/currencies.json`;
    let currencies = util.existJsonFile(path) ? util.readJsonFile(path) : [];

    let params = `?q=${binds.query}`;
    let url = `${config.api.url}/sites/MLA/search${params}`;
    request(url, (error, meliResponse, body) => {
        if (error) {
            statusCode = 500;
            data = { message: `Oops! An error occurred in the Web Service: ${error}` };
            close(statusCode, data, response);
        }
        if (!error && meliResponse.statusCode === 200) {
            const meliData = JSON.parse(body);
            const filters = meliData.filters;
            for (let filter of filters) {
                if (filter.id === 'category') {
                    const values = filter.values;
                    for (let value of values) {
                        if (value.path_from_root) {
                            const categories = value.path_from_root;
                            for (let category of categories) {
                                data.categories.push(category.name);
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            const results = meliData.results.slice(0, 4);
            for (let result of results) {
                const currency = currencies.filter(currency => currency.id === result.currency_id);
                const price = result.price ? result.price.toString().split('.') : [0, 0];
                const amount = parseInt(price[0]);
                const decimals = price.length === 2 ? parseInt(price[1]) : 0;
                let item = {
                    id: result.id,
                    title: result.title,
                    price: {
                        currency: currency.length > 0 ? currency[0].symbol : result.currency_id,
                        amount: amount,
                        decimals: decimals >= 10 ? decimals : parseInt(decimals + '0')
                    },
                    picture: result.thumbnail ? result.thumbnail.replace('http:', 'https:').replace('-I.', '-O.') : '',
                    condition: result.condition,
                    free_shipping: result.shipping.free_shipping,
                    address: result.address.state_name
                };
                data.items.push(item);
            }
            statusCode = 200;
            close(statusCode, data, response);
        }
    });
};

const getItem = (binds, response) => {
    let statusCode = 0;
    data = {
        author: {
            name: 'Adrian', // Hard-coded
            lastname: 'Curti' // Hard-coded
        },
        item: {}
    };

    const path = `public/data/currencies.json`;
    let currencies = util.existJsonFile(path) ? util.readJsonFile(path) : [];

    let url = `${config.api.url}/items/${binds.id}`;
    request(url, (error, meliResponse, body) => {
        if (error) {
            statusCode = 500;
            data = { message: `Oops! An error occurred in the Web Service: ${error}` };
            close(statusCode, data, response);
        }
        if (!error && meliResponse.statusCode === 200) {
            let meliData = JSON.parse(body);
            const item = meliData;
            const currency = currencies.filter(currency => currency.id === item.currency_id);
            const price = item.price ? item.price.toString().split('.') : [0, 0];
            const amount = parseInt(price[0]);
            const decimals = price.length === 2 ? parseInt(price[1]) : 0;
            data.item = {
                id: item.id,
                title: item.title,
                price: {
                    currency: currency.length > 0 ? currency[0].symbol : item.currency_id,
                    amount: amount,
                    decimals: decimals >= 10 ? decimals : parseInt(decimals + '0')
                },
                picture: item.thumbnail ? item.thumbnail.replace('http:', 'https:').replace('-I.', '-O.') : '',
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity,
                description: 'Ninguna'
            };
            statusCode = 200;

            url = `${config.api.url}/items/${binds.id}/description`;
            request(url, (error, meliResponse, body) => {
                if (error) {
                    close(statusCode, data, response);
                }
                if (!error && meliResponse.statusCode === 200) {
                    meliData = JSON.parse(body);
                    data.item.description = meliData.plain_text;
                    close(statusCode, data, response);
                }
            });
        }
    });
};

const open = (binds, response, action) => {
    switch (action) {
        case 'getItems':
            getItems(binds, response);
            break;
        case 'getItem':
            getItem(binds, response);
            break;
    }
}

exports.open = open;