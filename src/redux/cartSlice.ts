import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { instance } from "../api/api"
import { Sneaker, Item } from "../types"
import { RootState } from "./store"

const cartAdapter = createEntityAdapter<Sneaker>()
const initialState = cartAdapter.getInitialState({ loading: 'idle', error: null as string | null })

export const fetchCartItems = createAsyncThunk<Sneaker[], void, { serializedErrorType: string }>(
    'cartSneakers/fetchItems',
    async () => {
        const res = await instance.get('cart')
        return res.data as Sneaker[]
    }
)

export const addToCart = createAsyncThunk<Sneaker, Item, { serializedErrorType: string }>(
    'cartSneakers/addToCart',
    async (item) => {
        const res = await instance.post('cart', item)
        return res.data as Sneaker
    }
)

export const removeFromCart = createAsyncThunk<Sneaker, number, { serializedErrorType: string }>(
    'cartSneakers/removeFromCart',
    async (id) => {
        const res = await instance.delete(`cart/${id}`)
        return res.data
    }
)

const cartSlice = createSlice({
    name: 'cartSneakers',
    initialState,
    reducers: {},
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

export const cartSelector = cartAdapter.getSelectors<RootState>(state => state.cart)
export default cartSlice.reducer