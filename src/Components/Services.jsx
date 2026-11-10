
import React from 'react';

import {
    FaShippingFast,
    FaShieldAlt,
    FaTags,
    FaCreditCard
} from 'react-icons/fa';

function Services() {

    const servicesData = [
        {
            id: 1,
            icon: <FaShippingFast />,
            title: "Express Delivery",
            info: "Ships in 24 Hours",
        },
        {
            id: 2,
            icon: <FaShieldAlt />,
            title: "Brand Warranty",
            info: "100% Original products",
        },
        {
            id: 3,
            icon: <FaTags />,
            title: "Exciting Deals",
            info: "On all prepaid orders",
        },
        {
            id: 4,
            icon: <FaCreditCard />,
            title: "Secure Payments",
            info: "SSL / Secure certificate",
        },
    ];

    return (
        <section className="advantages">

            <h1 className="text-center adv">
                Our Advantages
            </h1>

            <div className="container">
                <div className="row">

                    {servicesData.map((item) => (
                        <div className="col-lg-3" key={item.id}>

                            <div className="adv-item">

                                <div className="adv-icon">
                                    {item.icon}
                                </div>

                                <div className="adv-content">
                                    <h5>{item.title}</h5>
                                    <p>{item.info}</p>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}

export default Services;
