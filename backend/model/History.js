const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
	rates: {
		type: Object,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('History', historySchema);
