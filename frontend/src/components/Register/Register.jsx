import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
/// Validation packages
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
//import { useDispatch } from 'react-redux';

const RegisterSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Field required'),
	password: Yup.string()
		.required('Field required')
		.min(15, 'Must be minimum 12 characters')
		.max(40, 'Cannot exceed 40 characters')
		.matches(/(?=.*[0-9])/, 'Must contain a number.'),
	confirm_password: Yup.string()
		.required('Field required')
		.min(15, 'Must be minimum 12 characters')
		.max(40, 'Cannot exceed 40 characters')
		.matches(/(?=.*[0-9])/, 'Must contain a number.') // regex, must contain a number
		.oneOf([Yup.ref('password'), null], 'Field must match'),
});

export const Register = (props) => {
	const { register, handleSubmit, errors, reset, setError } = useForm({
		resolver: yupResolver(RegisterSchema),
	});
	const classes = useStyles();

	const onSubmit = async (data) => {
		try {
			const url = '/api/v1/register';
			const opts = {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			};
			const response = await fetch(url, opts);
			const json = await response.json();
			if (!response.ok) {
				setError('error', {
					message: `Server side validation failed, try again!`,
					code: response.status,
				});
				return false;
			} else if (json.message !== 'registered') {
				setError('error', {
					message: `Server side validation failed. Try again! `,
					code: response.status,
				});
				return false;
			} else if (json.error) {
				setError('error', {
					message: `Server side validation failed. Try again! `,
					code: response.status,
				});
				return false;
			}
			// dispatch user and auto-login?
			props.history.push('/Login');
			return true;
		} catch (error) {
			reset({});
		}
	};

	return (
		<Container maxWidth="xs">
			<div className={classes.div}>
				<Avatar className={classes.avatar} />
				<Typography className={classes.h3} variant="h5">
					Register
				</Typography>

				<Link to="Login">
					<Typography className={classes.info} variant="body1">
						Already have an account?
					</Typography>
				</Link>
			</div>
			<Paper className={classes.paper}>
				<form className={classes.form} noValidate>
					{errors.error && (
						<Alert className={classes.alert} severity="error">
							<AlertTitle>
								<strong>STATUS CODE {errors.error.code}</strong>
							</AlertTitle>
							{errors.error.message}
						</Alert>
					)}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="email"
								variant="standard"
								required
								fullWidth
								id="email"
								label="Email"
								autoFocus
								inputRef={register}
								error={Boolean(errors.email)}
								helperText={errors.email ? errors.email.message : ''}
								autoComplete="email"
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								name="password"
								variant="standard"
								required
								fullWidth
								id="password"
								label="Password"
								type="password"
								inputRef={register}
								error={Boolean(errors.password)}
								helperText={errors.password ? errors.password.message : ''}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								name="confirm_password"
								variant="standard"
								required
								fullWidth
								id="confirm_password"
								label="Confirm Password"
								type="password"
								inputRef={register}
								error={Boolean(errors.confirm_password)}
								helperText={
									errors.confirm_password ? errors.confirm_password.message : ''
								}
							/>
						</Grid>
					</Grid>
				</form>

				<Button
					onClick={handleSubmit(onSubmit)}
					type="submit"
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					Register
				</Button>
			</Paper>
		</Container>
	);
};

const useStyles = makeStyles((theme) => ({
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
	},
	avatar: {
		margin: theme.spacing(1),
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: 'fit-content',
		margin: theme.spacing(3),
		marginTop: theme.spacing(8),
	},

	submit: {
		margin: theme.spacing(3, 0, 3),
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
	},
	h3: {
		color: theme.palette.tertiary.main,
	},
	info: {
		color: theme.palette.tertiary.main,
		borderBottom: `1px solid ${theme.palette.tertiary.main}`,
	},
	error: {
		color: theme.palette.error.main,
	},
	alert: {
		margin: theme.spacing(3),
	},
}));
