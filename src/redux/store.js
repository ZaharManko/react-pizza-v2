import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartSlice from './slices/cardSlice'
export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartSlice
    },
});