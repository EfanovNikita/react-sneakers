import { configureStore } from "@reduxjs/toolkit"
import itemsReducer from "./itemsSlice"
import cartReducer from "./cartSlice"
import favoriteReducer from "./favoriteSlice"
import orderReducer from "./orderSlice"

const store = configureStore({
    reducer: {
        items: itemsReducer,
        cart: cartReducer,
        favorite: favoriteReducer,
        orders: orderReducer
    }
})

export default store