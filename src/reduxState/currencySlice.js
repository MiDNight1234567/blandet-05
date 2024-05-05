import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency, getExchangeRate } from './operations';

const INITIAL_STATE = {
  baseCurrency: '',
  exchangeInfo: null,
  isLoading: false,
  isError: null,
};
const currency = createSlice({
  name: 'currency',
  initialState: INITIAL_STATE,
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.baseCurrency = action.payload;
      })
      .addCase(fetchBaseCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchBaseCurrency.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getExchangeRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchangeInfo = action.payload;
      })
      .addCase(getExchangeRate.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getExchangeRate.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      }),
});
export const { setBaseCurrency } = currency.actions;
export const currencyReducer = currency.reducer;
