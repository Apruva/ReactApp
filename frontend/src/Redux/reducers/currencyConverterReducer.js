import { ALPHA_3 as COUNTRIES } from '../../components/ExchangeRates/exports/ALPHA_3';
const initState = {
	isLoading: false,
	fromCurr: { symbol: 'EUR', value: 1 },
	toCurr: { symbol: 'NOK', value: 0 },
	swapped: false,
	countries: COUNTRIES,
	requestAmount: null,
};

const currencyConverterReducer = (state = initState, action) => {
	switch (action.type) {
		case 'COUNTRY_CHANGE':
			return {
				...state,
				...action.payload,
			};

		case 'SWAP_CONVENTION':
			return {
				...state,
				swapped: !state.swapped,
				toCurr: {
					...state.fromCurr,
					value: state.toCurr.value,
				},
				fromCurr: { ...state.toCurr, value: state.fromCurr.value },
			};

		case 'UPDATE_RESULT':
			return {
				...state,
				fromCurr: { ...state.fromCurr, value: action.payload },
			};

		case 'UPDATE_FROM_CURRENCY_VALUE':
			return {
				...state,
				fromCurr: { ...state.fromCurr, value: action.payload },
			};
		case 'UPDATE_TO_CURRENCY_VALUE':
			return {
				...state,
				toCurr: { ...state.toCurr, value: action.payload },
			};

		case 'FETCH_START':
			return {
				...state,
				isLoading: true,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				data: action.payload,
				swapped: false,
				requestAmount: state.requestAmount + 1,
			};
		case 'FETCH_FAIL':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default currencyConverterReducer;
