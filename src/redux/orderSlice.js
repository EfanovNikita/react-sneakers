import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../api/api"

const orderAdapter = createEntityAdapter()
const initialState = orderAdapter.getInitialState({ loading: 'loading', error: null })
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const res = await API('get', 'orders')
        return res.data
    }
)
export const postOrder = createAsyncThunk(
    'orders/doOrder',
    async (order) => {
        const res = await API('post', 'orders', order)
        return res.data
    }
)

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                orderAdapter.setMany(state, action.payload)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
            .addCase(postOrder.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                orderAdapter.setMany(state, action.payload)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
    }
})

export const ordersSelector = orderAdapter.getSelectors(state => state.orders)
export default orderSlice.reducer