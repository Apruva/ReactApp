import React from 'react';
import { AppAuthenticated } from './App/AppAuthenticated';
import { AppUnauthenticated } from './App/AppUnauthenticated';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

function App() {
	const currentTheme = useSelector((state) => state.themeReducer);
	const theme = createMuiTheme(currentTheme);

	const isAuth = useSelector((state) => state.authReducer.jwt);
	console.log(isAuth);
	//const jwt = localStorage.getItem('jwt');

	return isAuth ? (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppAuthenticated />
		</ThemeProvider>
	) : (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppUnauthenticated />
		</ThemeProvider>
	);
}
export default App;
