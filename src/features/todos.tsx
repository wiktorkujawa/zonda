import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface TodoState {
  loading: any
  data: []
}

export const getTodos = createAsyncThunk(
  'GET_TODOS',
  async () => {
    // Example: 
    // const {data} = await axios.get('/api/todos')
    const data: any = [{todo: 'Your Data'}]
    return data
  }
)

export const addTodos = createAsyncThunk(
  'ADD_TODOS',
  async (body:any) => {
    // Example: 
    // const {data} = await axios.post('/api/todos',  body )
    const data = {todo: 'Your Data'}
    return data
  }
)

export const deleteTodos = createAsyncThunk(
  'DELETE_TODOS',
  async (id:number) => {
    // Example: 
    // await axios.delete(`/api/todos/${id}`)
    return id
  }
)

const initialState: TodoState = {
  loading: null,
  data: []
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // GET REDUCERS
    builder.addCase(getTodos.pending, (state, action) => {
      state.loading = "PENDING"
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.loading = "FULFILLED"
      state.data = action.payload
    })
    builder.addCase(getTodos.rejected, (state, action) => {
      state.loading = "REJECTED"
    })

    // ADD REDUCERS
    builder.addCase(addTodos.pending, (state, action) => {
      state.loading = "PENDING"
    })
    builder.addCase(addTodos.fulfilled, (state: any, action: any) => {
      state.loading = "FULFILLED"
      state.data.push(action.payload)
    })
    builder.addCase(addTodos.rejected, (state, action) => {
      state.loading = "REJECTED"
    })


    // DELETE REDUCERS
    builder.addCase(deleteTodos.pending, (state, action) => {
      state.loading = "PENDING"
    })
    builder.addCase(deleteTodos.fulfilled, (state: any, action: any) => {
      state.loading = "FULFILLED"
      state.data = state.data.filter((todo:any) => todo.id !== action.payload)
    })
    builder.addCase(deleteTodos.rejected, (state, action) => {
      state.loading = "REJECTED"
    })

  }

})

export const selectTodos = (state: RootState) => state.todos.data

export default todoSlice.reducer