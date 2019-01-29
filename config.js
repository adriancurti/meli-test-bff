const server = {
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    protocol: process.env.MELI_TEST_BFF_SERVER_PROTOCOL,
    host: process.env.MELI_TEST_BFF_SERVER_HOST,
    port: process.env.PORT || process.env.MELI_TEST_BFF_SERVER_PORT,
    splitter: ','
};
const api = {
    url: process.env.MELI_TEST_BFF_API_URL
};

exports.server = server;
exports.api = api;