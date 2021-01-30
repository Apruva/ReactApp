import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PageviewIcon from '@material-ui/icons/Pageview';

export const HomeButton = () => {
	return (
		<Button color="secondary" endIcon={<Home />}>
			Home
		</Button>
	);
};

export const DocsButton = () => {
	return (
		<Button color="secondary" endIcon={<PageviewIcon />}>
			Docs
		</Button>
	);
};

export const LoginButton = () => {
	return (
		<Button color="secondary" endIcon={<LockIcon />}>
			Login
		</Button>
	);
};

export const RegisterButton = () => {
	return (
		<Button color="secondary" endIcon={<LockIcon />}>
			Register
		</Button>
	);
};
export const LogoutButton = () => {
	return (
		<Button color="secondary" endIcon={<LockOpenIcon />}>
			Logout
		</Button>
	);
};

export const ProfileButton = () => {
	//const user = useSelector((state) => authReducer.email);
	return (
		<Button color="secondary" endIcon={<PersonIcon color="secondary" />}>
			Profile
		</Button>
	);
};

export const LatestRatesButton = () => {
	return (
		<Button color="secondary" endIcon={<BarChartIcon />}>
			Latest
		</Button>
	);
};

export const HistoricalRatesButton = () => {
	return (
		<Button color="secondary" endIcon={<BarChartIcon />}>
			Historical
		</Button>
	);
};

export const ConverterButton = () => {
	return (
		<Button color="secondary" endIcon={<AttachMoneyIcon />}>
			Converter
		</Button>
	);
};
