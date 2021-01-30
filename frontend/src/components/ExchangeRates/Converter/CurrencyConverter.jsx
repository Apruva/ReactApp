import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchConvention,
  handleCountryChange,
  swapConvention,
  handleInputChange,
} from './CurrencyConverterContainer';
import { Container, Paper, makeStyles, InputLabel } from '@material-ui/core/';

import { Dropdown, Swapbutton, Input } from './subComponents';

export const CurrencyConverter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const countryOptions = useSelector((state) => state.currency.countries);
  const isLoading = useSelector((state) => state.currency.isLoading);
  const data = useSelector((state) => state.currency.data);
  const fromCountry = useSelector((state) => state.currency.fromCurr);
  const toCountry = useSelector((state) => state.currency.toCurr);
  const swapped = useSelector((state) => state.currency.swapped);
  useEffect(() => {
    dispatch(fetchConvention());
  }, [dispatch]);

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.div}>
        <Dropdown
          countryOptions={countryOptions}
          selectedCountry={fromCountry.symbol}
          onChangeCountry={(e) => {
            const value = fromCountry.value;
            const payload = {
              fromCurr: { symbol: e.target.value, value },
            };

            dispatch(handleCountryChange(payload));
          }}
        />
        <Swapbutton swapConvention={() => dispatch(swapConvention())} />

        <Dropdown
          countryOptions={countryOptions}
          selectedCountry={toCountry.symbol}
          onChangeCountry={(e) => {
            const value = toCountry.value;
            const payload = {
              toCurr: { symbol: e.target.value, value: value },
            };

            dispatch(handleCountryChange(payload));
          }}
        />

        <Input
          fromCountry={fromCountry.symbol}
          fromCountryValue={fromCountry.value}
          toCountry={toCountry.symbol}
          swapped={swapped}
          toCountryValue={toCountry.value}
          handleInputChange={(e) => {
            const payload = e.target.value;
            dispatch(handleInputChange(payload));
          }}
        />
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  div: {
    margiTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));
