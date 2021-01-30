export const changeTheme = (payload) => {
	return {
		type: 'CHANGE_THEME',
		payload: payload,
	};
};

export const changeFont = (payload) => {
	return {
		type: 'CHANGE_FONT',
		payload: payload,
	};
};
