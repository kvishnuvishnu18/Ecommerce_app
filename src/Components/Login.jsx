
import React from 'react';
import {FaTimes,FaFacebookF,FaGoogle,FaTwitter} from 'react-icons/fa';



function Login({ onClose, onSignup }) {

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (

        <div className="login-overlay">

            <div className="login-box">

                {/* CLOSE BUTTON */}

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>


                {/* LOGIN HEADING */}

                <h2>Login</h2>

                <p className="login-text">
                    New to Tech-Shop ?

                    <span
                        className="create-account"
                        onClick={onSignup}
                    >
                        Create an account
                    </span>
                </p>


                {/* LOGIN FORM */}

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />

                    <button
                        type="submit"
                        className="login-submit"
                    >
                        Login
                    </button>

                </form>


                {/* SOCIAL LOGIN */}

                <div className="or-login">

                    <span></span>

                    <p>or login with</p>

                    <span></span>

                </div>


                <div className="social-login">

                    <button className="facebook-btn" type="button">
                        <FaFacebookF /> Facebook
                    </button>

                    <button className="google-btn" type="button">
                        <FaGoogle /> Google
                    </button>

                    <button className="twitter-btn" type="button">
                        <FaTwitter /> Twitter
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Login;
