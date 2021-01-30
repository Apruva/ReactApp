import { combineReducers } from 'redux';
import historyReducer from './historyReducer';
import themeReducer from './themeReducer';
import authReducer from './authReducer';
import currencyConverterReducer from './currencyConverterReducer';
import fetchLatestReducer from './fetchLatestReducer';

const rootReducer = combineReducers({
	themeReducer,
	authReducer,
	latest: fetchLatestReducer,
	history: historyReducer,
	currency: currencyConverterReducer,
});

export default rootReducer;
