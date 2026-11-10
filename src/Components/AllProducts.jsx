
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import productsData from '../data/productsData';
import { addToCart } from '../Redux/productSlice.js';

const AllProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sortBy, setSortBy] = useState('Latest');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(20000);
    const [addedProductId, setAddedProductId] = useState(null);

    const timerRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    // PRODUCT NAME
    const getProductName = (item) => {
        return item.title || item.title1 || 'Product';
    };

    // OPEN PRODUCT DETAILS
    const handleProductClick = (id) => {
        navigate(`/product-details/${id}`);
    };

    // BRAND FILTER
    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(item => item !== brand)
                : [...prev, brand]
        );
    };

    // CATEGORY FILTER
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(item => item !== category)
                : [...prev, category]
        );
    };

    // FILTER PRODUCTS
    const filteredProducts = productsData.filter(item => {

        const brandMatch =
            selectedBrands.length === 0 ||
            selectedBrands.includes(item.brand);

        const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(item.category);

        const priceMatch =
            Number(item.finalPrice) <= maxPrice;

        return brandMatch && categoryMatch && priceMatch;
    });

    // SORT PRODUCTS
    const sortedProducts = [...filteredProducts];

    if (sortBy === 'Featured') {
        sortedProducts.sort((a, b) => {
            const aFeatured = a.tag === 'featured-product' ? 1 : 0;
            const bFeatured = b.tag === 'featured-product' ? 1 : 0;
            return bFeatured - aFeatured;
        });
    }

    if (sortBy === 'Top Rated') {
        sortedProducts.sort((a, b) => {
            if (b.rateCount !== a.rateCount) {
                return b.rateCount - a.rateCount;
            }
            return b.ratings - a.ratings;
        });
    }

    if (sortBy === 'Price(Lowest First)') {
        sortedProducts.sort(
            (a, b) => Number(a.finalPrice) - Number(b.finalPrice)
        );
    }

    if (sortBy === 'Price(Highest First)') {
        sortedProducts.sort(
            (a, b) => Number(b.finalPrice) - Number(a.finalPrice)
        );
    }

    // ADD TO CART
    const handleAddToCart = (e, item) => {

        e.stopPropagation();

        dispatch(addToCart(item));

        setAddedProductId(item.id);

        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setAddedProductId(null);
        }, 2000);
    };

    // RESET FILTERS
    const handleReset = () => {
        setSelectedBrands([]);
        setSelectedCategories([]);
        setMaxPrice(20000);
        setSortBy('Latest');
    };

    return (

        <section className="all-products-page">

            {/* LEFT SIDEBAR */}

            <aside className="filter-sidebar">

                <div className="filter-section">

                    <h3>Sort By</h3>
                    <hr />

                    {[
                        'Latest',
                        'Featured',
                        'Top Rated',
                        'Price(Lowest First)',
                        'Price(Highest First)'
                    ].map(option => (

                        <p
                            key={option}
                            className={sortBy === option ? 'active-sort' : ''}
                            onClick={() => setSortBy(option)}
                        >
                            {option}
                        </p>

                    ))}

                </div>

                <div className="filter-section">

                    <div className="filter-title">
                        <h3>Filter By</h3>

                        <button onClick={handleReset}>
                            Clear
                        </button>
                    </div>

                    <hr />

                    {/* BRANDS */}

                    <h4>Brands</h4>

                    {['JBL', 'boAt', 'Sony'].map(brand => (

                        <label className="filter-option" key={brand}>

                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandChange(brand)}
                            />

                            <span>{brand}</span>

                        </label>

                    ))}

                    {/* CATEGORY */}

                    <h4>Category</h4>

                    {[
                        'Headphones',
                        'Earbuds',
                        'Earphones',
                        'Neckbands'
                    ].map(category => (

                        <label className="filter-option" key={category}>

                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />

                            <span>{category}</span>

                        </label>

                    ))}

                    {/* PRICE */}

                    <h4>Price</h4>

                    <div className="price-range">
                        <span>
                            ₹{maxPrice.toLocaleString('en-IN')}
                        </span>
                    </div>

                    <input
                        type="range"
                        min="0"
                        max="20000"
                        step="100"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(Number(e.target.value))
                        }
                    />

                    <div className="price-labels">
                        <span>₹0</span>
                        <span>₹20,000</span>
                    </div>

                </div>

            </aside>

            {/* RIGHT PRODUCTS SECTION */}

            <main className="products-container">

                <div className="products-heading">
                    <h2>All Products</h2>

                    <p>
                        {sortedProducts.length} Products
                    </p>
                </div>

                {/* PRODUCT GRID */}

                <div className="products-grid">

                    {sortedProducts.map(item => (

                        <div
                            className="product-card"
                            key={item.id}
                            onClick={() => handleProductClick(item.id)}
                            style={{ cursor: 'pointer' }}
                        >

                            {/* PRODUCT IMAGE */}

                            <div className="all-product-image-box">

                                <img
                                    src={item.images?.[0] || item.heroImage}
                                    alt={getProductName(item)}
                                    className="all-product-image"
                                />

                            </div>

                            <div className="product-details">

                                {/* STARS */}

                                <div className="product-stars">
                                    {'★'.repeat(item.rateCount || 0)}
                                </div>

                                {/* PRODUCT TITLE */}

                                <h3>
                                    {getProductName(item)}
                                </h3>

                                {/* PRODUCT DESCRIPTION */}

                                <p className="all-product-description">
                                    {item.info}
                                </p>

                                <hr />

                                {/* PRODUCT PRICE */}

                                <div className="all-product-price">

                                    <strong>
                                        ₹{Number(item.finalPrice).toLocaleString('en-IN')}
                                    </strong>

                                    <del>
                                        ₹{Number(item.originalPrice).toLocaleString('en-IN')}
                                    </del>

                                </div>

                                {/* ADD TO CART */}

                                <button
                                    className={
                                        addedProductId === item.id
                                            ? 'all-cart-btn added'
                                            : 'all-cart-btn'
                                    }
                                    onClick={(e) => handleAddToCart(e, item)}
                                >

                                    {addedProductId === item.id
                                        ? 'Added'
                                        : 'Add to cart'}

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

                {/* NO PRODUCTS */}

                {sortedProducts.length === 0 && (

                    <div className="no-products">

                        <h3>No Products Found!</h3>

                        <p>Try changing your filters.</p>

                        <button onClick={handleReset}>
                            Clear Filters
                        </button>

                    </div>

                )}

            </main>

        </section>
    );
};

export default AllProducts;
