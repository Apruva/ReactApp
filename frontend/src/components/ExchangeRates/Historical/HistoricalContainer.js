import { store } from '../../../Redux/store/index';

const fetchHistoryStart = () => {
	return {
		type: 'FETCH_HISTORY_START',
	};
};
const fetchHistoryFail = (payload) => {
	return {
		type: 'FETCH_HISTORY_FAIL',
		payload: payload,
	};
};
const fetchHistorySuccess = (payload) => {
	return {
		type: 'FETCH_HISTORY_SUCCESS',
		payload: payload,
	};
};

export const fetchHistory = (date) => {
	return async (dispatch) => {
		try {
			console.log(date);
			dispatch(fetchHistoryStart());
			const jwt = store.getState().authReducer.jwt;
			const url = `/api/v1/currencies/history?date=${date}`;
			const opts = { headers: { authorizationToken: jwt } };
			console.log(url);
			const res = await fetch(url, opts);
			console.log(res);
			const json = await res.json();
			if (Object.keys(json).length < 0)
				dispatch(fetchHistoryFail('No data found'));
			dispatch(fetchHistorySuccess([json]));
		} catch (error) {
			dispatch(fetchHistoryFail(error));
		}
	};
};
