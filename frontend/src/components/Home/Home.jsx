import { Typography, Paper, Container, Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import IMAGE_DESKTOP from '../../Image/desktop.jpg';
import IMAGE_MOBILE from '../../Image/mobile.jpg';
import { useWidthHook } from '../CustomHooks/useWidthHook';

export const Home = () => {
	const classes = useStyles();
	const email = useSelector((state) => state.authReducer.email);
	const { innerWidth, innerHeight } = useWidthHook();
	console.log(innerWidth, 'innerWidth');
	const mobileBreakPoint = useSelector(
		(state) => state.themeReducer.breakpoints.values.mobile
	);
	const isMobile = innerWidth <= mobileBreakPoint ? true : false;
	return (
		<Container maxWidth="xs">
			<Typography className={classes.text} variant="h4">
				Exchange Rates API
			</Typography>

			<div className={classes.div}>
				<Paper className={classes.paper}>
					{email ? (
						<Typography className={classes.text} variant="body1">
							Welcome, <strong>{email}!</strong>
							<br />
							You can now expore the content of this website by clicking on the{' '}
							<br />
							<u>hamburger menu</u> that contains documentation of how to use
							the API, <br />
							in addition to some example features that could be implemented.{' '}
							<br />
						</Typography>
					) : (
						<Typography className={classes.text} variant="body1">
							<strong>To use the API, please register and login!</strong>
						</Typography>
					)}
				</Paper>
				<div
					className={isMobile ? classes.image_mobile : classes.image_desktop}
					style={{ height: `${innerHeight}px`, width: `${innerWidth}px` }}
				/>
			</div>
		</Container>
	);
};

const useStyles = makeStyles((theme) => ({
	image_mobile: {
		backgroundImage: `url(${IMAGE_DESKTOP})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center, center',
		alignItems: 'center',
		maxWidth: '540px',
		maxHeight: '960px',
		width: 'fit-content',
	},
	image_desktop: {
		backgroundImage: `url(${IMAGE_DESKTOP})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center, center',
		alignItems: 'center',
		maxWidth: '1000px',
		minWidth: '667px',
		width: 'fit-content',
	},
	paper: {
		padding: theme.spacing(1, 1),
		alignItems: 'center',
		justifyContent: 'space around',
		width: 'fit-content',
	},
	div: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'flex-start',
		width: '100%',
		alignItems: 'center',
		padding: theme.spacing(1, 1),
		margin: theme.spacing(1, 1),
	},
	text: {
		color: theme.palette.tertiary.main,
		padding: theme.spacing(1, 1),
		margin: theme.spacing(1, 1),
		textAlign: 'center',
	},
}));
