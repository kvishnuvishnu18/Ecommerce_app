
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import productsData from '../data/productsData';


const Search = () => {

    const [searchText, setSearchText] = useState('');
    const [showResults, setShowResults] = useState(false);

    const navigate = useNavigate();

    // SEARCH ALL PRODUCTS
    const searchResults = productsData.filter(item => {

        const searchValue = searchText.toLowerCase();

        const productName = (item.title || item.title1 || '').toLowerCase();
        const brand = (item.brand || '').toLowerCase();
        const category = (item.category || '').toLowerCase();

        return (
            productName.includes(searchValue) ||
            brand.includes(searchValue) ||
            category.includes(searchValue)
        );
    });

    // OPEN PRODUCT DETAILS
    const handleProductClick = (id) => {
        navigate(`/product-details/${id}`);
        setSearchText('');
        setShowResults(false);
    };

    // VIEW ALL SEARCH RESULTS
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (searchText.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchText.trim())}`);
            setShowResults(false);
        }
    };

    return (

        <div className="search-container">

            <form onSubmit={handleSearchSubmit}>

                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                />

                <button type="submit">
                    <i className="fa fa-search"></i>
                </button>

            </form>

            {showResults && searchText.trim() !== '' && (

                <div className="search-results">

                    {searchResults.length > 0 ? (

                        searchResults.slice(0, 6).map(item => (

                            <div
                                className="search-result-item"
                                key={item.id}
                                onClick={() => handleProductClick(item.id)}
                            >

                               

                                <div>
                                    <h4>{item.title || item.title1}</h4>
                                    <p>{item.brand}</p>
                                    <strong>₹{item.finalPrice}</strong>
                                </div>

                            </div>

                        ))

                    ) : (

                        <p className="no-search-results">
                            No products found!
                        </p>

                    )}

                </div>

            )}

        </div>
    );
};

export default Search;
