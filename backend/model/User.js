const mongoose = require('mongoose');
// defining schema
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		min: 3,
		max: 320,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 12,
		max: 1024,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
// export and create model
module.exports = mongoose.model('User', userSchema); // creating a model
