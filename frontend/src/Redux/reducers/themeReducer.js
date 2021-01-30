const initState = {
	display: [],
	palette: {
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
	},
	typography: {
		fontSize: 14,
	},

	breakpoints: {
		values: {
			mobile: 640,
			laptop: 1024,
			desktop: 1280,
		},
	},
};

const themeReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CHANGE_THEME':
			return {
				...state,
				status: !state.status,
				palette: { ...action.payload },
			};

		case 'SET_INNER_WIDTH':
			return {
				...state,
				display: [action.payload],
			};
		case 'CHANGE_FONT':
			return {
				...state,
				typography: action.payload,
			};

		default:
			return state;
	}
};

export default themeReducer;
