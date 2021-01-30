import React from 'react';
import { Link } from 'react-router-dom';
import { HomeButton, LogoutButton, ProfileButton } from '../Buttons/Buttons';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core/';
import { HamburgerMenu } from '../Menu/HamburgerMenu';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
	div: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'flex-start',
		width: '100%',
	},
	grid: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
}));

export const AppBarAuthenticated = (props) => {
	const classes = useStyles();
	return (
		<AppBar
			maxWidth="xs"
			className={classes.div}
			color="primary"
			position="static"
		>
			<Toolbar>
				<HamburgerMenu />

				<Grid item xs={12} sm={6} className={classes.grid}>
					<Link to="/Home">
						<HomeButton />
					</Link>
				</Grid>

				<Grid item xs={12} sm={6} className={classes.grid}>
					<Link to="/Profile">
						<ProfileButton />
					</Link>
				</Grid>

				<Grid item xs={12} sm={6} className={classes.grid}>
					<Link to="/Logout">
						<LogoutButton />
					</Link>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
