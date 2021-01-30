const JWT = require('jsonwebtoken');

// middleware that protects private routes that checks if token is existent - and only allow logged in users access
const checkToken = (req, res, next) => {
	const token = req.header('authorizationToken');
	if (!token) return res.status(401).send('a valid token is required'); // checks if no token is inplace
	try {
		const verified = JWT.verify(token, process.env.SECRET_TOKEN); // if token is existent, verify the user token with the access token
		req.usr = verified;
		return next(); // calls next and jumps to next middleware if valid token
	} catch (err) {
		return res.status(400).send('invalid token');
	}
};
module.exports = checkToken;
