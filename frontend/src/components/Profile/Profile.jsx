import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, makeStyles, Avatar } from '@material-ui/core';
import { RequestGraph } from './RequestGraph';
import { WeatherWidget } from './WeatherWidget';
export const Profile = () => {
	const reqAmountConverter = useSelector(
		(state) => state.currency.requestAmount
	);
	const reqAmountHistory = useSelector((state) => state.history.requestAmount);
	const reqAmountLatest = useSelector((state) => state.latest.requestAmount);
	const email = useSelector((state) => state.authReducer.email);
	const classes = useStyles();
	return (
		<Container maxWidth="xs">
			<div className={classes.div}>
				<Avatar className={classes.avatar} />
				{email}
			</div>
			<Paper className={classes.paper}></Paper>

			<div className={classes.graph}>
				<RequestGraph
					
					reqAmountConverter={reqAmountConverter}
					reqAmountHistory={reqAmountHistory}
					reqAmountLatest={reqAmountLatest}
				/>
			</div>
		</Container>
	);
};

const useStyles = makeStyles((theme) => ({
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
	avatar: {
		margin: theme.spacing(1),
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
	},
	graph: {
		width: '350px',
	},
}));
