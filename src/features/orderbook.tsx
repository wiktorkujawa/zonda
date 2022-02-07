import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';
import { OrderbookParams, ResponseDetails } from '../models';
export interface TodoState {
  loading: "IDLE" | "PENDING" | "FULFILLED" | "REJECTED",
  data: ResponseDetails,
  errors: string[]
}

export const getOrderbook = createAsyncThunk(
  'GET_ORDERS',
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
    .addCase(getOrderbook.fulfilled, (state: TodoState, action: PayloadAction<ResponseDetails>) => {
      state.loading = "FULFILLED"
      action.payload.buy!.map(item => item.val= item.ra*item.ca)
      action.payload.sell!.map(item => item.val= item.ra*item.ca)

      action.payload.spread =  Math.max.apply(Math, action.payload!.sell!.map(order => order.val))
      -
      Math.min.apply(Math, action.payload!.buy!.map(order => order.val))
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