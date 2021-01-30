import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, makeStyles, Typography } from '@material-ui/core/';
import { DatePicker } from './DatePicker';
import { HistoryChart } from './HistoryChart';
export const Historical = () => {
  const classes = useStyles();
  const isLoading = useSelector((state) => state.history.isLoading);
  const error = useSelector((state) => state.history.error);
  const data = useSelector((state) => state.history.data);
  const countries = useSelector((state) => state.currency.countries);

  return (
    <Container maxWidth='xs'>
      <Typography
        className={classes.h3}
        style={{ textAlign: 'center' }}
        variant='h5'
      >
        Query Exchange Rates By Date (fix date input format to match select
        format)
      </Typography>
      <div className={classes.div}>
        <DatePicker data={data} />

        <div className={classes.chart}>
          {data && (
            <HistoryChart
              historyData={data}
              error={error}
              isLoading={isLoading}
              countries={countries}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  div: {
    margiTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  paper: {
    display: 'block',
    marginTop: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    width: 'fit-content',
  },
  h3: {
    color: theme.palette.fortiary.main,
  },
  chart: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    width: 'fit-content',
    alignSelf: 'center',
  },
}));
