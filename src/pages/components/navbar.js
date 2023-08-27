import React, { useState } from 'react';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-b from-transparent to-rgb(var(--background-end-rgb)) text-white">
            <div className="max-w-full mx-auto px-8">
                <div className="flex items-center justify-end h-16">
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden px-2 py-1 text-white">
                        Menu
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row ml-10 mb-10 space-y-4 md:space-y-0 md:space-x-4`}>
                        <a href="/" className="glow px-3 py-2 rounded-md text-lg font-medium">Home</a>
                        <a href="/signIn" className="glow px-3 py-2 rounded-md text-lg font-medium">SignIn</a>
                        <a href="/signUp" className="glow px-3 py-2 rounded-md text-lg font-medium">SignUp</a>
                        <a href="/ComicBot" className="glow px-3 py-2 rounded-md text-lg font-medium">ComicBot</a>
                        <a href="/jokes" className="glow px-3 py-2 rounded-md text-lg font-medium">Jokes</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
