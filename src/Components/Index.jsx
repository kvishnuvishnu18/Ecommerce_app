
import React from 'react';
import productsData from '../data/productsData';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Index = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-dark p-2">

            <div
                id="carouselExampleAutoplaying"
                className="carousel slide bg-dark"
                data-bs-ride="carousel"
                data-bs-interval="1000"
            >

                <div className="carousel-inner bg-dark rounded-4">

                    {productsData
                        .filter((item) => item.heroImage)
                        .map((item, index) => (

                            <div
                                key={item.id}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            >

                                <div className="container-fluid d-flex align-items-center justify-content-between p-4 bg-dark text-white hero-slide">

                                    {/* BACKGROUND TEXT */}

                                    <div className="hero-bg-text">
                                        {index === 1 ? 'IN EAR' : 'OVER EAR'}
                                    </div>

                                    {/* PRODUCT NAME AND PRICE */}

                                    <div className="hero-content">

                                        <h4>{item.title1 || item.title}</h4>

                                        <h1>{item.tagline1}</h1>

                                        <h1>{item.tagline2}</h1>

                                        <h3>
                                            ₹{item.finalPrice}

                                            <del className="ms-3 fs-4 text-secondary">
                                                ₹{item.originalPrice}
                                            </del>
                                        </h3>

                                        <button
                                            className="btn btn-danger mt-4"
                                            onClick={() =>
                                                navigate(`/product-details/${item.id}`)
                                            }
                                        >
                                            Shop Now
                                        </button>

                                    </div>

                                    {/* CLICKABLE PRODUCT IMAGE */}

                                    <div className="hero-image">

                                        <img
                                            src={item.heroImage}
                                            className="img-fluid rounded-5"
                                            alt={item.title1 || item.title}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                navigate(`/product-details/${item.id}`)
                                            }
                                        />

                                    </div>

                                </div>

                            </div>

                        ))}

                </div>

            </div>

        </div>
    );
};

export default Index;
