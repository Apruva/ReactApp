const initState = {
	isLoading: false,
	error: null,
	data: null,
	requestAmount: null,
};

const historyReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_HISTORY_START':
			return {
				...state,
				isLoading: true,
			};

		case 'FETCH_HISTORY_SUCCESS':
			return {
				...state,
				isLoading: false,
				requestAmount: state.requestAmount + 1,
				data: action.payload,
			};
		case 'FETCH_HISTORY_FAIL':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default historyReducer;
