import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'

import { api } from '../utils/api'
import carProdSlice from './CarProdSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    products: carProdSlice,
  },
  middleware: (getDefMiddleware) =>
    getDefMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
})

export default store
