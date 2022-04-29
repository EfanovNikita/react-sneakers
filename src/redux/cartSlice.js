import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../api/api"

const cartAdapter = createEntityAdapter()
const initialState = cartAdapter.getInitialState({ loading: 'idle', error: null })
export const fetchCartItems = createAsyncThunk(
    'cartSneakers/fetchItems',
    async () => {
        const res = await API('get', 'cart')
        return res.data
    }
)

export const addToCart = createAsyncThunk(
    'cartSneakers/addToCart',
    async (item) => {
        const res = await API('post', 'cart', item)
        return res.data
    }
)

export const removeFromCart = createAsyncThunk(
    'cartSneakers/removeFromCart',
    async (id) => {
        const res = await API('delete', `cart/${id}`)
        return res.data
    }
)

const cartSlice = createSlice({
    name: 'cartSneakers',
    initialState,
    reducers: {
        addOne: cartAdapter.addOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                cartAdapter.setMany(state, action.payload)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
            .addCase(addToCart.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                cartAdapter.addOne(state, action.payload)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
            .addCase(removeFromCart.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                cartAdapter.removeOne(state, action.payload.id)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
    }
})

export const cartSelector = cartAdapter.getSelectors(state => state.cart)
export default cartSlice.reducer