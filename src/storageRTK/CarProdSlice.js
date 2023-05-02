import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { findLike } from '../utils/utils'

export const productFetch = createAsyncThunk(
  'products/productsFetch',
  async function (
    _,
    { extra: api, fulfillWithValue, rejectWithValue, getState }
  ) {
    try {
      const { user } = getState()
      const products = await api.getProductList()
      return fulfillWithValue({ ...products, user: user.data })
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const fetchProdLikeChange = createAsyncThunk(
  'products/fetchProdLikeChange',
  async function (
    externalProduct,
    { extra: api, fulfillWithValue, rejectWithValue, getState }
  ) {
    try {
      const { user } = getState()
      const wasLiked = findLike(externalProduct, user.data)
      const data = await api.changeLikeProductStatus(
        externalProduct._id,
        wasLiked
      )
      return fulfillWithValue({ product: data, wasLiked: wasLiked })
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const initialState = {
  data: [],
  favourites: [],
  total: null,
  loading: false,
  error: null,
}

const carProdSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        const { total, products, user } = action.payload
        state.data = products
        state.total = total
        state.favourites = products.filter((e) => findLike(e, user))
        state.loading = true
      })
      .addCase(fetchProdLikeChange.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        const { product, wasLiked } = action.payload

        state.data = state.data.map((card) => {
          return card._id === product._id ? product : card
        })

        if (!wasLiked) {
          state.favourites.push(product)
        } else {
          state.favourites = state.favourites.filter(
            (cardFav) => cardFav._id !== product._id
          )
        }
      })
  },
})

export default carProdSlice.reducer
