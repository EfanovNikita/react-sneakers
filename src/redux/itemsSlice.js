import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../api/api"

const itemsAdapter = createEntityAdapter()
const initialState = itemsAdapter.getInitialState({ loading: 'idle', error: null })
export const fetchItems = createAsyncThunk(
    'allSneakers/fetchItems',
    async () => {
        const res = await API('get', 'items')
        return res.data
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

export const itemsSelector = itemsAdapter.getSelectors(state => state.items)
export default itemsSlice.reducer