import React from 'react';
import {
  Grid,
  Paper,
  TextField,
  makeStyles,
  Button,
  InputLabel,
} from '@material-ui/core';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { fetchHistory } from './HistoricalContainer';

const DateSchema = Yup.object().shape({
  date: Yup.date().required().max(new Date()).min('01.01.1990'),
});

export const DatePicker = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(DateSchema),
  });
  const onSubmit = async (data) => {
    const date = data.date;
    dispatch(fetchHistory(date));
  };

  return (
    <>
      <Paper className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputLabel
                className={classes.h3}
                style={{ marginBottom: '10px' }}
              >
                Pick a Date
              </InputLabel>
              <TextField
                color='primary'
                size='small'
                type='date'
                variant='outlined'
                required
                fullWidth
                name='date'
                id='date'
                autoFocus
                inputRef={register}
                error={Boolean(errors.date)}
                helperText={errors.date ? errors.date.message : ''}
              />
            </Grid>
          </Grid>
        </form>

        <Button
          onClick={handleSubmit(onSubmit)}
          type='submit'
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Display
        </Button>
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit-content',
  },
}));
