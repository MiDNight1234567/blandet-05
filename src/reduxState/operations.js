import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency } from 'service/exchangeAPI';
import { getUserInfo } from 'service/opencagedataApi';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (cords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }
    try {
      const data = await getUserInfo(cords);
      return data.results[0].annotations.currency.iso_code;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const getExchangeRate = createAsyncThunk(
  'currency/getExchangeRate',
  async (credentials, thunkAPI) => {
    try {
      const response = await exchangeCurrency(credentials);
      console.log('response:', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
