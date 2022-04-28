import { configureStore } from "@reduxjs/toolkit"
import itemsReducer from "./itemsSlice"
import cartReducer from "./cartSlice"
import favoriteReducer from "./favoriteSlice"

const store = configureStore({
    reducer: {
        items: itemsReducer,
        cart: cartReducer,
        favorite: favoriteReducer
    }
})

export default store