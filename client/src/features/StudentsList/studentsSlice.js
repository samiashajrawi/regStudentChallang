import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const initialState = {
  students: [],
  status: 'idle',
  error: null,
}

export const fetchStudents = createAsyncThunk(
    'students/fetchStudents', 
    async () => {
        const response = await client.get('http://localhost:8000/index')
        return response
    }
)


const studentsSlice = createSlice({
  name: 'students',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.students = action.payload
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      }
      )
  }
})

export default studentsSlice.reducer