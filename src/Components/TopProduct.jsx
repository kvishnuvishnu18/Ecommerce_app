
import React, { useState, useRef, useEffect } from 'react';
import productsData from '../data/productsData';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, addToCart } from '../Redux/productSlice.js';
import { useNavigate } from 'react-router-dom';

const TopProduct = ({ onProductAdded }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addedProductId, setAddedProductId] = useState(null);

    const timerRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const category = useSelector(
        (state) => state.products.category
    );

    const categories = [
        'All',
        'Headphones',
        'Earbuds',
        'Earphones',
        'Neckbands'
    ];

    // Display only 11 products in Top Products
    const topProducts = productsData.slice(0, 11);

    const filteredProducts = category === 'All'
        ? topProducts
        : topProducts.filter(
            (item) =>
                item.category?.toLowerCase() === category.toLowerCase()
        );

    // ADD TO CART
    const handleAddToCart = (item) => {

        dispatch(addToCart(item));

        setAddedProductId(item.id);

        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setAddedProductId(null);
        }, 2000);

        onProductAdded?.();
    };

    // BROWSE ALL PRODUCTS
    const handleBrowseAll = () => {
        navigate('/products');
    };

    return (
        <section className="top-product">

            <h2>Top Products</h2>

            <div className="product-categories">

                {categories.map((item) => (
                    <button
                        key={item}
                        className={category === item ? 'selected' : ''}
                        onClick={() => dispatch(setCategory(item))}
                    >
                        {item}
                    </button>
                ))}

            </div>

            <div className="top-product-grid">

                {filteredProducts.map((item) => (

                    <div className="top-product-card" key={item.id}>

                        <img
                            src={item.images?.[0]}
                            alt={item.title || item.title1}
                            onClick={() =>
                                navigate(`/product-details/${item.id}`)
                            }
                            style={{ cursor: 'pointer' }}
                        />

                        <div className="product-info">

                            <div className="stars">
                                {'★'.repeat(item.rateCount || 0)}
                            </div>

                            <h5>{item.title || item.title1}</h5>

                            <p className="product-description">
                                {item.info}
                            </p>

                            <hr />

                            <div className="price">

                                <strong>
                                    ₹{Number(item.finalPrice).toLocaleString('en-IN')}
                                </strong>

                                <del>
                                    ₹{Number(item.originalPrice).toLocaleString('en-IN')}
                                </del>

                            </div>

                            <button
                                className={
                                    addedProductId === item.id
                                        ? 'cart-btn added'
                                        : 'cart-btn'
                                }
                                onClick={() => handleAddToCart(item)}
                            >
                                {addedProductId === item.id
                                    ? 'Added'
                                    : 'Add to Cart'}
                            </button>

                        </div>

                    </div>

                ))}

                {/* BROWSE ALL CARD */}

                {category === 'All' && (

                    <div
                        className="browse-all-card"
                        onClick={handleBrowseAll}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleBrowseAll();
                            }
                        }}
                    >

                        <h5>Browse All</h5>
                        <h5>Products →</h5>

                    </div>

                )}

            </div>

        </section>
    );
};

export default TopProduct;
