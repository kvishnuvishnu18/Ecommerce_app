
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Redux/productSlice.js';

export const store = configureStore({
    reducer: {
        products: productReducer
    }
});
