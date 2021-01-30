const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema({
	// Symbol: {
	// 	type: String,
	// 	required: true,
	// 	min: 2,
	// 	max: 3,
	// },
	rates: {
		type: Object,
		required: true,
	},
	base: {
		type: String,
		min: 2,
		max: 3,
		required: true,
	},
	date: {
		type: Date,
		default: true,
	},
});

module.exports = mongoose.model('Currencies', currencySchema);
