import React from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PageviewIcon from '@material-ui/icons/Pageview';

const LABELS = [
	{ label: 'Latest Rates', path: '/Latest', icon: <BarChartIcon /> },
	{ label: 'Historical Rates', path: '/Historical', icon: <BarChartIcon /> },
	{ label: 'Converter', path: '/Converter', icon: <AttachMoneyIcon /> },
	{ label: 'Documentation', path: '/Docs', icon: <PageviewIcon /> },
];

export default LABELS;
