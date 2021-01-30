import { useSelector } from 'react-redux';
import { store } from '../../../Redux/store/index';
// constants which are synchronous actions that represent the stage during the execution of an async task
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

export const updateFromCurrencyValue = (payload) => {
	return {
		type: 'UPDATE_FROM_CURRENCY_VALUE',
		payload: payload,
	};
};

export const updateToCurrencyValue = (payload) => {
	return {
		type: 'UPDATE_TO_CURRENCY_VALUE',
		payload: payload,
	};
};

export const swapConvention = () => {
	return {
		type: 'SWAP_CONVENTION',
	};
};

export const fetchStart = () => {
	return {
		type: FETCH_START,
	};
};
export const fetchSuccess = (payload) => {
	return {
		type: FETCH_SUCCESS,
		payload: payload,
	};
};
export const fetchFail = (payload) => {
	return {
		type: FETCH_FAIL,
		payload: payload,
	};
};

export const countryChange = (payload) => {
	return {
		type: 'COUNTRY_CHANGE',
		payload: payload,
	};
};

export const calculateChange = (payload) => {
	return {
		type: 'UPDATE_RESULT',
		payload: payload,
	};
};

export const handleInputChange = (payload) => {
	return async (dispatch) => {
		dispatch(calculateChange(payload));
	};
};

// accepts fromCurr/toCurr as selected and the actual selected symbol
export const handleCountryChange = (symbol, selected) => {
	return async (dispatch) => {
		dispatch(countryChange(symbol, selected));
		dispatch(fetchConvention());
	};
};

export const fetchConvention = () => {
	return async (dispatch) => {
		dispatch(fetchStart());
		const jwt = store.getState().authReducer.jwt;
		const toCurr = store.getState().currency.toCurr.symbol;
		const fromCurr = store.getState().currency.fromCurr.symbol;
		try {
			const api_url =
				'api/v1/currencies/latest?' +
				new URLSearchParams({
					base: fromCurr,
					symbol: toCurr,
				});

			const opts = { headers: { authorizationToken: jwt } };
			const response = await fetch(api_url, opts);
			const data = await response.json();
			const rate = data.toCurr[toCurr];
			dispatch(updateToCurrencyValue(rate));
			dispatch(fetchSuccess(data));
		} catch (error) {
			dispatch(fetchFail('Could not get the data'));
		}
	};
};
