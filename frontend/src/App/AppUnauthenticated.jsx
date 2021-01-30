import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AppBarUnauthenticated } from '../components/AppBar/AppBarUnauthenticated';
import { Home } from '../components/Home/Home';
import { Login } from '../components/Login/Login';
import { Docs } from '../components/Docs/Docs';
import { Register } from '../components/Register/Register';
import { ThemeButton } from '../components/Buttons/ThemeButton';

export const AppUnauthenticated = () => {
	return (
		<Router>
			<AppBarUnauthenticated />

			<Switch>
				<Route exact path="/Home" component={Home} />
				<Route exact path="/Docs" component={Docs} />
				<Route exact path="/Login" component={Login} />
				<Route exact path="/Register" component={Register} />
				<Route path="/" component={Home} />
			</Switch>
			<ThemeButton />
		</Router>
	);
};
