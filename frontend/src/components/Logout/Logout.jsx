import { logoutAction } from '../../Redux/actions/userActions';
import { useDispatch } from 'react-redux';

export const Logout = (props) => {
	const dispatch = useDispatch();
	dispatch(logoutAction());
	props.history.push('/');

	return null;
};
