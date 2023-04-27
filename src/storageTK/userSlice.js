import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice.reducer
