import React from 'react';
import { Alert } from '@material-ui/lab';
import { Line } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
export const HistoryChart = (props) => {
	const classes = useStyles();
	const { historyData, error, isLoading } = props;
	// format the dates recieved from request
	const dates = historyData.map((date) => date.date.slice(0, -14));
	// make an unique array containing symbols
	let symbols = [];
	historyData.map((obj) => {
		Object.keys(obj.rates).map((rates) => {
			symbols.push(rates);
		});
	});
	symbols = [...new Set(symbols)];
	console.log(symbols);
	// array containing exchange rates
	let rates = [];
	historyData.map((obj) => {
		symbols.map((rate) => {
			rates.push(obj.rates[rate]);
		});
	});

	const data = {
		labels: symbols,
		datasets: [
			{
				label: dates[0],
				data: rates,
				fill: false,
				borderColor: '#7c4dff',
				backgroundColor: '#000000',
			},
		],
	};
	const options = {
		scales: {
			scalable: true,
		},
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: `Exchange Rates from ${dates[0]}`,
		},
	};
	return (
		<>
			<Typography className={classes.h3} variant="body1">
				The yAxis represents the exchange rate (quoted by euro) of each country
				listed in the xAxis.
				<br />
				Hover or click (if mobile) on the dots to see the specific amount.
				<br />
				Dataset includes rates back to 1999 until todays/yesterdays date.
			</Typography>
			{error && <Alert severity="warning">{error}</Alert>}
			{isLoading && <Alert severity="info">Loading...</Alert>}
			{data && <Line data={data} options={options} />}
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	h3: {
		color: theme.palette.fortiary.main,
	},
}));
