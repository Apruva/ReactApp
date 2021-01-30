import React, { useEffect } from 'react';

import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { changeTheme } from '../../Redux/actions/themeActions';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	themebutton: {
		position: 'fixed',
		left: '50%',
		bottom: '0',
		height: '50px',
		color: theme.palette.fortiary.main,
		width: 'fit-content',
	},
	div: {
		display: 'block',
		padding: '10px',
		height: '50px',
		width: '100%',
	},
}));

export const ThemeButton = () => {
	const isLight = useSelector((state) => state.themeReducer.status);
	const dispatch = useDispatch();
	const classes = useStyles();
	return (
		<div className={classes.div}>
			<IconButton
				className={classes.themebutton}
				onClick={
					isLight
						? () =>
								dispatch(
									changeTheme({
										type: 'dark',
										primary: {
											main: '#1f2422',
										},
										secondary: {
											main: '#3bf7cf',
										},
										tertiary: {
											main: '#ffffff',
										},
										fortiary: {
											main: '#3bf7cf',
										},
									})
								)
						: () =>
								dispatch(
									changeTheme({
										type: 'light',
										primary: {
											main: '#7c4dff',
										},
										secondary: {
											main: '#ffffff',
										},
										tertiary: {
											main: '#7c4dff',
										},
										fortiary: {
											main: '#7c4dff',
										},
									})
								)
				}
			>
				{isLight ? <Brightness7Icon /> : <Brightness5Icon />}
			</IconButton>
		</div>
	);
};
