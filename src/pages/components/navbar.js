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
            alert("Please Sign In or Sign Up.");
        } else {
            window.location.href = link;
        }
    };

    return (
        <nav className="bg-black text-white fixed top-0 mt-10"
            style={{ borderRadius: '3em' }}
        >
            <div className="flex justify-start">
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden px-2 py-1 text-white">
                    {/* ... existing code ... */}
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4`}>
                    <a href="/" className="glow px-3 py-2 rounded-md text-lg font-medium">Home</a>
                    <a href="/signIn" className="glow px-3 py-2 rounded-md text-lg font-medium">SignIn</a>
                    <a href="/signUp" className="glow px-3 py-2 rounded-md text-lg font-medium">SignUp</a>
                    <a onClick={() => handleRedirect('/ComicBot')} className="glow px-3 py-2 rounded-md text-lg font-medium">ComicBot</a>
                    <a onClick={() => handleRedirect('/jokes')} className="glow px-3 py-2 rounded-md text-lg font-medium">JokePad</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
