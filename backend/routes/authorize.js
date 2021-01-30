const router = require('express').Router(); // import module and create the Router() object
const User = require('../model/User'); // import the User Model
const Bcrypt = require('bcryptjs'); // hashing lib
const { regValidation, loginValidation } = require('../validation'); // importing multiple validation functions
const JWT = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
	const { error } = regValidation(req.body);
	console.log(req.body);
	if (error) return res.status(409).send(error.details[0].message);
	const emailExist = await User.findOne({ email: req.body.email }); // checks if email already exists by querying db
	if (emailExist) return res.status(409).json({ error: 'email is taken' });
	// create User object by accessing request object AFTER validation is performed
	if (req.body.password !== req.body.confirm_password)
		return res.status(409).send('password need to match');
	// hash pass
	const salt = await Bcrypt.genSalt(10); // generate salt
	const hashedPass = await Bcrypt.hash(req.body.password, salt); // hash password with salt
	const user = new User({
		email: req.body.email,
		password: hashedPass, // add hashed password to user object
	});
	try {
		await user.save(); // save user object to db
		return res.status(201).json({ message: 'registered', user: user.email });
	} catch (error) {
		return res.status(404).json(error);
	}
});

router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body); // run the validation scheme against the request body
	if (error) return res.status(401).json(error.details[0].message);
	const usr = await User.findOne({ email: req.body.email }); // check if user is in the db
	if (!usr)
		return res.status(401).json({ error: 'Email or password is incorrect' });
	const valid = await Bcrypt.compare(req.body.password, usr.password); // compare plain-text and hash
	if (!valid)
		return res.status(401).json({ error: 'Email or password is incorrect' });

	const token = JWT.sign({ _id: usr.id }, process.env.SECRET_TOKEN, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return res
		.status(201)
		.header('authorizationToken', token)
		.json({ authorizationToken: token, id: usr.id });
});

module.exports = router;
