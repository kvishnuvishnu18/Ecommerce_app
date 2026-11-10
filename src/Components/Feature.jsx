import React, { useState, useEffect } from 'react';
import productsData from '../data/productsData';
import { useNavigate } from 'react-router-dom';

const Feature = () => {

    const navigate = useNavigate();

    const featuredProducts = productsData.filter(
        (item) => item.tag === "featured-product"
    );

    const [index, setIndex] = useState(0);

    const displayProducts = featuredProducts.map(
        (_, i) =>
            featuredProducts[
                (index + i) % featuredProducts.length
            ]
    );

    // Open Product Details page
    const handleProductClick = (id) => {
        navigate(`/product-details/${id}`);
    };

    // Automatic carousel movement
    useEffect(() => {

        if (featuredProducts.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prev) =>
                (prev + 1) % featuredProducts.length
            );
        }, 3000);

        return () => clearInterval(interval);

    }, [featuredProducts.length]);

    if (featuredProducts.length === 0) {
        return <p>No featured products found.</p>;
    }

    return (
        <section className="featured-section">

            <h2>Featured Products</h2>

            <div className="featured-slider">

                {displayProducts.map((item, i) => (

                    <div
                        key={item.id}
                        className={`featured-item ${
                            i === 2 ? "active" : ""
                        }`}
                    >

                        <h5
                            onClick={() => handleProductClick(item.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.title || item.title1}
                        </h5>

                        <img
                            src={item.images?.[0]}
                            alt={item.title || item.title1}
                            onClick={() => handleProductClick(item.id)}
                            style={{ cursor: 'pointer' }}
                        />

                        <div className="price">
                            <strong>₹{item.finalPrice}</strong>
                            <del>₹{item.originalPrice}</del>
                        </div>

                    </div>

                ))}

            </div>

            {/* Navigation dots */}

            <div className="slider-dots">

                {featuredProducts.map((item, i) => (

                    <button
                        key={item.id}
                        className={
                            i === index ? "active-dot" : ""
                        }
                        onClick={() => setIndex(i)}
                    />

                ))}

            </div>

        </section>
    );
};

export default Feature;