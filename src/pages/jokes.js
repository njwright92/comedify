import React, { useState } from 'react';
import Navbar from './components/navbar';

const Jokes = () => {
    const [jokes, setJokes] = useState([]);
    const [newJoke, setNewJoke] = useState('');

    const handleInputChange = (e) => {
        setNewJoke(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setJokes([...jokes, newJoke]);
        setNewJoke('');
    };

    return (
        <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb)) min-h-screen p-8">
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">Jokes & Bits</h1>
            <div className="max-w-md mx-auto bg-gradient-to-b from-transparent to-rgb(var(--background-end-rgb)) p-8 shadow-md rounded-md text-white">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="joke"
                            className="block text-sm font-semibold mb-2">Write Your Joke/Bit:
                        </label>
                        <textarea
                            id="joke"
                            value={newJoke}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded text-black"
                            rows="4" required />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded glow">Add Joke
                        </button>
                    </div>
                </form>
                {/* Existing jokes list */}
                <div className="jokes-list mt-8">
                    {jokes.map((joke, index) => (
                        <div
                            key={index}
                            className="joke-item mb-4">
                            <p className="text-lg">{joke}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Jokes;
