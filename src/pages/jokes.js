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
        setJokes([newJoke, ...jokes]); 
        setNewJoke('');
    };

    return (
        <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb))">
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">Jokes & Bits</h1>
            <div className="max-w-md mx-auto p-8 shadow-md rounded-md text-white">
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
                <div className="jokes-list mt-8  mx-auto">
                    {jokes.map((joke, index) => (
                        <div
                            key={index}
                            className="joke-item mb-4 bg-white text-black p-4 rounded shadow">
                            <p className="text-lg">{joke}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Jokes;