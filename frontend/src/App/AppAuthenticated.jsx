import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AppBarAuthenticated } from '../components/AppBar/AppBarAuthenticated';
import { Home } from '../components/Home/Home';
import { Logout } from '../components/Logout/Logout';

import { Docs } from '../components/Docs/Docs';
import { Latest } from '../components/ExchangeRates/Latest/Latest';
import { Historical } from '../components/ExchangeRates/Historical/Historical';
import { CurrencyConverter } from '../components/ExchangeRates/Converter/CurrencyConverter.jsx';
import { ThemeButton } from '../components/Buttons/ThemeButton';
import { Profile } from '../components/Profile/Profile';
export const AppAuthenticated = () => {
	return (
		<Router>
			<AppBarAuthenticated />
			<Switch>
				<Route exact path="/Home" component={Home} />
				<Route exact path="/Docs" component={Docs} />
				<Route exact path="/Latest" component={Latest} />
				<Route exact path="/Historical" component={Historical} />
				<Route exact path="/Converter" component={CurrencyConverter} />
				<Route exact path="/Logout" component={Logout} />
				<Route exact path="/Profile" component={Profile} />
				<Route path="/" component={Home} />
			</Switch>
			<ThemeButton />
		</Router>
	);
};
