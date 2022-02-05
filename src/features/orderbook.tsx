import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';
import { OrderbookParams, ResponseDetails } from '../models';
export interface TodoState {
  loading: "IDLE" | "PENDING" | "FULFILLED" | "REJECTED",
  data: ResponseDetails,
  errors: string[]
}

export const getOrderbook = createAsyncThunk(
  'GET_TODOS',
  async (params: OrderbookParams, { rejectWithValue }) => {
    const { limit, trading_pair } = params;
    try {
      const { data } = await axios.get(`/api/orderbook/${trading_pair}/${limit}`)
      return data
    }
    catch(e: any) {
      return rejectWithValue(e.response.data)
    }    
  }
)

const initialState: TodoState = {
  loading: 'IDLE',
  data: {},
  errors: []
};

const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // GET REDUCERS
    builder.addCase(getOrderbook.pending, (state: TodoState, _action) => {
      state.loading = "PENDING"
    })
    .addCase(getOrderbook.fulfilled, (state: TodoState, action) => {
      state.loading = "FULFILLED"
      state.data = action.payload
    })
    .addCase(getOrderbook.rejected, (state: TodoState, action: any) => {
      state.loading = "REJECTED"
      state.errors = action.payload
      state.data = {}
    })
  }

})

export const selectOrderbook = (state: RootState) => state.orderbook.data

export const selectError = (state: RootState) => state.orderbook.errors

export default orderbookSlice.reducer