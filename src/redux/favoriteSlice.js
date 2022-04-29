import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../api/api"

const favoriteAdapter = createEntityAdapter()
const initialState = favoriteAdapter.getInitialState({ loading: 'idle', error: null })
export const fetchFavoriteItems = createAsyncThunk(
    'favoriteSneakers/fetchItems',
    async () => {
        const res = await API('get', 'favorites')
        return res.data
    }
)

export const addToFavorite = createAsyncThunk(
    'favoriteSneakers/addToFavorite',
    async (item) => {
        const res = await API('post', 'favorites', item)
        return res.data
    }
)

export const removeFromFavorite = createAsyncThunk(
    'favoriteSneakers/removeFromFavorite',
    async (id) => {
        const res = await API('delete', `favorites/${id}`)
        return res.data
    }
)

const favoriteSlice = createSlice({
    name: 'favoriteSneakers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteItems.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(fetchFavoriteItems.fulfilled, (state, action) => {
                favoriteAdapter.setMany(state, action.payload)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(fetchFavoriteItems.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
            .addCase(addToFavorite.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(addToFavorite.fulfilled, (state, action) => {
                favoriteAdapter.addOne(state, action.payload)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(addToFavorite.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
            .addCase(removeFromFavorite.pending, state => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(removeFromFavorite.fulfilled, (state, action) => {
                favoriteAdapter.removeOne(state, action.payload.id)
                state.loading = 'idle'
                state.error = null
            })
            .addCase(removeFromFavorite.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error
            })
    }
})

export const favoriteSelector = favoriteAdapter.getSelectors(state => state.favorite)
export default favoriteSlice.reducer