const express = require('express');
const cors = require('cors');
const animalsRouter = require('./animal-router');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/animals', animalsRouter);

server.get('/', (req, res, next) => {
	res.status(200).json({
		message: "no worries we are up and running"
	});
});

server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		message: "something went wrong"
	});
});

module.exports = server;