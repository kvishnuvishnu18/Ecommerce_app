
import React from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


function Footer() {

    
    
    const footMenu = [
        {
            id: 1,
            title: "Help",
            menu: [
                {
                    id: 1,
                    link: "FAQs",
                    path: "/"
                },
                {
                    id: 2,
                    link: "Track Order",
                    path: "/"
                },
                {
                    id: 3,
                    link: "Cancel Order",
                    path: "/"
                },
                {
                    id: 4,
                    link: "Return Order",
                    path: "/"
                },
                {
                    id: 5,
                    link: "Warranty Info",
                    path: "/"
                },
            ]
        },
        {
            id: 2,
            title: "Policies",
            menu: [
                {
                    id: 1,
                    link: "Return Policy",
                    path: "/"
                },
                {
                    id: 2,
                    link: "Security",
                    path: "/"
                },
                {
                    id: 3,
                    link: "Sitemap",
                    path: "/"
                },
                {
                    id: 4,
                    link: "Privacy Policy",
                    path: "/"
                },
                {
                    id: 5,
                    link: "Terms & Conditions",
                    path: "/"
                },
            ]
        },
        {
            id: 3,
            title: "Company",
            menu: [
                {
                    id: 1,
                    link: "About Us",
                    path: "/"
                },
                {
                    id: 2,
                    link: "Contact Us",
                    path: "/"
                },
                {
                    id: 3,
                    link: "Service Centres",
                    path: "/"
                },
                {
                    id: 4,
                    link: "Careers",
                    path: "/"
                },
                {
                    id: 5,
                    link: "Affiliates",
                    path: "/"
                },
            ]
        }
    ];
    
    const footSocial = [
        {
            id: 1,
            icon: <FaFacebookF />,
            path: "/",
        },
        {
            id: 2,
            icon: <FaTwitter />,
            path: "/",
        },
        {
            id: 3,
            icon: <FaInstagram />,
            path: "/",
        },
        {
            id: 4,
            icon: <FaLinkedinIn />,
            path: "/",
        },
    ];
    

    return (

        <footer className="tech-footer">

            <div className="footer-main">

                {/* Footer Brand */}

                <div className="footer-brand">

                    <h2>Tech-Shop</h2>

                    <p>
                        Subscribe to our Email alerts to receive
                        early discount offers, and new products info.
                    </p>

                    <input
                        type="email"
                        placeholder="Email Address*"
                    />

                    <button>Subscribe</button>

                </div>


                {/* Footer Menu */}

                {footMenu.map((item) => (

                    <div className="footer-links" key={item.id}>

                        <h5>{item.title}</h5>

                        {item.menu.map((menuItem) => (

                            <a href={menuItem.path} key={menuItem.id}>
                                {menuItem.link}
                            </a>

                        ))}

                    </div>

                ))}

            </div>


            {/* Bottom Footer */}

            <div className="footer-bottom">

                <p>2026 | All Rights Reserved ©.</p>

                <div className="social-icons">

                    {footSocial.map((item) => (

                        <a href={item.path} key={item.id}>
                            {item.icon}
                        </a>

                    ))}

                    <button
                        onClick={() => window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })}
                    >
                        <FaChevronUp />
                    </button>

                </div>

            </div>

        </footer>

    );
}

export default Footer;
