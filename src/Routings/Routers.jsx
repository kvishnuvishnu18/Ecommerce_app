
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Components/Home';
import Cart from '../Components/Cart';
import AllProducts from '../Components/AllProducts';
import ProductDetails from '../Components/ProductDetails';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/products" element={<AllProducts />} />

            <Route
                path="/product-details/:id"
                element={<ProductDetails />}
            />
        </Routes>
    );
};

export default Routers;
