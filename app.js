const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv').config();
const config = require('./config');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(serveStatic(path.join(__dirname, 'public')));

app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Methods', 'GET');
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log('A new request arrived at the BFF...');
	next();
});

app.use('/api', routes);

http.createServer(app).listen(config.server.port);

console.log(`Environment: ${config.server.environment}`);

if (config.server.environment === 'development') {
	console.log(`Meli Test BFF serving at ${config.server.protocol}://${config.server.host}:${config.server.port}`);
} else {
	console.log(`Meli Test BFF serving at ${config.server.host}`);
}