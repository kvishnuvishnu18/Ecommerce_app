
import React, { useState } from 'react';

import {
  FaSearch,
  FaShoppingCart,
  FaUser
} from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Search from './Search';

const Navbar = ({ onLogin }) => {

  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const cart = useSelector(
    (state) => state.products.cart
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white fixed-top">

      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand text-white" to="/">
          <h3>TECH-SHOP</h3>
        </Link>

        {/* SEARCH BAR - MIDDLE */}
        {showSearch && (
          <div className="navbar-search-middle">
            <Search />
          </div>
        )}

        {/* RIGHT ICONS */}
        <div className="ms-auto d-flex gap-4 align-items-center">

          {/* SEARCH ICON */}
          <button
            className="search-icon-btn"
            onClick={() => setShowSearch(!showSearch)}
          >
            <FaSearch size={22} />
          </button>

          {/* CART */}
          <Link to="/cart" className="navbar-cart-icon text-white">
            <FaShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>

          {/* USER */}
          <div className="user-dropdown">

            <button
              className="user-icon-btn"
              onClick={() => setShowUserPopup(!showUserPopup)}
            >
              <FaUser size={22} />
            </button>

            {showUserPopup && (
              <div className="user-popup">
                <h5>Hello!</h5>
                <p>Access account and manage orders</p>

                <button
                  className="login-signup-btn"
                  onClick={() => {
                    setShowUserPopup(false);
                    onLogin();
                  }}
                >
                  Login / Signup
                </button>

                <hr />

                <p className="please-login">Please Login</p>
              </div>
            )}

          </div>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;
