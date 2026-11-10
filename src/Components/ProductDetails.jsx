
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/productSlice';
import productsData from '../data/productsData';


const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = productsData.find(
        item => String(item.id) === id
    );

    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('Specifications');
    const [added, setAdded] = useState(false);

    useEffect(() => {
        setSelectedImage(0);
        setActiveTab('Specifications');
        setAdded(false);
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="not-found">
                <h2>Product Not Found</h2>
                <button onClick={() => navigate('/')}>GO TO HOME</button>
            </div>
        );
    }

    const productName = product.title || product.title1 || 'Product';
    const images = product.images || [];

    const finalPrice = Number(product.finalPrice) || 0;
    const originalPrice = Number(product.originalPrice) || 0;

    const discount = originalPrice > 0
        ? Math.round((1 - finalPrice / originalPrice) * 100)
        : 0;

    const inStock = Number(product.quantity) > 0;

    const relatedProducts = productsData
        .filter(item =>
            item.category === product.category &&
            item.id !== product.id
        )
        .slice(0, 4);

    const handleAddToCart = (item = product) => {
        dispatch(addToCart(item));

        if (item.id === product.id) {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    return (
        <div className="product-details-page">

            {/* MAIN PRODUCT SECTION */}

            <div className="details-container">

                {/* PRODUCT IMAGES */}

                <div className="details-image-section">

                    <div className="thumbnail-images">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${productName} ${index + 1}`}
                                className={
                                    selectedImage === index
                                        ? 'active-image'
                                        : ''
                                }
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>

                    <div className="main-product-image">
                        {images.length > 0 ? (
                            <img
                                src={images[selectedImage]}
                                alt={productName}
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}
                    </div>

                </div>

                {/* PRODUCT INFORMATION */}

                <div className="details-info">

                    <p className="details-brand">
                        {product.brand || 'Brand'}
                    </p>

                    <h1>{productName}</h1>

                    <p className="details-description">
                        {product.info || 'Product information is not available.'}
                    </p>

                    <div className="details-rating">
                        <span>
                            {'★'.repeat(Number(product.rateCount) || 0)}
                        </span>
                        <small>({product.ratings || 0} Ratings)</small>
                    </div>

                    <hr />

                    <div className="price-stock-row">

                        <div className="details-price">
                            <h2>₹{finalPrice.toLocaleString('en-IN')}</h2>

                            {originalPrice > 0 && (
                                <del>
                                    ₹{originalPrice.toLocaleString('en-IN')}
                                </del>
                            )}

                            {discount > 0 && (
                                <span>{discount}% OFF</span>
                            )}
                        </div>

                        <span className={`stock-status ${inStock ? 'in-stock' : 'out-stock'}`}>
                            {inStock ? '✓ In Stock' : 'Out of Stock'}
                        </span>

                    </div>

                    <p className="tax-info">
                        Inclusive of all taxes
                    </p>

                    {/* OFFERS */}

                    <div className="offers-section">
                        <h5>Offers and Discounts</h5>

                        <div className="offer-list">
                            <div className="offer-box">
                                <strong>Bank Offer</strong>
                                <p>Special bank offers available</p>
                            </div>

                            <div className="offer-box">
                                <strong>Special Offer</strong>
                                <p>Exclusive product deals</p>
                            </div>
                        </div>
                    </div>

                    <button
                        className="details-cart-btn"
                        onClick={() => handleAddToCart()}
                        disabled={!inStock}
                    >
                        {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
                    </button>

                </div>
            </div>

            {/* PRODUCT TABS */}

            <div className="product-tabs">

                <div className="tab-buttons">
                    {['Specifications', 'Overview', 'Reviews'].map(tab => (
                        <button
                            key={tab}
                            className={activeTab === tab ? 'active-tab' : ''}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="tab-content">

                    {activeTab === 'Specifications' && (
                        <div className="specification-list">
                            <p>
                                <strong>Brand</strong>
                                <span>{product.brand || 'N/A'}</span>
                            </p>
                            <p>
                                <strong>Model</strong>
                                <span>{productName}</span>
                            </p>
                            <p>
                                <strong>Generic Name</strong>
                                <span>{product.category || 'N/A'}</span>
                            </p>
                            <p>
                                <strong>Headphone Type</strong>
                                <span>{product.type || 'N/A'}</span>
                            </p>
                            <p>
                                <strong>Connectivity</strong>
                                <span>{product.connectivity || 'N/A'}</span>
                            </p>
                            <p>
                                <strong>Microphone</strong>
                                <span>N/A</span>
                            </p>
                        </div>
                    )}

                    {activeTab === 'Overview' && (
                        <div>
                            <h3>Product Overview</h3>
                            <p>{product.info || 'No description available.'}</p>
                        </div>
                    )}

                    {activeTab === 'Reviews' && (
                        <div>
                            <h3>Customer Ratings & Reviews</h3>
                            <h2>★ {product.rateCount || 0}/5</h2>
                            <p>{product.ratings || 0} Ratings</p>
                        </div>
                    )}

                </div>
            </div>

            {/* RELATED PRODUCTS */}

            <div className="related-products">

                <h2>Related Products</h2>

                <div className="related-grid">
                    {relatedProducts.map(item => (
                        <div className="related-card" key={item.id}>

                            <img
                                src={item.images?.[0]}
                                alt={item.title || item.title1}
                                onClick={() => navigate(`/product-details/${item.id}`)}
                            />

                            <div className="related-rating">
                                {'★'.repeat(Number(item.rateCount) || 0)}
                            </div>

                            <h4>{item.title || item.title1}</h4>

                            <p>{item.info}</p>

                            <strong>
                                ₹{Number(item.finalPrice).toLocaleString('en-IN')}
                            </strong>

                            <button
                                disabled={Number(item.quantity) <= 0}
                                onClick={() => handleAddToCart(item)}
                            >
                                ADD TO CART
                            </button>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;
