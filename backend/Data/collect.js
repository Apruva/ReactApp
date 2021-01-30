const { json } = require('express');
const fetch = require('node-fetch'); // nodeJS fetch lib
const { update } = require('../model/Currency');
const Currency = require('../model/Currency'); // model schema for Currency doc
/*a asynchronous function that fetches third-party API data, and use its 
data to create a customized object that fits the schema, for so to empty the database and save the 
object to the DB*/

const CURRENCIES = [
	'CAD',
	'HKD',
	'ISK',
	'PHP',
	'DKK',
	'HUF',
	'CZK',
	'AUD',
	'RON',
	'SEK',
	'IDR',
	'INR',
	'BRL',
	'RUB',
	'HRK',
	'JPY',
	'THB',
	'CHF',
	'SGD',
	'PLN',
	'BGN',
	'TRY',
	'CNY',
	'NOK',
	'NZD',
	'ZAR',
	'USD',
	'MXN',
	'ILS',
	'GBP',
	'KRW',
	'MYR',
	'EUR',
];

const collectData = async () => {
	try {
		const promises = await Promise.all(
			CURRENCIES.map((country) =>
				fetch(
					`https://api.exchangeratesapi.io/latest?base=${country}`
				).then((response) => response.json())
			)
		);
		// maps over each result in the promises array and adds them to db
		promises.map((result) => {
			let newObj = {
				rates: result.rates,
				base: result.base,
				date: result.date,
			};
			let update = new Currency(newObj);
			update.save();
			console.log(newObj);
		});
	} catch (err) {
		console.log(err);
	}
};
module.exports = collectData;

// 		try {
// 			const url = 'https://api.exchangeratesapi.io/latest?base=';

// 			const response = fetch(url + country);
// 			const data = response.json();
// 			Object.keys(data.rates).forEach((k) => {
// 				const obj = {
// 					Symbol: k,
// 					Rate: data.rates[k],
// 					Base: data.base,
// 					Date: data.date,
// 				};
// 				const update = new Currency(obj);
// 				update.save();
// 				return;
// 			});
// 		} catch (err) {
// 			console.log(err);
// 		}

// };

// //fetches LATEST exchange rates from third-party api
// module.exports = async function collectData() {
// 	const apiUrl = 'https://api.exchangeratesapi.io/latest?';
// 	fetch(apiUrl)
// 		.then((res) => {
// 			return res.json();
// 		})
// 		.then((json) => {
// 			Object.keys(json.rates).forEach((k) => {
// 				const CurrencyObj = {
// 					Symbol: k,
// 					Rate: json.rates[k],
// 					Base: json.base,
// 					Date: json.date,
// 				};
// 				Currency.collection.deleteMany({}); // Rethink if emptying DB is necesarry, can be useful to track old currencies and rates?????
// 				const update = new Currency(CurrencyObj);
// 				update.save();
// 				return;
// 			});
// 			console.log(json);
// 		})
// 		.catch((error) => {
// 			return error;
// 		});
// };
