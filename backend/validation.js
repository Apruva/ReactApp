// Request validation
const Joi = require('joi');
// validation function that accepts a parameter, which will be the req.body
const regValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(3).max(320).email().required(),
		password: Joi.string().min(12).max(1024).required(),
		confirm_password: Joi.string().min(12).max(1024).required(),
	});
	return schema.validate(data); // returning the validation
};
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(3).max(320).email().required(),
		password: Joi.string().min(12).max(1024).required(),
	});
	return schema.validate(data);
};

module.exports.regValidation = regValidation; // exporting single function
module.exports.loginValidation = loginValidation;
