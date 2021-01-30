const initstate = {
	requestAmount: null,
	base: 'EUR',
	data: null,
	isFetching: false,
	error: null,
};
const fetchLatestReducer = (state = initstate, action) => {
	switch (action.type) {
		case 'FETCH_LATEST_START':
			return { ...state, isFetching: !state.isFetching };
		case 'FETCH_LATEST_FAIL':
			return { ...state, isFetching: false, error: action.payload };
		case 'FETCH_LATEST_SUCCESS':
			return {
				...state,
				isFetching: false,
				error: null,
				requestAmount: state.requestAmount + 1,
			};
		case 'ADDING_DATA':
			return {
				...state,
				data: action.payload,
			};
		case 'CHANGE_BASE_LATEST':
			return {
				...state,
				base: action.payload,
			};
		default:
			return state;
	}
};
export default fetchLatestReducer;
