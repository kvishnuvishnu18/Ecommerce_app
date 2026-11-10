
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',

    initialState: {
        category: 'All',
        cart: []
    },

    reducers: {

        setCategory: (state, action) => {
            state.category = action.payload;
        },

        addToCart: (state, action) => {

            const existingProduct = state.cart.find(
                (item) => item.id === action.payload.id
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.push({
                    ...action.payload,
                    quantity: 1
                });
            }
        },

        increaseQuantity: (state, action) => {
            const item = state.cart.find(
                (item) => item.id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.cart.find(
                (item) => item.id === action.payload
            );

            if (item) {
                item.quantity -= 1;

                if (item.quantity <= 0) {
                    state.cart = state.cart.filter(
                        (product) => product.id !== action.payload
                    );
                }
            }
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload
            );
        }
    }
});

export const {
    setCategory,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} = productSlice.actions;

export default productSlice.reducer;
