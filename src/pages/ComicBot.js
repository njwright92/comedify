import React, { useState } from 'react';
import Navbar from './components/navbar';

const ComicBot = () => {
    const [conversation, setConversation] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = () => {
        setConversation([...conversation, { from: 'user', text: userInput }]);
        setUserInput(''); // Clearing the input field
    };

    return (
        <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb)) min-h-screen p-8">
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">ComicBot
            </h1>
            <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
                <div className="conversation mb-4">
                    {conversation.map((message, index) => (
                        <p key={index} className={message.from === 'bot' ? 'bot-message' : 'user-message'}>
                            {message.text}
                        </p>
                    ))}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        className="p-2 w-full border border-black rounded text-black"
                        placeholder="Write your bit..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded mt-4 glow"
                    >
                        Send
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ComicBot;
