import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency } from './operations';

const INITIAL_STATE = { baseCurrency: '', isLoading: false, isError: false };
const currency = createSlice({
  name: 'currency',
  initialState: INITIAL_STATE,
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: bilder =>
    bilder
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
        state.isError = false;
      }),
});
export const { setBaseCurrency } = currency.actions;
export const currencyReducer = currency.reducer;
