// const router = require('express').Router();
// const User = require('../model/User'); // import the User Model
// const { loginValidation } = require('../validation');

// router.delete('/unsubscribe/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const userExist = await User.findById({ _id: id });
// 		if (!userExist) return res.status(400).json({ serror: 'Error' });
// 		const { error } = loginValidation(req.body);
// 		if (error) return res.status(401).json(error.details[0].message);
// 		const valid = await Bcrypt.compare(req.body.password, id.password); // compare plain-text and hash
// 		if (!valid)
// 			return res.status(401).json({ error: 'Email or password is incorrect' });
// 		await User.findByIdAndDelete({ _id: id });
// 		return res.status(200).json({ msg: 'user deleted' });
// 	} catch (error) {
// 		return res.status(400).json(error);
// 	}
// });

// router.get('/:id', async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		console.log(id);
// 		const user = await User.findById({ _id: id });
// 		console.log(user);
// 		if (!user) return res.status(400).json({ error: error });
// 		return res.status(200).json({ email: user.email, id: user.id });
// 	} catch (error) {
// 		return res.status(400).json(error);
// 	}
// });

module.exports = router;
