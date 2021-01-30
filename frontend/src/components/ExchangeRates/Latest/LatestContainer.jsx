import { store } from '../../../Redux/store/index';
// constants which are synchronous actions that represent the stage during the execution of an async task
export const FETCH_LATEST_START = 'FETCH_LATEST_START';
export const FETCH_LATEST_SUCCESS = 'FETCH_LATEST_SUCCESS';
export const FETCH_LATEST_FAIL = 'FETCH_LATEST_FAIL';
export const CHANGE_BASE_LATEST = 'CHANGE_BASE_LATEST';
export const fetchStart = () => {
	return {
		type: FETCH_LATEST_START,
	};
};
export const fetchSuccess = (payload) => {
	return {
		type: FETCH_LATEST_SUCCESS,
	};
};
export const fetchFail = (payload) => {
	return {
		type: FETCH_LATEST_FAIL,
		payload: payload,
	};
};

export const updateBase = (payload) => {
	return {
		type: CHANGE_BASE_LATEST,
		payload: payload,
	};
};

export const addLatestData = (payload) => {
	return {
		type: 'ADDING_DATA',
		payload: payload,
	};
};
export const handleChange = (payload) => {
	return async (dispatch) => {
		dispatch(updateBase(payload));
		dispatch(fetchLatest());
	};
};
export const fetchLatest = () => {
	return async (dispatch) => {
		dispatch(fetchStart());
		const stateBase = store.getState().latest.base;
		const jwt = store.getState().authReducer.jwt;
		try {
			const api_url = `/api/v1/currencies/latest?base=${stateBase}`;
			const opts = {
				headers: {
					authorizationToken: jwt,
				},
			};
			const resp = await fetch(api_url, opts);
			const data = await resp.json();

			dispatch(addLatestData(data));

			dispatch(fetchSuccess());
			return;
		} catch (error) {
			dispatch(fetchFail('Could not get the data'));
		}
	};
};
