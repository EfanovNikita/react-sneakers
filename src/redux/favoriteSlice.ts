import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { instance } from "../api/api"
import { Sneaker, Item } from "../types"
import { RootState } from "./store"

const favoriteAdapter = createEntityAdapter<Sneaker>()
const initialState = favoriteAdapter.getInitialState({ loading: 'idle', error: null as string | null })

export const fetchFavoriteItems = createAsyncThunk<Sneaker[], void, { serializedErrorType: string }>(
    'favoriteSneakers/fetchItems',
    async () => {
        const res = await instance.get('favorites')
        return res.data as Sneaker[]
    }
)

export const addToFavorite = createAsyncThunk<Sneaker, Item, { serializedErrorType: string }>(
    'favoriteSneakers/addToFavorite',
    async (item) => {
        const res = await instance.post('favorites', item)
        return res.data as Sneaker
    }
)

export const removeFromFavorite = createAsyncThunk<Sneaker, number, { serializedErrorType: string }>(
    'favoriteSneakers/removeFromFavorite',
    async (id) => {
        const res = await instance.delete(`favorites/${id}`)
        return res.data as Sneaker
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

export const favoriteSelector = favoriteAdapter.getSelectors<RootState>(state => state.favorite)
export default favoriteSlice.reducer