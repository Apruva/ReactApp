import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setInnerWidth } from '../../Redux/actions/responsiveActions';
import { changeFont } from '../../Redux/actions/themeActions';

// custom hook that can be used to conditionally render mobile/desktop components
export const useWidthHook = () => {
	const dispatch = useDispatch();
	const innerWidth = window.innerWidth;
	const innerHeight = window.innerHeight;
	const mobileBreakPoint = useSelector(
		(state) => state.themeReducer.breakpoints.values.mobile
	);
	useEffect(() => {
		const handleWidthChange = () => {
			const innerWidth = window.innerWidth;
			const innerHeight = window.innerHeight;
			if (innerWidth < mobileBreakPoint) {
				dispatch(setInnerWidth({ innerWidth, innerHeight, isMobile: true }));
				dispatch(changeFont({ fontSize: 10 }));
			} else {
				dispatch(setInnerWidth({ innerWidth, innerHeight, isMobile: false }));
				dispatch(changeFont({ fontSize: 14 }));
			}
		};
		window.addEventListener('resize', handleWidthChange);
		return () => window.removeEventListener('resize', handleWidthChange);
	}, []);
	return { innerWidth, innerHeight };
};
