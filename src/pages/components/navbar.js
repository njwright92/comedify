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
        <nav className="bg-black text-white fixed top-0 mt-10" style={{ borderRadius: '3em' }}>
            <div className="flex justify-between items-center glow">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-4xl py-8 text-white glow"
                >
                    ≡
                </button>
                <div
                    className={`${isOpen ? 'block' : 'hidden'
                        } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4`}
                >

                </div>
                <div className={`${isOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4`}>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="glow px-3 py-2 rounded-md text-lg font-medium">
                        Home
                    </button>
                    <button
                        onClick={() => window.location.href = "/signIn"}
                        className="glow px-3 py-2 rounded-md text-lg font-medium">
                        SignIn
                    </button>
                    <button
                        onClick={() => window.location.href = "/signUp"}
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
