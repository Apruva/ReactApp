const fetch = require('node-fetch');
const History = require('../model/History');

module.exports = async function collectHistory() {
	const api_url =
		'https://api.exchangeratesapi.io/history?start_at=1999-01-01&end_at=2020-09-30';
	fetch(api_url)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			let count = 0;
			for (const prop in json.rates) {
				count++;
				let date = new Date(prop);
				const historyObj = {
					date: date,
					rates: json.rates[prop],
				};
				const update = new History(historyObj);
				console.log('fetching history', count);
				update.save();
			}
		})
		.catch((error) => {
			return error;
		});
};
