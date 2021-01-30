import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';
/// Validation packages
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { loginAction } from '../../Redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Field required'),
	password: Yup.string()
		.required('Field required')
		.min(15, 'Must be minimum 12 characters')
		.max(40, 'Cannot exceed 40 characters')
		.matches(/(?=.*[0-9])/, 'Must contain a number.'),
});

export const Login = (props) => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const { register, handleSubmit, errors, reset, setError } = useForm({
		resolver: yupResolver(LoginSchema),
	});

	const onSubmit = async (data) => {
		try {
			const url = '/api/v1/login'; // express proxy
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
					message: `Email or password is invalid, please try again! `,
					code: response.status,
				});
				return false;
			} else if (json.error) {
				setError('error', {
					message: `Email or password is invalid, please try again! `,
					code: response.status,
				});
				return false;
			} else if (!json.authorizationToken) {
				setError('error', {
					message: `Email or password is invalid, please try again!`,
					code: response.status,
				});
				return false;
			}

			//localStorage.setItem('jwt', json.authorizationToken);
			const user = {
				// id: json.id,
				email: data.email,
				jwt: json.authorizationToken,
			};
			dispatch(loginAction(user));
			props.history.push('/');
		} catch (error) {
			reset({});
		}
	};

	return (
		<Container maxWidth="xs">
			<Paper className={classes.paper}>
				<div className={classes.div}>
					<Avatar className={classes.avatar} />
					<Typography className={classes.h3} variant="h5">
						Sign In
					</Typography>
					<Link to="Register">
						<Typography className={classes.info} variant="body1">
							Dont have an account?
						</Typography>
					</Link>
				</div>

				<form className={classes.form} noValidate>
					{errors.error && (
						<Alert className={classes.alert} severity="error">
							<AlertTitle>
								<strong>STATUS CODE {errors.error.code}</strong>
							</AlertTitle>
							{errors.error.message}
						</Alert>
					)}

					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								type="email"
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
								type="password"
								name="password"
								variant="standard"
								required
								fullWidth
								id="password"
								label="Password"
								inputRef={register}
								error={Boolean(errors.password)}
								helperText={errors.password ? errors.password.message : ''}
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
					Login
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
		color: theme.palette.fortiary.main,
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
