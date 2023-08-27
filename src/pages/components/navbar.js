import React, { useState } from 'react';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black text-white fixed top-0 mt-20 ml-3"
            style={{ borderRadius: '3em' }}
        >
            <div>
                <div>
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden px-2 py-1 text-white">
                        <div className="w-6 flex flex-col justify-between m-5">
                            <div className="h-1.5 mt-1.5 bg-white"></div>
                            <div className="h-1.5 mt-1.5 bg-white"></div>
                            <div className="h-1.5 mt-1.5 bg-white"></div>
                        </div>
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4`}>
                        <a href="/" className="glow px-3 py-2 rounded-md text-lg font-medium">Home</a>
                        <a href="/signIn" className="glow px-3 py-2 rounded-md text-lg font-medium">SignIn</a>
                        <a href="/signUp" className="glow px-3 py-2 rounded-md text-lg font-medium">SignUp</a>
                        <a href="/ComicBot" className="glow px-3 py-2 rounded-md text-lg font-medium">ComicBot</a>
                        <a href="/jokes" className="glow px-3 py-2 rounded-md text-lg font-medium">JokePad</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
