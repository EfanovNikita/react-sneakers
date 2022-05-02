import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { instance } from "../api/api"
import { RootState } from "./store"
import { Sneaker } from "../types"

interface Order {
    id: number,
    order: Sneaker[]
}

const orderAdapter = createEntityAdapter<Order>()
const initialState = orderAdapter.getInitialState({ loading: 'loading', error: null as string | null })

export const fetchOrders = createAsyncThunk<Order[], void, { serializedErrorType: string }>(
    'orders/fetchOrders',
    async () => {
        const res = await instance.get('orders')
        return res.data as Order[]
    }
)
export const postOrder = createAsyncThunk<Order, {order: Sneaker[]}, { serializedErrorType: string }>(
    'orders/doOrder',
    async (order) => {
        const res = await instance.post('orders', order)
        return res.data as Order
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
                orderAdapter.addOne(state, action.payload)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
    }
})

export const ordersSelector = orderAdapter.getSelectors<RootState>(state => state.orders)
export default orderSlice.reducer