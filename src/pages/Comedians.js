import React, { useState } from 'react';
import Navbar from './components/navbar';

const Comedians = () => {
    const [comedians, setComedians] = useState([]);
    const [newComedian, setNewComedian] = useState({ name: '', podcasts: '', videos: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComedian({ ...newComedian, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const comedian = {
            name: newComedian.name,
            podcasts: newComedian.podcasts.split(','),
            videos: newComedian.videos.split(','),
        };
        setComedians([...comedians, comedian]);
        setNewComedian({ name: '', podcasts: '', videos: '' }); // Reset the form
    };

    return (
        <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb)) min-h-screen p-8">
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">Comedians Library</h1>
            <div className="max-w-md mx-auto bg-gradient-to-b from-transparent to-rgb(var(--background-end-rgb)) p-8 shadow-md rounded-md text-white">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold mb-2">Comedian Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newComedian.name}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded text-black" required />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="podcasts"
                            className="block text-sm font-semibold mb-2">Podcasts (comma separated):
                        </label>
                        <input
                            type="text"
                            id="podcasts"
                            name="podcasts"
                            value={newComedian.podcasts}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded text-black" />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="videos"
                            className="block text-sm font-semibold mb-2">Videos (comma separated):
                        </label>
                        <input
                            type="text"
                            id="videos"
                            name="videos"
                            value={newComedian.videos}
                            onChange={handleInputChange}
                            className="p-2 w-full border rounded text-black" />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded glow">Add Comedian
                        </button>
                    </div>
                </form>
                {/* Existing comedians list */}
                <div className="comedians-list mt-8">
                    {comedians.map((comedian, index) => (
                        <div
                            key={index}
                            className="comedian-item mb-4">
                            <h2
                                className="text-xl glow">{comedian.name}
                            </h2>
                            <p>Podcasts: {comedian.podcasts.join(', ')}
                            </p>
                            <p>Videos: {comedian.videos.join(', ')}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Comedians;
