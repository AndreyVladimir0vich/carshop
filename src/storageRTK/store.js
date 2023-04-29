import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { api } from '../utils/api'

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefMiddleware) =>
    getDefMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
})

export default store
