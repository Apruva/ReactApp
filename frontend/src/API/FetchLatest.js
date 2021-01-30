import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchLatestFail,
	fetchLatestStart,
	fetchLatestSuccess,
} from '../Redux/actions/fetchActions';

export const FetchLatest = () => {
	const dispatch = useDispatch();
	const jwt = useSelector((state) => state.authReducer.jwt);
	useEffect(() => {
		async function fetchData() {
			dispatch(fetchLatestStart());
			try {
				const api_url = 'http://localhost:3001/api/v1/currencies/latest/';
				const opts = {
					method: 'GET',
					headers: {
						authorizationToken: `${jwt}`,
					},
				};
				const response = await fetch(api_url, opts);
				const json = await response.json();
				dispatch(fetchLatestSuccess(json));
			} catch (error) {
				dispatch(fetchLatestFail(error.message));
			}
		}
		fetchData();
	}, []);
	return null;
};
