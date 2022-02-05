import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';
import { OrderbookParams, ResponseDetails } from '../models';
export interface TodoState {
  loading: "IDLE" | "PENDING" | "FULFILLED" | "REJECTED",
  data: ResponseDetails,
  errors: string[]
}

export const getTodos = createAsyncThunk(
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

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // GET REDUCERS
    builder.addCase(getTodos.pending, (state: TodoState, _action) => {
      state.loading = "PENDING"
    })
    .addCase(getTodos.fulfilled, (state: TodoState, action) => {
      state.loading = "FULFILLED"
      state.data = action.payload
    })
    .addCase(getTodos.rejected, (state: TodoState, action: any) => {
      state.loading = "REJECTED"
      state.errors = action.payload
      state.data = {}
    })
  }

})

export const selectTodos = (state: RootState) => state.todos.data

export default todoSlice.reducer