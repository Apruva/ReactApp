import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { MenuItem, Menu, IconButton, Typography } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import LABELS from './exports';
export const HamburgerMenu = () => {
	let history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleMenuClose = (path) => {
		setAnchorEl(null);
		history.push(path);
	};
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<div>
			<IconButton onClick={handleMenu}>
				<MenuIcon color="secondary" />
			</IconButton>
			<Menu
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				transformOrigin={{ vertical: 'top', horizontal: 'center' }}
				keepMounted
				anchorEl={anchorEl}
				open={open}
				onClose={handleMenuClose}
			>
				{LABELS.map((element, index) => (
					<MenuItem
						variant="contained"
						color="secondary"
						key={index}
						onClick={() => handleMenuClose(element.path)}
					>
						<Typography>
							{element.icon}
							{element.label}
						</Typography>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
