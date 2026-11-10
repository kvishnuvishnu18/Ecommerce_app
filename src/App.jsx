
import React, { useState } from 'react';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Routers from './Routings/Routers';


function App() {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return (
        <div>
            <Navbar onLogin={() => setShowLogin(true)}/>
            <Routers onLogin={() => setShowLogin(true)}/>
            

            {/* LOGIN PAGE */}

            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    onSignup={() => {
                        setShowLogin(false);
                        setShowSignup(true);
                    }}
                />
            )}

            {/* SIGNUP PAGE */}

            {showSignup && (
                <Signup
                    onClose={() => setShowSignup(false)}
                    onLogin={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                    }}
                />
            )}

            <Footer />

        </div>
    );
}

export default App;
