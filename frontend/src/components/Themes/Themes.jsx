import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

export const CurrentTheme = () => {
	const themeState = useSelector((state) => state.themeReducer);
	const theme = createMuiTheme({
		themeState,
	});
	return <CurrentTheme theme={theme}></CurrentTheme>;
};
