
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    FaShoppingCart,
    FaTimes,
    FaTrash
} from 'react-icons/fa';

import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} from '../Redux/productSlice.js';
import Footer from './Footer.jsx';


const Cart = ({ onStartShopping }) => {

    const dispatch = useDispatch();

    const cart = useSelector(
        (state) => state.products.cart
    );

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const originalTotal = cart.reduce(
        (total, item) =>
            total + Number(item.originalPrice || item.finalPrice) * item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) =>
            total + Number(item.finalPrice) * item.quantity,
        0
    );

    const discount = originalTotal - totalPrice;

    const formatPrice = (price) =>
        Number(price).toLocaleString('en-IN');

    // EMPTY CART
    if (cart.length === 0) {
        return (
            <div className="empty-cart">

                <div className="empty-cart-icon">
                    <FaShoppingCart className="empty-cart-shopping-icon" />
                    <FaTimes className="cart-cross" />
                </div>

                <h3>Your Cart is Empty</h3>

                <button
                    className="start-shopping"
                    onClick={onStartShopping}
                >
                    Start Shopping
                </button>

            </div>
        );
    }

    // FILLED CART
    return (
        <div className="cart-page">

            <h2>Shopping Cart</h2>

            <div className="cart-layout">

                {/* LEFT SIDE - PRODUCTS */}

                <div className="cart-products">

                    {cart.map((item) => (

                        <div className="cart-product" key={item.id}>

                            <img
                                src={item.images?.[0] || item.heroImage}
                                alt={item.title || item.title1}
                            />

                            <div className="cart-product-details">

                                <h5 className="cart-product-title">{item.title || item.title1}{item.info}</h5>

                                <div className="cart-prices">

                                    <strong>
                                        ₹{formatPrice(item.finalPrice)}
                                    </strong>

                                    <del>
                                        ₹{formatPrice(item.originalPrice || item.finalPrice)}
                                    </del>

                                </div>

                                <div className="quantity-controls">

                                    <button
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item.id))
                                        }
                                    >
                                        −
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            dispatch(increaseQuantity(item.id))
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            <button
                                className="remove-cart"
                                onClick={() =>
                                    dispatch(removeFromCart(item.id))
                                }
                            >
                                <FaTrash />
                            </button>

                        </div>

                    ))}

                </div>

                {/* RIGHT SIDE - ORDER SUMMARY */}

                <div className="cart-summary">

                    <h3>
                        Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </h3>

                    <div className="summary-row">
                        <span>Original Price</span>
                        <strong>₹{formatPrice(originalTotal)}</strong>
                    </div>

                    <div className="summary-row">
                        <span>Discount</span>
                        <strong className="discount-price">
                            - ₹{formatPrice(discount)}
                        </strong>
                    </div>

                    <div className="summary-row">
                        <span>Delivery</span>
                        <strong className="delivery-price">Free</strong>
                    </div>

                    <hr />

                    <div className="total-row">
                        <h3>Total Price</h3>
                        <h3>₹{formatPrice(totalPrice)}</h3>
                    </div>

                    <button className="checkout-btn">
                        Checkout
                    </button>

                </div>

            </div>
                   {/*  <Footer /> */}
        </div>
    );
};

export default Cart;
