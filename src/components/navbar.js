import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleRedirect = (link) => {
        if (!isAuthenticated) {
            alert('Please Sign In or Sign Up.');
        } else {
            window.location.href = link;
        }
    };

    return (
        <nav className="bg-black text-white mt-5" style={{ borderRadius: '3.3em' }}>
            <div className="flex items-center glow">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className=" glow text-5xl ml-3 py-3 text-white lg:hidden"
                >
                    ≡
                </button>

                <div className={`${isOpen ? 'block' : 'hidden'} lg:flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4`}>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="glow px-3 py-2 rounded-md text-lg font-medium">
                        Home
                    </button>
                    <button
                        onClick={() => {
                            if (isAuthenticated) {
                                alert('You are already signed in.');
                            } else {
                                window.location.href = "/signIn"
                            }
                        }}
                        className="glow px-3 py-2 rounded-md text-lg font-medium">
                        SignIn
                    </button>
                    <button
                        onClick={() => {
                            if (isAuthenticated) {
                                alert('You are already signed up.');
                            } else {
                                window.location.href = "/signUp"
                            }
                        }}
                        className="glow px-3 py-2 rounded-md text-lg font-medium">
                        SignUp
                    </button>
                    <button
                        onClick={() => handleRedirect('/ComicBot')}
                        className="glow px-3 py-2 rounded-md text-lg font-medium">ComicBot</button>
                    <button
                        onClick={() => handleRedirect('/jokes')}
                        className="glow px-3 py-2 rounded-md text-lg font-medium">JokePad</button>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
