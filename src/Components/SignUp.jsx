
import React from 'react';
import {
    FaTimes,
    FaFacebookF,
    FaGoogle,
    FaTwitter
} from 'react-icons/fa';

function Signup({ onClose, onLogin }) {

    const handleSignup = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Name:", name);
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

                {/* SIGNUP HEADING */}
                <h2>Create Account</h2>

                <p className="login-text">
                    Already have an account?

                    <span
                        className="create-account"
                        onClick={onLogin}
                    >
                        Login
                    </span>
                </p>

                {/* SIGNUP FORM */}
                <form onSubmit={handleSignup}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                    />

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

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                    />

                    <button
                        type="submit"
                        className="login-submit"
                    >
                        Create Account
                    </button>

                </form>

                {/* SOCIAL LOGIN */}
                <div className="or-login">

                    <span></span>

                    <p>or signup with</p>

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

export default Signup;
