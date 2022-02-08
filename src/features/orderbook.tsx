import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ResponseDetails } from '../models';
export interface TodoState {
  loading: "IDLE" | "PENDING" | "FULFILLED" | "REJECTED",
  data: ResponseDetails,
  errors: string[]
}

export const getOrderbook = createAsyncThunk(
  'GET_ORDERS',
  async (data:ResponseDetails, { rejectWithValue }) => {
    try {
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