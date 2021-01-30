import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Container,
	Typography,
	Paper,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableHead,
	Select,
	MenuItem,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ALPHA_2 } from '../exports/ALPHA_2';
import { fetchLatest, handleChange } from './LatestContainer';
import { ALPHA_3 } from '../exports/ALPHA_3';
export const Latest = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.latest.data);
	const error = useSelector((state) => state.latest.error);
	const isFetching = useSelector((state) => state.latest.isFetching);
	const labels = ['Country', 'ISO 3166-1', 'Rate'];
	// index is used in the forEach method to iterate over item in ALPHA_2 array
	const defaultBase = useSelector((state) => state.latest.base);
	const countries = useSelector((state) => state.currency.countries);
	useEffect(() => {
		dispatch(fetchLatest());
	}, []);

	return (
		<Container maxWidth="xs">
			<Paper className={classes.paper}>
				<Typography variant="h5" className={classes.h3}>
					Latest Exchange Rates
					<Typography variant="body1" className={classes.h3}>
						Rates are quoted by Euro as default <br />
						Toggle the dropdown to change the base.
						{data && `Updated at ${data[0].date}`}
					</Typography>
				</Typography>
				{isFetching && (
					<Alert className={classes.alert} severity="info">
						<strong>Loading...</strong>
					</Alert>
				)}
				{error && (
					<Alert className={classes.alert} severity="error">
						<strong>{error}</strong>
					</Alert>
				)}
			</Paper>

			{data && (
				<Paper className={classes.root}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								{labels.map((item) => (
									<TableCell className={classes.cell} key={item}>
										{item}
									</TableCell>
								))}
								<TableCell className={classes.cell}>
									<Select
										value={defaultBase}
										onChange={(e) => {
											const payload = e.target.value;
											dispatch(handleChange(payload));
										}}
									>
										{countries.map((country) => (
											<MenuItem value={country}>
												{country}
												<img
													alt={country}
													src={`https://www.countryflags.io/${country.slice(
														0,
														-1
													)}/flat/32.png`}
												/>
											</MenuItem>
										))}
									</Select>
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{Object.keys(data[0].rates).map((i, index) => (
								<TableRow key={i._id}>
									<TableCell key={index} className={classes.cell}>
										<img
											id={index}
											alt={index}
											src={`https://www.countryflags.io/${countries[
												index
											].slice(0, -1)}/flat/32.png`}
										/>
									</TableCell>
									<TableCell className={classes.cell} key={countries[index]}>
										{countries[index]}
									</TableCell>

									<TableCell key={data[0].rates[i]} className={classes.cell}>
										{data[0].rates[i]}
									</TableCell>
									<TableCell key={i.base} className={classes.cell}>
										<img
											alt={i.base}
											src={`https://www.countryflags.io/${defaultBase.slice(
												0,
												-1
											)}/flat/32.png`}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			)}
		</Container>
	);
};

const useStyles = makeStyles((theme) => ({
	div: {
		marginTop: theme.spacing(2),

		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	paper: {
		marginTop: theme.spacing(2),

		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
	alert: {
		marginTop: theme.spacing(2),
	},
	h3: {
		color: theme.palette.fortiary.main,
		marginTop: theme.spacing(2),
		alignSelf: 'center',
	},
	progress: {
		color: theme.palette.fortiary.main,
	},
	root: {
		width: '100%',
		marginTop: theme.spacing(1),
		overflowX: 'auto',
	},
	table: {
		minWidth: 250,
	},
	cell: {
		marginLeft: 0,
		marginRight: 0,
		padding: 1,
		alignSelf: 'center',
	},
}));
