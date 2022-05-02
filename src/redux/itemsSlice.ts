import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "./store"
import type { Sneaker } from '../types';
import { instance } from "../api/api";

const itemsAdapter = createEntityAdapter<Sneaker>()
const initialState = itemsAdapter.getInitialState({ loading: 'idle', error: null as string | null })

export const fetchItems = createAsyncThunk<Sneaker[], void, { serializedErrorType: string }>(
    'allSneakers/fetchItems',
    async () => {
        const res = await instance.get('items')
        return res.data as Sneaker[]
    }
)

const itemsSlice = createSlice({
    name: 'allSneakers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                itemsAdapter.setMany(state, action.payload)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
    }
})

export const itemsSelector = itemsAdapter.getSelectors<RootState>(state => state.items)
export default itemsSlice.reducer