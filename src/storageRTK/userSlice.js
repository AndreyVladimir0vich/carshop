import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { openNotification } from '../Notifiaction/Notification'

export const userFetch = createAsyncThunk(
  'user/userFetch',
  async function (
    externalData,
    { fulfillWithValue, rejectWithValue, extra: api }
  ) {
    try {
      const responseData = await api.getUserInfo()
      return fulfillWithValue(responseData)
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

export const userUp = createAsyncThunk(
  'user/userUp',
  async function (
    externalData,
    { fulfillWithValue, rejectWithValue, extra: api }
  ) {
    try {
      const responseData = externalData.avatar
        ? await api.updateAvatar(externalData)
        : await api.updateUserInfo(externalData)
      openNotification('success', 'Успешно', 'данные успешно изменены')

      return fulfillWithValue(responseData)
    } catch (error) {
      console.log(error)
      openNotification('error', 'error', 'Не удалось изменить данные')

      return rejectWithValue(error)
    }
  }
)

const isError = (action) => {
  return action.type.endsWith('rejected')
}

const initialState = {
  data: {},
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userFetch.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(userFetch.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(userUp.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addMatcher(isError, (state, action) => {
      state.error = action.payload
      state.loading = false
      openNotification('error', 'error', 'ошибка загрузки')
    })
  },
})

export default userSlice.reducer
