const express = require('express'); // Loading module
const app = express(); // Creating the Express application
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config(); // import and initiate dotenv module - env variables is accessed by process.env.VARIABLENAME
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => {
		console.log(
			`connected to MongoDB using Mongoose ${mongoose.version} | status: ${
				mongoose.STATES[mongoose.connection.readyState]
			}`
		);
	}
);

app.use(morgan('dev')); // Logging utility
app.use(express.json()); // Makes it possible to read JSON data from requests
app.use(cors());

const hist = require('./Data/collectHistory');
const setup = async () => {
	const status = false;
	if (status === true) {
		hist();
	}
};
setup();

// Update function
const collect = require('./Data/collect');
const setupLatest = async () => {
	const status = false; // true = update on save, false = ignore
	if (status === true) {
		(await collect()) && console.log('fetching latest data');
	}
	return false;
};
//setInterval(updateDB, 86400000); // use setinterval 1 day in milliseconds when production
setupLatest();

const authRoute = require('./routes/authorize'); // Import route
app.use('/api/v1/', authRoute); // Middleware that tells Express to use run authorize each time /register endpoint is requested

const dataRoute = require('./routes/data');
const validate = require('./checkToken');

app.use('/api/v1/currencies', validate, dataRoute);

// route middleware for all the routes that authorized users can use, e.g. delete/unsubscribe account, update profile data etc.
// const userProfile = require('./routes/userprofileroutes');
// app.use('/api/v1/profile', validate, userProfile);

// app.use('*', (req, res) => {
// 	//Redirect all non-existent urls
// 	res.redirect('127.0.0.1/home');
// });

// Listen to port
app.listen(process.env.DEV_PORT || process.env.PROD_PORT, () => {
	console.log('server is listening');
});
