import React from 'react';
import {
	MenuItem,
	Select,
	FormControl,
	makeStyles,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core/';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

export const Swapbutton = (props) => {
	const classes = useStyles();
	const { swapConvention } = props;
	return (
		<>
			<div className={classes.paper}>
				<IconButton
					className={classes.h3}
					variant="filled"
					onClick={swapConvention}
				>
					<SwapHorizIcon />
				</IconButton>
			</div>
		</>
	);
};

export const Input = (props) => {
	const classes = useStyles();
	const {
		fromCountryValue,
		fromCountry,
		toCountryValue,
		toCountry,
		handleInputChange,
		swapped,
	} = props;
	return (
		<>
			<TextField
				helperText={fromCountry}
				size="small"
				type="number"
				variant="filled"
				onChange={handleInputChange}
				value={fromCountryValue}
			></TextField>
			<br />
			{swapped ? (
				<Typography>
					{fromCountryValue} {fromCountry} = {fromCountryValue / toCountryValue}
					{toCountry}
				</Typography>
			) : (
				<Typography>
					{fromCountryValue} {fromCountry} = {toCountryValue * fromCountryValue}
					{toCountry}
				</Typography>
			)}
		</>
	);
};

export const Dropdown = (props) => {
	const classes = useStyles();
	const { countryOptions, selectedCountry, onChangeCountry } = props;
	return (
		<>
			<div className={classes.paper}>
				<FormControl className={classes.form}>
					<Select value={selectedCountry} onChange={onChangeCountry}>
						{countryOptions.map((country) => (
							<MenuItem value={country}>
								{country}{' '}
								<img
									src={`https://www.countryflags.io/${country.slice(
										0,
										2
									)}/flat/32.png`}
								/>
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		textAlign: 'center',
		marginBottom: theme.spacing(3),
	},
	form: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		width: '100px',
	},
	div: {
		margiTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	h3: {
		color: theme.palette.fortiary.main,
	},
	info: {
		color: theme.palette.tertiary.main,
		borderBottom: `1px solid ${theme.palette.tertiary.main}`,
	},
	displayResult: {
		marginLeft: theme.spacing(2),
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
}));
