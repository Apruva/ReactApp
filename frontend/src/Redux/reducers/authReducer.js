let initState = {};
const authReducer = (state = initState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, ...action.payload };
		case 'LOGOUT':
			return initState;

		default:
			return state;
	}
};

export default authReducer;
