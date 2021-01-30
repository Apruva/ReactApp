import React from 'react';
import { Link } from 'react-router-dom';
import {
	HomeButton,
	LoginButton,
	DocsButton,
	RegisterButton,
} from '../Buttons/Buttons';
import Grid from '@material-ui/core/Grid';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core/';

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

export const AppBarUnauthenticated = () => {
	const classes = useStyles();
	return (
		<AppBar
			maxWidth="xs"
			className={classes.div}
			color="primary"
			position="static"
		>
			<Toolbar>
				<Grid item xs={12} sm={6} className={classes.grid}>
					<Link to="/Home">
						<HomeButton />
					</Link>
				</Grid>
				<Grid item xs={12} sm={6} className={classes.grid}>
					<Link to="/Login">
						<LoginButton />
					</Link>
				</Grid>

				<Grid item xs={12} sm={6} className={classes.grid}>
					<Link to="/Register">
						<RegisterButton />
					</Link>
				</Grid>

				<Grid item xs={12} sm={6} className={classes.grid}>
					<Link to="/Docs">
						<DocsButton />
					</Link>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
